const onReady = fn => {
  document.addEventListener('DOMContentLoaded', fn);
};

const getWindowWidth = () => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  return width - 50;
};

const showMessage = message => {
  document.querySelector('.message p').innerText = message;
  document.querySelector('.message').classList.remove('error');
  document.querySelector('.message').style.display = 'block';
};

const showError = message => {
  document.querySelector('.message p').innerText = `Ho ve! ${message}`;
  document.querySelector('.message').classList.add('error');
  document.querySelector('.message').style.display = 'block';
};

const hideMessage = () => {
  document.querySelector('.message').style.display = 'none';
};

const debounce = (fn, ms) => {
  let timeout = null;

  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(), ms);
  };
};
