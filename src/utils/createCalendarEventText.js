exports.createCalendarEventText = (events) => {
  const eventTexts = events.map((item) => {
    const options = {
      hour12: false,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    const currentDate = new Date(item.updated).toLocaleString("ko-KR", options);
    const date = currentDate.split(". ");

    return `${date[1]}월 ${date[2]}일 ${date[3]}에 '${item.summary}' 일정이 있어! 잊지마!!`;
  });

  return eventTexts;
};
