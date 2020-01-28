const app = (() => {
  const setStat = (id, value) => {
    document.querySelector(`#${id}`).innerText = value;
  };

  const render = () => {
    showMessage('Ŝargante aliĝintojn...');

    participants
      .load()
      .then(data => {
        setStat('stat-homoj', data.total);
        setStat('stat-kasxitaj', data.hidden);
        setStat('stat-landoj', data.byCountryTotal);
        setStat('stat-plej', data.mostFromName);

        return map.render('.content .map', getWindowWidth(), data, info.show);
      })
      .then(() => {
        hideMessage();
      })
      .catch(err => {
        console.error(err);
        showError(err.msg);
      });
  };

  return {
    render: render,
  };
})();

onReady(() => {
  info.init();
  app.render();
  window.addEventListener('resize', debounce(app.render, 500));
});
