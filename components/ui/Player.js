import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo } from "react";
import { Container } from "react-awesome-styled-grid";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import {
  RiCloseCircleLine,
  RiPauseCircleLine,
  RiPlayCircleLine,
} from "react-icons/ri";
import styled, { css } from "styled-components";

import { initGA, logEvent } from "@utils/analytics";
import { PlayerContext } from "@utils/playerProvider";

const SC = styled.div`
  ${({ theme }) => css`
    background: ${theme.bodyBackground};
    border-top: 1px solid ${theme.secondaryBeyaz};
    position: fixed;
    padding: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1032;
    height: 3.5em;
    display: flex;
    align-items: center;

    @media only screen and (max-width: ${theme.sizes.sm}) {
      bottom: 3.5em;
      height: 3em;
      ${Container} {
        padding: 0;
      }
    }

    .rhap_container {
      font-size: 16px;
      color: ${theme.enSiyah};
      box-shadow: none;
      background-color: ${theme.bodyBackground};
    }

    *:focus {
      outline: 0 !important;
    }

    .rhap_progress-section {
      flex: auto;
    }

    .rhap_controls-section {
      margin-right: 16px;
      flex: unset;
      @media only screen and (max-width: ${theme.sizes.sm}) {
        margin-right: 8px;
      }
    }

    .rhap_time {
      color: ${theme.enSiyah};
    }

    .rhap_progress-bar {
      background-color: ${theme.secondaryBeyaz};
    }

    .rhap_current-time,
    .rhap_total-time {
      font-size: 14px;
      width: 50px;
      text-align: center;
      @media only screen and (max-width: ${theme.sizes.sm}) {
        display: none;
      }
    }

    .rhap_play-pause-button {
      font-size: 22px;
      width: 22px;
      height: 22px;
      margin-right: 8px;
      @media only screen and (max-width: ${theme.sizes.sm}) {
        margin-right: 8px;
        font-size: 22px;
        width: 22px;
        height: 22px;
      }
      svg {
        color: ${theme.enSiyah};
        :hover {
          /* opacity: 0.6; */
        }
      }
    }

    .rhap_progress-indicator {
      display: none;
    }
    .player {
      &__close {
        line-height: 0;
        cursor: pointer;
        svg {
          color: ${theme.enSiyah};
          :hover {
            opacity: 0.6;
          }
        }
      }
      &__surah_name {
        font-weight: bold;
        @media only screen and (max-width: ${theme.sizes.sm}) {
          span {
            display: none;
          }
        }
      }
    }

    .rhap_progress {
      &-bar {
        height: 8px;
        border-radius: 0;
      }
      &-filled {
        background-color: ${theme.enSiyah};
        border-radius: 0;
      }
    }
  `}
`;
const Player = () => {
  const { audioSurah, storeAudioSurah } = useContext(PlayerContext);
  const locale = process.env.NEXT_PUBLIC_LOCALE;
  const { t } = useTranslation("common");
  const router = useRouter();
  useEffect(() => {
    if (audioSurah && audioSurah.id) {
      if (!window.GA_INITIALIZED) {
        initGA();
        window.GA_INITIALIZED = true;
      }
      logEvent(
        "play-surah",
        `play-surah: ${audioSurah.id}. ${audioSurah.name}`
      );
    }
  }, [audioSurah]);

  const computedAudio = useMemo(() => {
    return {
      tr: audioSurah?.audio?.mp3,
      en: audioSurah?.audio?.mp3_en,
    };
  });

  const computedSurahNames = useMemo(() => {
    return {
      tr: audioSurah?.name,
      en: audioSurah?.name_en,
    };
  });

  return (
    <React.Fragment>
      {audioSurah && audioSurah.audio && (
        <SC>
          <Container>
            <AudioPlayer
              layout={"horizontal-reverse"}
              customProgressBarSection={[
                RHAP_UI.CURRENT_TIME,
                RHAP_UI.PROGRESS_BAR,
                RHAP_UI.DURATION,
                <div className="player__close" key="plyc">
                  <RiCloseCircleLine
                    onClick={() => storeAudioSurah({})}
                    size="22"
                  />
                </div>,
              ]}
              customControlsSection={[
                RHAP_UI.MAIN_CONTROLS,
                <div className="player__surah_name" key="plys">
                  <Link
                    href={`/[surah_id]`}
                    as={`/${audioSurah.id}`}
                    dangerouslySetInnerHTML={{
                      __html: t("surah__title", {
                        surah_id: audioSurah.id,
                        surah_name: computedSurahNames[locale],
                      }),
                    }}
                  ></Link>
                </div>,
              ]}
              customIcons={{
                play: <RiPlayCircleLine />,
                pause: <RiPauseCircleLine />,
              }}
              autoPlay
              autoPlayAfterSrcChange
              src={computedAudio[locale]}
              showSkipControls={false}
              showLoopControl={false}
              showDownloadProgress={false}
              showVolumeControl={false}
              showJumpControls={false}
            />
          </Container>
        </SC>
      )}
    </React.Fragment>
  );
};

export default Player;
