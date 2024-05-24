import { setCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  RiAddLine,
  RiDragDropLine,
  RiDraggable,
  RiSubtractFill,
} from "react-icons/ri";
import { useRecoilState } from "recoil";

import Button from "@components/common/Button";
import authors from "@data/authors";
import defaultAuthorSelections from "@data/defaultAuthorSelections";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { modalState } from "@recoil/atoms";
import {
  AuthorSelectionActionButton,
  AuthorSelectionBaseContainer,
  AuthorSelectionContainer,
  AuthorSelectionItem,
  AuthorSelectionItemContent,
  AuthorSelectionItemDrag,
  AuthorSelectionItemDraggable,
  AuthorSelectionList,
  AuthorSelectionLoginRequired,
} from "@styles/author-selection.style";

import BaseModal from "./BaseModal";

export const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const locale = process.env.NEXT_PUBLIC_LOCALE;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <AuthorSelectionItem>
        <AuthorSelectionItemDraggable>
          <AuthorSelectionItemDrag {...listeners}>
            <RiDraggable />
          </AuthorSelectionItemDrag>
          <div
            className={`nav__locale-button ${
              props.author.language === locale && "nav__locale-button--colored"
            }`}
          >
            {props.author.language}
          </div>
          {props.author.name}
        </AuthorSelectionItemDraggable>
        <AuthorSelectionActionButton
          onClick={() => {
            props.setItems(props.items.filter((i) => i !== props.id));
          }}
        >
          <RiSubtractFill />
        </AuthorSelectionActionButton>
      </AuthorSelectionItem>
    </div>
  );
};

const sortAuthorsByOrder = (authors, sortOrder) => {
  let authorOrder = {};
  sortOrder.forEach((id, index) => {
    authorOrder[id] = index;
  });

  authors.sort((a, b) => {
    return authorOrder[a.id] - authorOrder[b.id];
  });

  return authors;
};

const AuthorSelectionModal = (props) => {
  const { modalKey, fullscreen } = props;

  const { t } = useTranslation("common");
  const locale = process.env.NEXT_PUBLIC_LOCALE;
  const [modalInfo, setModalInfo] = useRecoilState(modalState);
  const { data: session } = useSession();

  const { currentAuthorsList, setCurrentAuthorsList, authorSelections } =
    modalInfo?.modalProps;

  const MODAL_WIDTH = 600;

  const [items, setItems] = useState(
    currentAuthorsList || defaultAuthorSelections[locale]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const sortedAuthors = useMemo(() => {
    return sortAuthorsByOrder(authors, defaultAuthorSelections[locale]);
  });

  useEffect(() => {
    if (currentAuthorsList != items) {
      const newAuthorSelections = {
        tr:
          authorSelections?.toString() === defaultAuthorSelections.tr.toString()
            ? null
            : authorSelections,
        en:
          authorSelections?.toString() === defaultAuthorSelections.en.toString()
            ? null
            : authorSelections,
        [locale]: items,
      };

      if (session) {
        fetch(`/api/author-selections`, {
          method: "POST",
          body: JSON.stringify(newAuthorSelections),
        });
      }

      setCurrentAuthorsList(items);
      setCookie(`a_s`, items, {
        maxAge: 60 * 60 * 24 * 12265,
        path: "/",
      });

      toast(t("author_selection__list-saved"), {
        icon: "👏",
        duration: 2000,
        id: "author-selection-toast",
      });
    }
  }, [items]);

  return (
    <BaseModal
      title={t("author_selection__title")}
      modalKey={modalKey}
      width={MODAL_WIDTH}
      fullscreen={fullscreen}
      contentStyle={{ padding: 0 }}
    >
      <AuthorSelectionBaseContainer>
        {!session && (
          <AuthorSelectionLoginRequired>
            <h2>
              <RiDragDropLine size="42" />
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: t("author_selection__login_required"),
              }}
            ></p>
            <p>
              <Button
                type="button"
                fullWidth
                onClick={() => setModalInfo({ openedModal: "login" })}
              >
                {t("login__direction_text")}
              </Button>
            </p>
          </AuthorSelectionLoginRequired>
        )}
        <AuthorSelectionContainer disabled={!session}>
          <AuthorSelectionList>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[
                restrictToVerticalAxis,
                restrictToWindowEdges,
                restrictToFirstScrollableAncestor,
              ]}
              removable
            >
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
              >
                {items.map((id, index) => (
                  <SortableItem
                    key={id}
                    id={id}
                    author={authors.find((i) => i.id === id)}
                    setItems={setItems}
                    items={items}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </AuthorSelectionList>
          <AuthorSelectionList>
            {
              // get authors except the ones in items
              sortedAuthors
                .filter((i) => !items.includes(i.id))
                .map((author) => (
                  <AuthorSelectionItem key={author.id} disabled>
                    <AuthorSelectionItemContent>
                      <span
                        className={`nav__locale-button ${
                          author.language === locale &&
                          "nav__locale-button--colored"
                        }`}
                      >
                        {author.language}
                      </span>{" "}
                      {author.name}
                    </AuthorSelectionItemContent>
                    <AuthorSelectionActionButton
                      onClick={() => {
                        setItems([...items, author.id]);
                      }}
                    >
                      <RiAddLine />
                    </AuthorSelectionActionButton>
                  </AuthorSelectionItem>
                ))
            }
          </AuthorSelectionList>
        </AuthorSelectionContainer>
      </AuthorSelectionBaseContainer>
    </BaseModal>
  );
};

export default AuthorSelectionModal;
