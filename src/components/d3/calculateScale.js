import * as d3 from 'd3'

export default function calculateScale(dataset, height, width, margin) {
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

  return [xScale, yScale]
}
