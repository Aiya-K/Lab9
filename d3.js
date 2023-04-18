
// 1. adding js library 
const script = document.createElement('script');
script.src = 'https://d3js.org/d3.v6.min.js';
document.head.appendChild(script);

// 2. sizes and 100 random poins 
const svg = d3.select('body')
  .append('svg')
  .attr('width', 500)
  .attr('height', 500);

const points = d3.range(100).map(() => [Math.random() * 500, Math.random() * 500]);

svg.selectAll('circle')
  .data(points)
  .join('circle')
  .attr('cx', d => d[0])
  .attr('cy', d => d[1])
  .attr('r', 5)
  .attr('fill', 'red');

// 3. install the dataset about the passengers of Titanic
d3.csv('titanic.csv').then(data => {
  // 4. pie chart itself
  const ageGroups = ['0-20', '20-40', '40-60', '60-80', '80+'];
  const ages = data.map(d => parseInt(d.Age)).filter(d => !isNaN(d));
  const ageCounts = ageGroups.map(group => ages.filter(age => {
    const [min, max] = group.split('-').map(Number);
    return age >= min && age < max;
  }).length);

  const pie = d3.pie()(ageCounts);
  const color = d3.scaleOrdinal().domain(ageGroups).range(d3.schemeCategory10);

  const pieSvg = d3.select('body')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500);

  const arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(200);

  const arcs = pieSvg.selectAll('path')
    .data(pie)
    .join('path')
    .attr('d', arcGenerator)
    .attr('fill', d => color(d.data))
    .attr('transform', 'translate(250, 250)');

  const legend = pieSvg.selectAll('.legend')
    .data(ageGroups)
    .join('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => `translate(${i * 50 - 100}, -200)`);

  legend.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 20)
    .attr('height', 20)
    .attr('fill', color);

  legend.append('text')
    .attr('x', 30)
    .attr('y', 15)
    .text(d => d);
});

const xScale = d3.scaleLinear()
    .domain(d3.extent(randomData, d => +d.Age))
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain(d3.extent(randomData, d => +d.Fare))
    .range([height, 0]);

  // Add x and y axis ticks
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  svg.append('g')
    .call(yAxis);

  // Add the data points as circles
  svg.selectAll('circle')
    .data(randomData)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(+d.Age))
    .attr('cy', d => yScale(+d.Fare))
    .attr('r', 5)
    .attr('fill', 'blue');
});
