import * as d3 from 'd3'

export default function drawAxis({ targetSVG, dataset, height, width, margin }) {
  const svg = d3.select(targetSVG)

  const formatPercent = d3.format('0')

  const xScale = d3
    .scaleBand()
    .range([0, width - margin.left - margin.right])
    .padding(0.4)
    .domain(
      dataset.map((d) => {
        return d.name
      })
    )

  const yScale = d3
    .scaleLinear()
    .range([height - margin.top - margin.bottom, 0])
    .domain([
      0,
      d3.max(dataset, (d) => {
        return d.value
      }),
    ])

  const xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10).tickFormat('')
  const yAxis = d3.axisLeft(yScale).tickSize(3).tickFormat(formatPercent)

  svg
    .select('.x-axis-group')
    .attr('transform', `translate(${margin.left},${height - margin.bottom})`)
    .call(xAxis)

  svg.select('.y-axis-group').attr('transform', `translate(${margin.left}, ${margin.top})`).call(yAxis)
}
