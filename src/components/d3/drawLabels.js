import * as d3 from 'd3'

export default function drawBars({ targetSVG, dataset, height, width, margin, animated, xScale, yScale }) {
  const svg = d3.select(targetSVG)

  const duration = animated ? 1500 : 0
  const delay = animated ? 100 : 0

  // const xScale = d3
  //   .scaleBand()
  //   .range([0, width - margin.left - margin.right])
  //   .padding(0.4)
  //   .domain(
  //     dataset.map((d) => {
  //       return d.name
  //     })
  //   )

  // const yScale = d3
  //   .scaleLinear()
  //   .range([height - margin.top - margin.bottom, 0])
  //   .domain([
  //     0,
  //     d3.max(dataset, (d) => {
  //       return d.value
  //     }),
  //   ])

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
      return yScale(d.value)
    })
    .transition()
    .duration(duration)
    .delay(delay)
    .attr('x', (d) => {
      return xScale(d.name) + xScale.bandwidth() / 2 - 10
    })

  svg.select('.chart-labels').attr('transform', `translate(${margin.left}, ${margin.top / 2})`)
}
