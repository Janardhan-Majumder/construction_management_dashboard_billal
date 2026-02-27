
export const getPlanLabel = (name: string) => {
  return name?.split("_").join(" ");
  // switch (name) {
  //   case "Basic_Plan":
  //     return "Basic Plan";
  //   case "Business_plan":
  //     return "Standard Plan";
  //   case "unlimited_plan":
  //     return "Unlimited Plan";
  //   default:
  //     return "N/A";
  // }
};
