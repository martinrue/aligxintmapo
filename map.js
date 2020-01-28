const map = (() => {
  const setDimensions = (selector, width) => {
    const ratio = 2.15;
    const height = Math.floor(width / ratio);

    const element = document.querySelector(`${selector} svg`);
    element.setAttribute('width', `${width}`);
    element.setAttribute('height', `${height}`);

    return {
      width: width,
      height: height,
    };
  };

  const render = (selector, width, data, onSelect) => {
    return new Promise((resolve, reject) => {
      const dimensions = setDimensions(selector, width);

      d3.queue()
        .defer(d3.json, 'map-data/world-110m.json')
        .defer(d3.csv, 'map-data/country-names.csv')
        .await((err, world, names) => {
          if (err) {
            return reject({
              err: err,
              msg: 'Ne povis ŝargi la map-datumojn.',
            });
          }

          const countries = topojson
            .feature(world, world.objects.countries)
            .features.filter(d => {
              return names.some(n => {
                if (d.id === n.id) {
                  const lando = landoj[n['alpha-2']];

                  if (lando) {
                    d.name = lando.name;
                    return true;
                  }

                  return false;
                }
              });
            });

          const projection = d3
            .geoNaturalEarth1()
            .fitSize(
              [dimensions.width, dimensions.height],
              topojson.feature(world, world.objects.countries),
            );

          d3.select(`${selector} svg > *`).remove();

          const path = d3.geoPath().projection(projection);
          const svg = d3.select(`${selector} svg`).append('g');

          svg
            .selectAll('path')
            .data(countries)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('stroke', '#bbb')
            .attr('stroke-width', 1)
            .attr('fill', d => {
              const entry = data.byCountry[d.name];
              return entry ? '#6a3ca4' : '#fff';
            })
            .on('mouseover', function(d) {
              const entry = data.byCountry[d.name];

              d3.select(this)
                .attr('fill', entry ? '#4a1c84' : '#6a3ca411')
                .attr('stroke', entry ? '#bbb' : '#6a3ca4')
                .attr('stroke-width', entry ? 1 : 1.5);
            })
            .on('mouseout', function(d) {
              const entry = data.byCountry[d.name];

              d3.select(this)
                .attr('fill', entry ? '#6a3ca4' : '#fff')
                .attr('stroke', '#bbb')
                .attr('stroke-width', 1);
            })
            .on('click', function(d) {
              const people = data.byCountry[d.name];

              onSelect({
                country: d.name,
                people: people || [],
              });
            });

          resolve();
        });
    });
  };

  return {
    render: render,
  };
})();
