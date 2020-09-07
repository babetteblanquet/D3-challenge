// @TODO: YOUR CODE HERE!
// The code for the chart is wrapped inside a function that
// automatically resizes the chart
// function makeResponsive() {

// // if the SVG area isn't empty when the browser loads,
// // remove it and replace it with a resized version of the chart
// var svgArea = d3.select("#scatter").select("svg");

// // clear svg is not empty
// if (!svgArea.empty()) {
//     svgArea.remove();
// }

var svgWidth = 1200;
var svgHeight = 500;

var margin = {
    top: 50,
    bottom: 70,
    right: 50,
    left: 50
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

// Append SVG element
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append group element
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Read CSV
d3.csv("data.csv").then(function(data) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    data.forEach(function (data) {
        data.age = +data.age;
        data.smokes = +data.smokes;
        data.abbr = data.abbr;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
        .domain([30.3, d3.max(data, d => d.age)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([9, d3.max(data, d => d.smokes)])
        .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var xAxis = d3.axisBottom(xLinearScale).ticks(14);
    var yAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("opacity", ".5");
        
    //Append text into circles
    var textElems = chartGroup.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(data => data.abbr)
        .attr("x", d => xLinearScale(d.age))
        .attr("y", d => yLinearScale(d.smokes))
        .attr('font-size',10)//font size
        .attr('dx', -8)//positions text towards the left of the center of the circle
        .attr('dy',4)
        .style('fill', 'black');

        // const nodeElems = svg.append('g')
        // .selectAll('circle')
        // .data(nodes)
        // .enter().append('circle')
        // .attr('r',radius)
        // .attr('fill', getNodeColor)
        
        // const textElems = svg.append('g')
        // .selectAll('text')
        // .data(nodes)
        // .enter().append('text')
        // .text(node => node.label)
        // .attr('font-size',8)//font size
        // .attr('dx', -10)//positions text towards the left of the center of the circle
        // .attr('dy',4)

    // // Step 6: Initialize tool tip
    // // ==============================
    // var toolTip = d3.tip()
    //     .attr("class", "tooltip")
    //     .offset([80, -60])
    //     .html(function (d) {
    //         return (`${d.rockband}<br>Hair length: ${d.hair_length}<br>Hits: ${d.num_hits}`);
    //     });

    // // Step 7: Create tooltip in the chart
    // // ==============================
    // chartGroup.call(toolTip);

    // // Step 8: Create event listeners to display and hide the tooltip
    // // ==============================
    // circlesGroup.on("click", function (data) {
    //     toolTip.show(data, this);
    // })
    //     // onmouseout event
    //     .on("mouseout", function (data, index) {
    //         toolTip.hide(data);
    //     });

    // Step 9: Create axes labels
    //  ==============================
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Smokers (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top})`)
        .attr("class", "axisText")
        .text("Age (average)");
  }).catch(function (error) {
    console.log(error);
});

// // When the browser loads, makeResponsive() is called.
// // makeResponsive();

// // // When the browser window is resized, makeResponsive() is called.
// // d3.select(window).on("resize", makeResponsive);
