import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useRecoilState } from "recoil";

import { streakState } from "@recoil/atoms";
import { randomNumber } from "@utils/funcs";

var md5 = require("md5");

const useStreakTimer = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [preProcessedSeconds, setPreProcessedSeconds] = useState(0);

  const [_, setStreakInfo] = useRecoilState(streakState);
  const { data: session } = useSession();
  const SEC = 5;

  const handleOnAction = (event) => {
    session && setTotalSeconds(msToSecond(getTotalActiveTime()));
  };

  const msToSecond = (ms) => {
    return ms / 1000;
  };

  const increment = async (sec) => {
    const response = await fetch("/api/zincrby", {
      method: "POST",
      body: JSON.stringify({ sec }),
    });
    const data = await response.json();
    setStreakInfo({ daily_goal_seconds: 960, seconds: data.count });
  };

  useEffect(() => {
    if (totalSeconds > 0 && totalSeconds - preProcessedSeconds > SEC) {
      session && setPreProcessedSeconds(preProcessedSeconds + SEC);
    }
  }, [totalSeconds]);

  useEffect(() => {
    if (preProcessedSeconds > 0 && session) {
      const date = Math.ceil(Date.now() / 1000);
      const c = md5(date.toString());
      const r = randomNumber(19, 989929938);
      const v = md5(`${c}${r}`);

      increment(SEC);
    }
  }, [preProcessedSeconds]);

  const { getTotalActiveTime } = useIdleTimer({
    crossTab: false,
    timeout: 50000,
    // onIdle: handleOnIdle,
    // onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 1000,
  });

  return true;
};

export default useStreakTimer;
