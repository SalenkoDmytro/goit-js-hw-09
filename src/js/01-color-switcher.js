const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');
let timeId = null;

disableBtn();

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  timeId = setInterval(
    () => (bodyRef.style.backgroundColor = getRandomHexColor()),
    1000
  );

  toggleBtn();
}

function onStopBtnClick() {
  clearInterval(timeId);

  toggleBtn();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function toggleBtn() {
  disableBtn();
  stopBtn.disabled = false;
}

function disableBtn() {
  stopBtn.disabled = true;
}
