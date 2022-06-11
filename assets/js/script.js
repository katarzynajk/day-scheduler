const renderDate = () => {
  const date = moment().format("Do of MMMM YYYY HH:mm");
  $("#currentDay").append(date);
};

$(window).on("load", renderDate);
