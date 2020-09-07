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


var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 50,
    bottom: 50,
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
d3.csv("data.csv").then(function (data) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    data.forEach(function (data) {
        data.age = +data.age;
        data.smokes = +data.smokes;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
        .domain([30, d3.max(data, d => d.age)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.smokes)])
        .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var xAxis = d3.axisBottom(xLinearScale);
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
        .data(hairData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.hair_length))
        .attr("cy", d => yLinearScale(d.num_hits))
        .attr("r", "15")
        .attr("fill", "pink")
        .attr("opacity", ".5");

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function (d) {
            return (`${d.rockband}<br>Hair length: ${d.hair_length}<br>Hits: ${d.num_hits}`);
        });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function (data) {
        toolTip.show(data, this);
    })
        // onmouseout event
        .on("mouseout", function (data, index) {
            toolTip.hide(data);
        });

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Number of Billboard 100 Hits");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Hair Metal Band Hair Length (inches)");
}).catch(function (error) {
    console.log(error);
});

// // When the browser loads, makeResponsive() is called.
// // makeResponsive();

// // // When the browser window is resized, makeResponsive() is called.
// // d3.select(window).on("resize", makeResponsive);
