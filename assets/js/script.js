// current date & time
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

// Local Storage !
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

// btn function to clear LS and clear contents
$("#clearFieldsBtn").click(function (event) {
  event.preventDefault;
  $("textarea").val("");
  localStorage.clear();
});

// time blocks from index.html
const renderTimeBlocks = () => {
  const timeBlocks = $("#time-blocks");
  const renderTimeBlock = (workHours) => {
    // make the time blocks to render dynamically
    const timeBlock = `<div class="row p-2 ${getClassName(workHours.key)}">
    <div class="col-md-1 col-sm-12 text-center my-1 d-flex flex-column justify-content-center"
    >${workHours.timeLabel}
    </div>
    <textarea data-task=${
      workHours.key
    } class="col-md-9 col-sm-12" rows="3">${getEventForTimeBlock(
      workHours.key
    )}</textarea>
    <div
      class="col-md-2 col-sm-12 text-center my-1 d-flex flex-column justify-content-center">
      <button type="button" data-hour=${
        workHours.key
      } class="btn btn-success">Save</button>
    </div>`;
    timeBlocks.append(timeBlock);
  };

  workHours.forEach(renderTimeBlock);
  timeBlocks.on("click", savetoLS);
};

const savetoLS = (event) => {
  const target = $(event.target);

  if (target.is("button")) {
    const key = target.attr("data-hour");
    const value = $(`textarea[data-task="${key}"]`).val().trim();
    const dayplanner = readFromLocalStorage("dayplanner", {});

    dayplanner[key] = value;

    writeToLocalStorage("dayplanner", dayplanner);
  }
};

const getClassName = (workHours) => {
  const currentdate = moment().hour();

  if (workHours === currentdate) {
    return "present";
  }
  if (workHours > currentdate) {
    return "future";
  }
  return "past";
};

// document on ready
const onReady = () => {
  renderTimeBlocks();
};

$(document).ready(onReady);
