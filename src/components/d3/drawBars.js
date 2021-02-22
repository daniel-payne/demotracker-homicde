import * as d3 from 'd3'

const barColor = d3.interpolateInferno(0.4)
const selectedColor = d3.interpolateInferno(0.6)

export default function drawBars({ targetSVG, dataset, height, margin, animated, xScale, yScale, selected, onSelection }) {
  const svg = d3.select(targetSVG)

  const duration = animated ? 1500 : 0
  const delay = animated ? 100 : 0

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

    .attr('width', xScale.bandwidth())

  const updateBars = newBars.merge(bars)

  bars.exit().transition().duration(duration).attr('y', 2000).remove()

  updateBars
    .style('fill', (d) => {
      return d.name === selected ? selectedColor : barColor
    })
    .on('click', function (event, d) {
      event.stopPropagation()

      const newSelected = d.name === selected ? null : d.name

      if (onSelection) {
        onSelection(newSelected)
      }
    })
    .transition()
    .duration(duration / 2)
    .attr('y', (d) => {
      return yScale(d.value)
    })
    .attr('height', (d) => {
      return height - yScale(d.value) - margin.top
    })
    .transition()
    .duration(duration)
    .delay(delay)
    .attr('x', (d) => {
      return xScale(d.name)
    })

  svg.select('.chart-bars').attr('transform', `translate(${margin.left}, ${margin.top / 2})`)
}
