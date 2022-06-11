/* current date & time */
const renderDate = () => {
  const date = moment().format("Do of MMMM YYYY HH:mm");
  $("#currentDay").append(date);
};

const timeBlocks = $("#time-blocks");

/* working hour labels */
const workHours = [
  { timeLabel: "9am", key: 9 },
  { timeLabel: "10am", key: 10 },
  { timeLabel: "11am", key: 11 },
  { timeLabel: "12pm", key: 12 },
  { timeLabel: "1pm", key: 13 },
  { timeLabel: "2pm", key: 14 },
  { timeLabel: "3pm", key: 15 },
  { timeLabel: "4pm", key: 16 },
  { timeLabel: "5pm", key: 17 },
];

// document on ready
const onReady = () => {};

$(window).on("load", renderDate);
