const info = (() => {
  const show = data => {
    const noun = data.people.length === 1 ? 'aliĝinto' : 'aliĝintoj';
    const title = `${data.people.length} ${noun} de ${data.country}`;

    document.querySelector('.info div h2').innerText = title;
    document.querySelector('.info div ol').innerHTML = '';
    document.querySelector('.info').style.display = 'block';

    data.people.forEach(person => {
      const element = document.createElement('li');
      element.innerText = `${person.first} ${person.last}`;
      document.querySelector('.info div ol').appendChild(element);
    });
  };

  const hide = e => {
    document.querySelector('.info').style.display = 'none';

    if (e) {
      e.preventDefault();
    }
  };

  const init = () => {
    document.querySelector('.info').addEventListener('click', hide);
  };

  return {
    init: init,
    show: show,
    hide: hide,
  };
})();
