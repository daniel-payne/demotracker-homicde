import * as d3 from 'd3'

export default function calculateScale(dataset, height, width, margin) {
  const xScale = d3
    .scaleBand()
    .domain(
      dataset.map((d) => {
        return d.name
      })
    )
    .range([0, width - margin.left - margin.right])
    .padding(0.4)

  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataset, (d) => {
        return d.value
      }),
    ])
    .range([height - margin.top - margin.bottom, 0])

  return [xScale, yScale]
}
