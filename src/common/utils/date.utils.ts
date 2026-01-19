import dayjs from "dayjs";

export const getMonthRange = () => {
  const start = dayjs().startOf("month").format("YYYY-MM-DD");
  const end = dayjs().endOf("month").format("YYYY-MM-DD");
  return { start, end };
};
