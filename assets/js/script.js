/* current date & time */
const renderDate = () => {
  const date = moment().format("Do of MMMM YYYY HH:mm");
  $("#currentDay").append(date);
};

$(window).on("load", renderDate);

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

const readFromLocalStorage = (key, defaultValue) => {
  // get the data from LS by using key name
  const dataFromLS = localStorage.getItem(key);

  // parse the data from LS
  const parsedData = JSON.parse(dataFromLS);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};

const writeToLocalStorage = (key, value) => {
  // convert the value to string
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
};

const getEventForTimeBlock = (workHours) => {
  const dayplanner = readFromLocalStorage("dayplanner", {});

  return dayplanner[workHours] || "";
};

const timeBlocks = $("#time-blocks");
// time blocks from index.html
const renderTimeBlocks = () => {
  const renderTimeBlock = (workHours) => {
    console.log(workHours);
    // make the time blocks to render dynamically
    const timeBlock = `<div class="row p-2 ${getClassName(workHours.key)}">
    <div
      class="col-md-1 col-sm-12 text-center my-1 d-flex flex-column justify-content-center"
    >${workHours.timeLabel}
    </div>
    <!-- text area for your task -->
    <textarea data-task=${
      workHours.key
    }class="col-md-9 col-sm-12" rows="3">${getEventForTimeBlock(
      workHours.key
    )}</textarea>
    <div
      class="col-md-2 col-sm-12 text-center my-1 d-flex flex-column justify-content-center"
    >
      <!-- btn to save task in LS -->
      <button type="button" data-hour=${
        workingHour.key
      } class="btn btn-success">Save</button>
    </div>`;
    timeBlocks.append(timeBlock);
  };
  workHours.forEach(renderTimeBlock);
};

// document on ready
const onReady = () => {
  renderDate();
  renderTimeBlock();
};
