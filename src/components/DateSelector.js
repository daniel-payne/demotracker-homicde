import { Button } from '@chakra-ui/react'

import { Checkbox } from '@chakra-ui/react'

export default function DateSelector(props) {
  const { dates, selected, onSelection, animated, onAnimated } = props

  return (
    <div className="DateSelector">
      {dates.map((date, index) => (
        <Button key={date} colorScheme={index === selected ? 'blue' : null} size="sm" mr={2} mb={2} onClick={() => onSelection && onSelection(index)}>
          {date}
        </Button>
      ))}
      <Checkbox isChecked={animated} mr={2} mb={2} mt={1} onChange={(e) => onAnimated(e.target.checked)}>
        Use Animation
      </Checkbox>
    </div>
  )
}
