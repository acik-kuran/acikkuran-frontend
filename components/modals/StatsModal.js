import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { useRecoilState, useRecoilValue } from "recoil";
import { useTheme } from "styled-components";

import { modalState, streakState } from "@recoil/atoms";
import { FormQuote } from "@styles/form.style";
import { StatsContainer } from "@styles/stats.style";
import { fetchJson } from "@utils/funcs";
import secondsToHms from "@utils/secondsToHms";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <></>,
});

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={328}
    height={150}
    viewBox="0 0 328 150"
    backgroundColor={props.backgroundColor}
    foregroundColor={props.foregroundColor}
    {...props}
  >
    <rect x="0" y="4" rx="3" ry="3" width="140" height="20" />
    <rect x="0" y="28" rx="3" ry="3" width="100" height="14" />
    <rect x="0" y="56" rx="3" ry="3" width="352" height="130" />
  </ContentLoader>
);

const StatsModal = () => {
  const { t } = useTranslation("common");
  const theme = useTheme();
  const [chartData, setChartData] = React.useState(null);
  const { data: session } = useSession();
  const [dataWithScores, setDataWithScores] = useState(null);
  const [totalScores, setTotalScores] = useState(null);
  const streakInfo = useRecoilValue(streakState);
  const [_, setModalInfo] = useRecoilState(modalState);
  const locale = process.env.NEXT_PUBLIC_LOCALE;

  const getUserScores = async () => {
    const result = await fetchJson(`/api/user-scores`, {
      method: "GET",
    });
    if (result?.dataWithScores && result?.totalScores) {
      setDataWithScores(result.dataWithScores);
      setTotalScores(
        +result.totalScores + (streakInfo?.seconds ? +streakInfo.seconds : 0)
      );
    }
  };
  useEffect(() => {
    if (session) {
      getUserScores();
    }
  }, [session]);

  const nowDay = dayjs(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" })
  ).format("YYYY-MM-DD");

  useEffect(() => {
    if (dataWithScores) {
      const data = {
        series: [
          {
            data: [
              ...dataWithScores,
              { x: nowDay, y: streakInfo?.seconds || 0 },
            ],
          },
        ],
        options: {
          chart: {
            sparkline: {
              enabled: true,
            },
          },

          plotOptions: {
            bar: {
              borderRadius: 2,
              borderRadiusApplication: "around",
              borderRadiusWhenStacked: "last",
              columnWidth: "80%",
              colors: {
                backgroundBarColors: [theme.chartBackgroundColor],
                backgroundBarOpacity: 1,
                backgroundBarRadius: 2,
              },
            },
          },

          theme: {
            monochrome: {
              enabled: true,
              color: theme.chartBarColor,
              shadeTo: "dark",
              shadeIntensity: 0.65,
            },
          },

          title: {
            text: secondsToHms({
              seconds: totalScores,
              isResult: true,
              isFull: true,
              t,
            }),
            margin: 0,
            offsetX: -10,
            offsetY: 0,
            style: {
              fontSize: "16px",
              fontWeight: 600,
              color: theme.primaryTextColor,
            },
          },

          subtitle: {
            text: t("settings__history__last_30_days"),
            offsetY: 18,
            offsetX: -10,
            margin: 10,
            style: {
              fontSize: "13px",
              color: theme.primaryTextColor,
            },
          },
          tooltip: {
            intersect: false,
            style: {
              fontSize: "14px",
              fontFamily: "sans-serif",
            },
            theme: theme.theme,
            x: {
              formatter: function (value) {
                return `<span> &nbsp;&nbsp; ${dayjs(value).format(
                  "DD.MM.YYYY"
                )}</span>`;
              },
            },
            y: {
              title: {
                formatter: function () {
                  return null;
                },
              },
              formatter: function (seconds) {
                return secondsToHms({
                  seconds,
                  isToday: false,
                  isFull: true,
                  t,
                });
              },
            },
            marker: {
              show: false,
            },
          },
        },
      };
      setChartData(data);
    }
  }, [dataWithScores]);

  return (
    <StatsContainer>
      <FormQuote>
        {t("settings__history_desc")} (
        <Link onClick={() => setModalInfo({ openedModal: null })} href="/29/45">
          {t("settings__history_desc_surah")}
        </Link>
        )
      </FormQuote>
      {chartData ? (
        <div id="chart">
          <Chart
            height="150"
            options={chartData.options}
            series={chartData.series}
            type="bar"
          />
        </div>
      ) : (
        <MyLoader
          backgroundColor={theme.chartLoadingBackgroundColor}
          foregroundColor={theme.chartLoadingForegroundColor}
        />
      )}
    </StatsContainer>
  );
};

export default StatsModal;
