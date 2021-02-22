import * as d3 from 'd3'

const barColor = d3.interpolateInferno(0.4)

export default function drawBars({ targetSVG, dataset, height, width, margin, animated, xScale, yScale }) {
  const svg = d3.select(targetSVG)

  const duration = animated ? 1500 : 0
  const delay = animated ? 100 : 0

  //   const xScale = d3
  //     .scaleBand()
  //     .range([0, width - margin.left - margin.right])
  //     .padding(0.4)
  //     .domain(
  //       dataset.map((d) => {
  //         return d.name
  //       })
  //     )

  //   const yScale = d3
  //     .scaleLinear()
  //     .range([height - margin.top - margin.bottom, 0])
  //     .domain([
  //       0,
  //       d3.max(dataset, (d) => {
  //         return d.value
  //       }),
  //     ])

  const bars = svg
    .select('.chart-bars')
    .selectAll('.bar')
    .data(dataset, function (d) {
      return d.name
    })

  const newBars = bars
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .style('display', (d) => {
      return d.value === null ? 'none' : null
    })
    .style('fill', barColor)
    .attr('width', xScale.bandwidth())

  const updateBars = newBars.merge(bars)

  bars.exit().remove()

  updateBars
    .transition()
    .duration(duration / 2)
    .attr('y', (d) => {
      return yScale(d.value) + margin.bottom
    })
    .attr('height', (d) => {
      return height - yScale(d.value) - margin.bottom - margin.top
    })
    .transition()
    .duration(duration)
    .delay(delay)
    .attr('x', (d) => {
      return xScale(d.name)
    })

  svg.select('.chart-bars').attr('transform', `translate(${margin.left}, ${margin.top / 2})`)
}
