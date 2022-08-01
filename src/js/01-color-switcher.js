const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');
let timeId = null;

toggleBtn();

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  timeId = setInterval(
    () => (bodyRef.style.backgroundColor = getRandomHexColor()),
    1000
  );
  toggleBtn(stopBtn, startBtn);
}

function onStopBtnClick() {
  clearInterval(timeId);
  toggleBtn();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function toggleBtn(enableBtn = startBtn, disableBtn = stopBtn) {
  disableBtn.disabled = true;
  enableBtn.disabled = false;
}
