import React, { useState, useEffect } from 'react'

import data from './data/homicide.json'

import DateSelector from './components/DateSelector'
import RateDisplay from './components/RateDisplay'

const { dates, states } = data

function App() {
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth - 16)
    setHeight(window.innerHeight - 64)
  }

  useEffect(() => {
    window.addEventListener('resize', updateWidthAndHeight)

    updateWidthAndHeight()

    return () => window.removeEventListener('resize', updateWidthAndHeight)
  }, [])

  const dataset = states
    .filter((state) => state.rates[index])
    .map((state) => {
      return {
        name: state.code,
        value: state.rates[index],
      }
    })
    .sort((a, b) => {
      if (a.value > b.value) return -1
      if (a.value < b.value) return 1

      return 0
    })

  return (
    <div className="App">
      <DateSelector dates={dates} selected={index} onSelection={setIndex} />
      <hr />
      <RateDisplay dataset={dataset} width={width} height={height} />
    </div>
  )
}

export default App
