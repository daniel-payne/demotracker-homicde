import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

const barColor = d3.interpolateInferno(0.4)

function drawBackground({ targetSVG, height, width, margin }) {
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

function drawAxis({ targetSVG, dataset, height, width, margin }) {
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

function drawBars({ targetSVG, dataset, height, width, margin }) {
  const svg = d3.select(targetSVG)

  const xScale = d3
    .scaleBand()
    .range([0, width - margin.left - margin.right])
    .padding(0.4)
    .domain(
      dataset.map((d) => {
        console.log(d.name)
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

  const bars = svg
    .select('.chart-bars')
    .selectAll('.bar')
    .data(dataset, function (d) {
      return d.name
    })

  const labels = svg
    .select('.chart-bars')
    .selectAll('.label')
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

  const newLabels = labels.enter().append('text').attr('class', 'label').attr('font-family', 'sans-serif').attr('font-size', '14px').attr('fill', 'black')
  // .style('display', (d) => {
  //   return d.name
  // })

  const updateBars = newBars.merge(bars)
  const updateLabels = newLabels.merge(labels)

  bars.exit().remove()
  labels.exit().remove()

  updateBars
    // .transition()
    // .duration(500)
    // .delay(100)
    .attr('y', (d) => {
      return yScale(d.value) + margin.bottom
    })
    .attr('height', (d) => {
      return height - yScale(d.value) - margin.bottom - margin.top
    })
    .transition()
    .duration(1500)
    .delay(100)
    .attr('x', (d) => {
      return xScale(d.name)
    })

  updateLabels
    .text((d) => {
      return d.name
    })
    .attr('dy', '.75em')
    .attr('y', (d) => {
      return yScale(d.value)
    })
    .transition()
    .duration(1500)
    .delay(100)
    .attr('x', (d) => {
      return xScale(d.name) + xScale.bandwidth() / 2 - 10
    })

  svg.select('.chart-bars').attr('transform', `translate(${margin.left}, ${margin.top / 2})`)
}

export default function RateDisplay(props) {
  const { dataset, width, height } = props

  const margin = { top: 32, right: 8, bottom: 16, left: 64 }

  const targetSVG = useRef(null)

  useEffect(() => {
    drawBackground({
      targetSVG: targetSVG.current,
      height,
      width,
      margin,
    })

    drawAxis({
      targetSVG: targetSVG.current,
      dataset,
      height,
      width,
      margin,
    })

    drawBars({
      targetSVG: targetSVG.current,
      dataset,
      height,
      width,
      margin,
    })
  }, [dataset, width, height])

  return (
    <div>
      <svg ref={targetSVG}>
        <g className="chart-group">
          <rect className="chart-background" />
          <g className="x-axis-group" />
          <g className="y-axis-group" />
          <g className="chart-bars" />
        </g>
      </svg>
    </div>
  )
}
