function formattedDateWithTime(date: string) {
  const currentDate = new Date(date);
  const formattedDate = `${currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })} at ${currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}`;
  return formattedDate;
}

export default formattedDateWithTime;
