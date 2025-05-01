import React, { ReactElement, useEffect, useState } from "react"
import { Code, Group, Input, InputGroup } from "@chakra-ui/react"
import { TimerModel } from "../../models"

export type TimerEditorProps = {
  timer: TimerModel
  endDateTimeChange: (endDateTime: string) => void
}

export const TimerEditor: React.FC<TimerEditorProps> = (
  props: TimerEditorProps
): ReactElement => (
  <div className="timer-editor">
    <InputGroup zIndex={{ _focusWithin: "1" }}>
      <Group w="full" attached>
        <label htmlFor="target-date-time-input">Target:&nbsp;</label>
        <Input
          id="target-date-time-input"
          roundedTopRight="1"
          type="datetime-local"
          value={props.timer.endTime.toISO({ includeOffset: false })!}
          onChange={e => {
            props.endDateTimeChange(e.currentTarget.value)
          }}
        />
      </Group>
    </InputGroup>
  </div>
)
