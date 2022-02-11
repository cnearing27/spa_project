function randomGenerator(size) {
  let number = [];
  let firstValue;
  for (let i = 0; i < size; i++){
      firstValue = Math.round(Math.random() * 100) + 100;
  while (firstValue == 0)
    firstValue = Math.round(Math.random() * 100) + 100;
      number.push(firstValue)
  }
  return number;
}

let fact = randomGenerator(24),
plan = randomGenerator(24),
dates = ["янв.19", "фев.19", "март.19", "апр.19", "май.19", "июнь.19", "июль.19", "авг.19", "сент.19", "окт.19", "нояб.19", "дек.19",
"янв.20", "фев.20", "март.20", "апр.20", "май.20", "июнь.20", "июль.20", "авг.20", "сент.20", "окт.20", "нояб.20", "дек.20"];

const element = (
<table border="0">
  <tbody>
    <tr>
    <th className="result" rowSpan="2">{fact[23]}</th>
    <th><font color="#8E8E93">{dates[23]}</font></th>
    </tr>
    <tr>
    <td><font color="#81BA97">{(fact[23] * 100 / plan[23]).toFixed(1)}%</font><font color="#8E8E93"> к плану</font></td>
    </tr>
  </tbody>
</table>);

ReactDOM.render(element, document.getElementById('root'));

function drawLine(num, currentArray) {
  var height = 150,
  width = 400,
  data = [];

  var svg = d3.select("#first")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

  var xScale = d3.scaleBand()
  .domain(d3.range(0, currentArray.length))
  .padding(0.1)
  .range([0, width])

  var scaleX = d3.scaleBand()
  .domain(d3.range(0, currentArray.length))
  .range([xScale.bandwidth()/2, width])

  var scaleY = d3.scaleLinear()
  .domain([0, d3.max(currentArray)])
  .range([0, height]);

  for(let i = 0; i < 24 - num; i++)
    data.push({x: scaleX(i), y: height - scaleY(currentArray[i]) + 15});

  var line = d3.line()
  .curve(d3.curveCardinal)
  .x(function(d){return d.x;})
  .y(function(d){return d.y;});

  svg.selectAll("body")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; })
  .attr("r", "4")
  .style("fill", "#2B92A0")

  svg.append("g").append("path")
  .attr("d", line(data))
  .style('fill', "none")
  .style("stroke", "#2B92A0")
  .style("stroke-width", 2)
}

function drawGraf(num, currentArray, currentDates, sizeFont) {
  var t = 0,
  height = 300,
  width = 400;

  var svg = d3.select('#second')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

  var yScale = d3.scaleLinear()
  .domain([0, d3.max(currentArray)])
  .range([0, height - 70]);

  var xScale = d3.scaleBand()
  .domain(d3.range(0, currentArray.length))
  .padding(0.1)
  .range([0, width])

  svg.append("g")
  .style('background', 'white')
  .selectAll('rect').data(currentArray)
  .enter().append('rect')
  .style('fill', function() {
  if (currentArray[t] >= plan[t + num]) {
    t++;
    return "#80B997";
  }
  else {
    t++;
    return "#F26C64";
  }
  })
  .attr('width', xScale.bandwidth())
  .attr('height', function(d) {
  return yScale(d);
  })
  .attr('x', function(d, i) {
  return xScale(i);
  })
  .attr('y', function(d) {
  return height - 50 - yScale(d);
  })

  svg.selectAll('text')
  .data(currentArray)
  .enter()
  .append('text')
  .attr('fill', 'black')
  .attr('font-family', 'Times New Roman')
  .attr('letter-spacing', '1px')
  .attr('font-weight', 'normal')
  .attr('font-size', sizeFont)
  .attr('text-anchor', 'middle')
  .attr('x', function (d, i) {
    return xScale(i);
  })
  .attr('y', function (d) {
    return height - 50 - 1.25*sizeFont - yScale(d);
  })
  .attr('dx', xScale.bandwidth() / 2)
  .attr('dy', '1em')
  .text(function (d) {
    return d;
  })

  let xAxisGroup = svg.append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0, ${height - 50})`);

  const xAxisScale = d3.scaleBand()
  .domain(currentDates)
  .range([0, width]);

  const xAxis = d3.axisBottom(xAxisScale).ticks(currentDates.length);
  xAxis(xAxisGroup);
}

threeMonths.onclick = function() {
  let currentArray = [],
  currentDates = [];
  for (let p = 0; p < 3; p++) {
    currentArray[p] = fact[21 + p];
    currentDates[p] = dates[21 + p];
  }
  d3.select('svg').remove();
  d3.select('svg').remove();
  drawLine(21, currentArray);
  drawGraf(21, currentArray, currentDates, 20);
  }

sixMonths.onclick = function() {
  let currentArray = [],
  currentDates = [];
  for (let p = 0; p < 6; p++) {
    currentArray[p] = fact[18 + p];
    currentDates[p] = dates[18 + p];
  }
  d3.select('svg').remove();
  d3.select('svg').remove();
  drawLine(18, currentArray);
  drawGraf(18, currentArray, currentDates, 20);
  }

oneYear.onclick = function() {
  let currentArray = [],
  currentDates = [];
  for (let p = 0; p < 12; p++) {
    currentArray[p] = fact[12 + p];
    currentDates[p] = dates[12 + p];
  }
  d3.select('svg').remove();
  d3.select('svg').remove();
  drawLine(12, currentArray);
  drawGraf(12, currentArray, currentDates, 14);
  }

twoYears.onclick = function() {
  let currentArray = [],
  currentDates = [];
  for (let p = 0; p < 24; p++) {
    currentArray[p] = fact[p];
    currentDates[p] = dates[p];
  }
  d3.select('svg').remove();
  d3.select('svg').remove();
  drawLine(0, currentArray);
  drawGraf(0, currentArray, currentDates, 8);
  }
