import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

class Timer {
  constructor() {
    this.intervalId = null;
    this.isActive = false;
  }
  start(pointTime) {
    if (this.isActive) return;
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = pointTime - startTime;
      const time = this.convertMs(deltaTime);

      if (deltaTime <= 1000) {
        this.stop();
      }

      this.updateClockFace(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }

  updateClockFace({ days, hours, minutes, seconds }) {
    refs.day.textContent = this.addLeadingZero(days);
    refs.hour.textContent = this.addLeadingZero(hours);
    refs.minute.textContent = this.addLeadingZero(minutes);
    refs.second.textContent = this.addLeadingZero(seconds);
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}

const refs = {
  btn: document.querySelector('button'),
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minute: document.querySelector('[data-minutes]'),
  second: document.querySelector('[data-seconds]'),
};

const timer = new Timer();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    refs.btn.disabled = false;
    refs.btn.addEventListener('click', timer.start(selectedDates[0]));
  },
};

refs.btn.disabled = true;

flatpickr('#datetime-picker', options);
