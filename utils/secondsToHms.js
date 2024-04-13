const secondsToHms = ({
  seconds,
  isToday = true,
  isResult = false,
  isFull = false,
  t,
}) => {
  if (seconds > 0) {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);

    const hDisplay = h > 0 ? t("hourWithCount", { count: h }) : "";
    const mDisplay = m > 0 ? t("minuteWithCount", { count: m }) : "";
    let sDisplay = s > 0 ? t("secondWithCount", { count: s }) : "";

    if (mDisplay && !isFull) {
      sDisplay = "";
    }

    const final = hDisplay + " " + mDisplay + " " + sDisplay;
    if (isResult) {
      return final;
    }
    if (isToday) {
      return `Bugün <strong>${final}</strong> Kur'an okudunuz.`;
    } else {
      return `<strong>${final}</strong>`;
    }
  } else {
    if (isToday) {
      return "-";
    } else {
      return "-";
    }
  }
};

export default secondsToHms;
