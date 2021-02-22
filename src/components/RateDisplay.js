import { useState, useRef, useEffect } from 'react'

import calculateScale from './d3/calculateScale'
import drawBackground from './d3/drawBackground'
import drawAxis from './d3/drawAxis'
import drawBars from './d3/drawBars'
import drawLabels from './d3/drawLabels'

export default function RateDisplay(props) {
  const { dataset, width, height, animated } = props

  const [selected, setSelected] = useState(null)

  const targetSVG = useRef(null)

  useEffect(() => {
    const margin = { top: 32, right: 8, bottom: 16, left: 64 }

    const [xScale, yScale] = calculateScale(dataset, height, width, margin)

    const drawData = {
      targetSVG: targetSVG.current,
      dataset,
      height,
      width,
      margin,
      animated,
      xScale,
      yScale,
      selected,
      onSelection: setSelected,
    }

    drawBackground(drawData)
    drawAxis(drawData)
    drawBars(drawData)
    drawLabels(drawData)
  }, [dataset, width, height, animated, selected])

  return (
    <div>
      <svg ref={targetSVG}>
        <g className="chart-group">
          <rect className="chart-background" />
          <g className="x-axis-group" />
          <g className="y-axis-group" />
          <g className="chart-bars" />
          <g className="chart-labels" />
        </g>
      </svg>
    </div>
  )
}
