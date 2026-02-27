type FormatTwoDigitsParams = {
  num: number | string | undefined;
  allowZero?: boolean;
  allowNA?: boolean;
  allToString?: boolean;
};

export const formatTwoDigits = ({
  num,
  allowZero = true,
  allowNA = true,
  allToString = false,
}: FormatTwoDigitsParams): string | undefined => {
  // console.log(num)
  if (typeof num === "number" || !isNaN(Number(num))) {
    const formattedNum = Number(num);
    return formattedNum.toString().padStart(2, "0");
  } else {
    return allToString
      ? "00.0"
      : allowZero
        ? "00"
        : allowNA
          ? "N/A"
          : undefined;
  }
};
