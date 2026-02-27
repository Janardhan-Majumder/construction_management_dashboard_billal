import type { TArgs } from "../../types/common.type";

export const buildQueryParams = (args: TArgs) => {
  const params = new URLSearchParams();
  if (args) {
    args.forEach((item) => {
      // if (Array.isArray(item.value)) {
      //     item.value.forEach(cValue => {
      //         params.append(item.name, cValue);
      //     });
      // } else {
      params.append(item.name, item.value.toString());
      // }
    });
  }
  return params;
};
