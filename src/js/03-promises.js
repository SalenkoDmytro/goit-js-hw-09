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

function amountOfCreatingPromises({ amount, step }) {
  let totalDelay = inputsData.delay;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, totalDelay)
      .then(success => Notiflix.Notify.success(success))
      .catch(error => Notiflix.Notify.failure(error));

    totalDelay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
