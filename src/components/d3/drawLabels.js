import * as d3 from 'd3'

export default function drawBars({ targetSVG, dataset, margin, animated, xScale, yScale }) {
  const svg = d3.select(targetSVG)

  const duration = animated ? 1500 : 0
  const delay = animated ? 100 : 0

  const labels = svg
    .select('.chart-labels')
    .selectAll('.label')
    .data(dataset, function (d) {
      return d.name
    })

  const newLabels = labels.enter().append('text').attr('class', 'label').attr('font-family', 'sans-serif').attr('font-size', '14px').attr('fill', 'black')

  const updateLabels = newLabels.merge(labels)

  labels.exit().remove()

  updateLabels
    .transition()
    .duration(duration / 2)
    .text((d) => {
      return d.name
    })
    .attr('dy', '0.75em')
    .attr('y', (d) => {
      return yScale(d.value) - 14
    })
    .transition()
    .duration(duration)
    .delay(delay)
    .attr('x', (d) => {
      return xScale(d.name) + xScale.bandwidth() / 2 - 10
    })

  svg.select('.chart-labels').attr('transform', `translate(${margin.left}, ${margin.top / 2})`)
}
