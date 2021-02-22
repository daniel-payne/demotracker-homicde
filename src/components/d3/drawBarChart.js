import * as d3 from "d3";

export default function drawBarChart({
  targetSVG,
  drawHeight = 320,
  drawWidth = 460,
  dataset,
}) {
  if (!dataset) {
    return;
  }
  if (!targetSVG) {
    return;
  }

  const margin = { top: 10, right: 10, bottom: 10, left: 10 };

  const width = drawWidth - margin.left - margin.right;
  const height = drawHeight - margin.top - margin.bottom;

  const greyColor = "#898989";
  const barColor = d3.interpolateInferno(0.4);
  const highlightColor = d3.interpolateInferno(0.3);

  const formatPercent = d3.format(".0%");

  const svg = d3.select(targetSVG);

  if (!svg) {
    return;
  }

  svg.selectAll("g").remove();

  svg
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g");
  // .attr("transform", "translate(" + margin.left  + "," + margin.top + ")");

  const xScale = d3
    .scaleBand()
    .range([0, width])
    .padding(0.4)
    .domain(
      dataset.map((d) => {
        return d.name;
      })
    );

  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([
      0,
      d3.max(dataset, (d) => {
        return d.value;
      }),
    ]);

  const xAxis = d3.axisBottom(xScale).tickSize([]).tickPadding(10);
  const yAxis = d3.axisLeft(yScale).tickFormat(formatPercent);

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g").attr("class", "y axis").call(yAxis);

  svg
    .selectAll(".bar")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .style("display", (d) => {
      return d.value === null ? "none" : null;
    })
    .style("fill", (d) => {
      return d.value ===
        d3.max(dataset, (d) => {
          return d.value;
        })
        ? highlightColor
        : barColor;
    })
    .attr("x", (d) => {
      return xScale(d.name);
    })
    .attr("y", (d) => {
      return yScale(d.value) - margin.bottom;
    })
    .attr("width", xScale.bandwidth())
    // .attr("y", (d) => {
    //   return height;
    // })
    // .attr("height", 0)
    // .transition()
    // .duration(10)
    // .delay(function (d, i) {
    //   return i * 150;
    // })

    .attr("height", (d) => {
      return height - yScale(d.value);
    });

  // svg
  //   .selectAll(".label")
  //   .data(dataset)
  //   .enter()
  //   .append("text")
  //   .attr("class", "label")
  //   .style("display", (d) => {
  //     return d.value === null ? "none" : null;
  //   })
  //   .attr("x", (d) => {
  //     return x(d.year) + x.bandwidth() / 2 - 8;
  //   })
  //   .style("fill", (d) => {
  //     return d.value ===
  //       d3.max(dataset, (d) => {
  //         return d.value;
  //       })
  //       ? highlightColor
  //       : greyColor;
  //   })
  //   .attr("y", (d) => {
  //     return height;
  //   })
  //   .attr("height", 0)
  //   .transition()
  //   .duration(750)
  //   .delay((d, i) => {
  //     return i * 150;
  //   })
  //   .text((d) => {
  //     return formatPercent(d.value);
  //   })
  //   .attr("y", (d) => {
  //     return y(d.value) + 0.1;
  //   })
  //   .attr("dy", "-.7em");
}
