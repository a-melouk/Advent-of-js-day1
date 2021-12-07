var dec, step;
let min = document.getElementById("minutes");
let sec = document.getElementById("seconds");
let border = document.getElementById("circle_progress");
let setting = document.getElementById("setting");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let start = document.getElementById("start");
let address = "http://127.0.0.1:5500/";
let starting = Number(min.innerHTML) * 60 + Number(sec.innerHTML);

let two_digits = (a) => {
  return Number(a).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

let decrease = () => {
  let minutes = min.innerHTML;
  let seconds = sec.innerHTML;
  if (seconds == 0) {
    if (minutes == 0) {
      clearInterval(dec);
      border.style.strokeDashoffset = 1601.5;
      start.innerHTML = "S T A R T";
      setting.disabled = false;
      alert("Time is up");
    } else {
      minutes -= 1;
      seconds = 59;
      border.style.strokeDashoffset =
        Number(border.style.strokeDashoffset) + Number(step);
    }
  } else {
    seconds -= 1;
    border.style.strokeDashoffset =
      Number(border.style.strokeDashoffset) + Number(step);
  }

  min.innerHTML = two_digits(minutes);
  sec.innerHTML = two_digits(seconds);
};

let start_time = () => {
  init = starting;
  step = 1601.5 / init;
  if (start.innerHTML == "S T A R T") {
    dec = setInterval(decrease, 1000);
    start.innerHTML = "S T O P";
    setting.disabled = true;
    border.style.stroke = "#9d0000";
  } else if ((start.innerHTML = "S T O P")) {
    clearInterval(dec);
    start.innerHTML = "S T A R T";
    border.style.strokeDashoffset = Number(border.style.strokeDashoffset);
    setting.disabled = false;
    border.style.stroke = "#00aa51";
  }
};

let change_time = () => {
  let image = setting.childNodes[1];
  console.log(image);
  console.log(image.src);
  if (image.src.includes("gear")) {
    minutes.contentEditable = true;
    seconds.contentEditable = true;
    minutes.style.borderBottom = "2px dashed white";
    seconds.style.borderBottom = "2px dashed white";
    image.src = "./check.svg";
    start.disabled = true;
  } else if (image.src.includes("check")) {
    minutes.contentEditable = false;
    seconds.contentEditable = false;
    minutes.style.borderBottom = "";
    seconds.style.borderBottom = "";
    image.src = "./gear.svg";
    start.disabled = false;
    starting = Number(min.innerHTML) * 60 + Number(sec.innerHTML);
    border.style.strokeDashoffset = 0;
  }
};

min.innerHTML = two_digits(min.innerHTML);
sec.innerHTML = two_digits(sec.innerHTML);
start.addEventListener("click", start_time);
setting.addEventListener("click", change_time);
