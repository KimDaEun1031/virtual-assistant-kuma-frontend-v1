exports.validCalendarEventText = (event) => {
  const splitText = event.includes("분") ? event.split("분 ") : event.split("시 ");

  const date = splitText[0].split(" ").map((item) => {
    const pattern = /[월일시오전오후]/g;
    const replaceItem = item.replace(pattern, "");

    return replaceItem;
  });

  const month = date[0]?.length === 1 ? `0${date[0]}` : date[0];
  const day = date[1]?.length === 1 ? `0${date[1]}` : date[1];
  const hour = date[3]?.length === 1 ? `0${date[3]}` : date[3];
  const minute = date[4]?.length === 1 ? `0${date[4]}` : date[4];

  const newDate = `2022-${month}-${day} ${hour}:${minute}:00`;

  return { date: newDate, summary: splitText[1] };
};
