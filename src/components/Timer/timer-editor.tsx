import React, { ReactElement, useEffect, useState } from "react"
import { Box, Button, Code, Group, Input, InputGroup } from "@chakra-ui/react"
import { TimerModel } from "../../models"
import { DateTime } from "luxon"

export type TimerEditorProps = {
  timer: TimerModel
  deleteTimerClicked: (timer: TimerModel) => void
  saveTimerClicked: (timer: TimerModel) => void
}

export const TimerEditor: React.FC<TimerEditorProps> = (
  props: TimerEditorProps,
): ReactElement => {
  const [ timer, setTimer ] = useState<TimerModel>(props.timer)

  function updateEndTimer(dateTime: string): void {
    setTimer({
      ...timer,
      endTime: DateTime.fromISO(dateTime),
    })
  }

  return (
    <Box className="timer-editor">
      <InputGroup zIndex={{ _focusWithin: "1" }}>
        <Group w="full" attached>
          <label htmlFor="target-date-time-input">Target:&nbsp;</label>
          <Input
            id="target-date-time-input"
            roundedTopRight="1"
            type="datetime-local"
            value={timer?.endTime.toISO({ includeOffset: false })!}
            onChange={e => updateEndTimer(e.currentTarget.value)}
          />

          <Button onClick={() => props.saveTimerClicked(timer)}>💾</Button>
          <Button onClick={() => props.deleteTimerClicked(timer)}>🗑️</Button>
        </Group>
      </InputGroup>
    </Box>
  )
}
