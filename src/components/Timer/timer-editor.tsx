import React, { ReactElement, useEffect, useState } from "react"
import { Code, Group, Input, InputGroup } from "@chakra-ui/react"
import { TimerEntity } from "../../models"
import { DateTime } from "luxon"

export type TimerEditorProps = {
  timer: TimerEntity
  endDateTimeChange: (endDateTime: string) => void
}

export const TimerEditor: React.FC<TimerEditorProps> = (
  props: TimerEditorProps
): ReactElement => (
  <div className="timer-editor">
    <Code>{JSON.stringify(props, null, 2)}</Code>

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
