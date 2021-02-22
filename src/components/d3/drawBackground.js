import * as d3 from 'd3'

export default function drawBackground({ targetSVG, height, width, margin }) {
  const svg = d3.select(targetSVG)
  const chart = svg.select('.chart-group')
  const background = chart.select('.chart-background')

  svg.attr('width', width).attr('height', height)

  background
    .attr('width', `calc(100% - ${margin.left + margin.right}px)`)
    .attr('height', `calc(100% - ${margin.bottom}px)`)
    .attr('transform', 'translate(' + margin.left + ',' + 0 + ')')
    .attr('fill', '#F5F5F5')
}
