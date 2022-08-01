import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputsData = {};

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  formData.forEach((x, y) => {
    inputsData[y] = Number(x);
  });
  amountOfCreatingPromises(inputsData);
}

function amountOfCreatingPromises({ amount, step, delay }) {
  let totalDelay = delay;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, totalDelay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );

    totalDelay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
