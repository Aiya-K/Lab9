// Sizes
const width = 500;
const height = 500;

//SVG canvas
const svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// 100 random var-s
const randomData = d3.range(100).map(() => ({
  x: Math.random() * width,
  y: Math.random() * height
}));

// Putting them on a scatter plot
svg.selectAll('circle')
  .data(randomData)
  .enter()
  .append('circle')
  .attr('cx', d => d.x)
  .attr('cy', d => d.y)
  .attr('r', 5)
  .attr('fill', 'blue');

// the dataset itself
d3.csv('titanic.csv').then(data => {
  // Number
  const ageCounts = d3.rollup(data, v => v.length, d => d.Age);

  // Convert the ageCounts map to an array
  const ageData = Array.from(ageCounts, ([age, count]) => ({ age, count }));

  // a pie chart
  const pie = d3.pie()
    .value(d => d.count)
    .sort(null);

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 10);

  const color = d3.scaleOrdinal()
    .domain(ageData.map(d => d.age))
    .range(d3.schemeCategory10);

  const pieChart = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  pieChart.selectAll('path')
    .data(pie(ageData))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.age))
    .attr('stroke', 'white')
    .attr('stroke-width', 2);
});
