const participants = (() => {
  let cached = null;

  const parse = html => {
    const container = document.createElement('div');

    container.innerHTML = html
      .split('<div class="table-responsive">')[1]
      .split('</div>');

    const matches = container.querySelectorAll('tbody > tr');

    const result = {
      total: matches.length,
      hidden: 0,
      mostFromName: '',
      mostFromTotal: 0,
      byCountry: {},
      byCountryTotal: 0,
    };

    for (let i = 0; i < matches.length; i++) {
      const person = {
        first: matches[i].querySelector('td:nth-child(2)').innerText,
        last: matches[i].querySelector('td:nth-child(3)').innerText,
        country: matches[i].querySelector('td:nth-child(4)').innerText,
      };

      if (person.first.toLowerCase() === 'kaŝita') {
        result.hidden += 1;
      } else {
        let country = result.byCountry[person.country];

        if (!country) {
          country = result.byCountry[person.country] = [];
        }

        country.push(person);

        if (country.length >= result.mostFromTotal) {
          result.mostFromName = person.country;
          result.mostFromTotal = country.length;
        }
      }
    }

    result.byCountryTotal = Object.keys(result.byCountry).length;

    cached = result;
    return cached;
  };

  const load = () => {
    if (cached) {
      return Promise.resolve(cached);
    }

    const url =
      'https://cors-anywhere.herokuapp.com/https://ses.ikso.net/2020/eo/aligxintoj/';

    return fetch(url)
      .then(response => response.text())
      .then(parse)
      .catch(() => {
        throw {
          msg: 'Ne povis ŝargi datumojn.',
        };
      });
  };

  return {
    load: load,
  };
})();
