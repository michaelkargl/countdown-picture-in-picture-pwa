import * as React from "react"
import { ReactElement } from "react"
import { ProgressBar, ProgressBarProps } from "./ProgressBar"
import {
  Box,
  Button,
  Card,
  Collapsible,
  Flex,
  GridItem,
  InputGroup,
  SimpleGrid,
} from "@chakra-ui/react"
import { TimerEditor } from "../Timer/timer-editor"
import { TimerEntity } from "../../models"
import { DateTime } from "luxon"

type EditableProgressBarProps = ProgressBarProps & {
  timerChanged: (timer: TimerEntity) => void
}

export const EditableProgressBar: React.FC<EditableProgressBarProps> = (
  props: EditableProgressBarProps
): ReactElement => {

  function endTimeChanged(endDateTime: string) {
    const newTimer = { ...props.timer, endTime: DateTime.fromISO(endDateTime) }
    props.timerChanged(newTimer)
  }

  return (
    <div className="editable-progress-bar">
      <Card.Root variant="elevated">
        <Card.Header>
          {props.timer.name}
        </Card.Header>
        <Card.Body>
          <Collapsible.Root>
          <Flex gap={2} grow={1}>
            <div style={{ width: "100%" }}>
              <ProgressBar {...props} />
            </div>
            <div>
              <Collapsible.Trigger>
              <Button size="xs" variant="outline">
                ✏️
              </Button>
              </Collapsible.Trigger>
            </div>
          </Flex>
            <Collapsible.Content>
              <Box padding="4">
                <TimerEditor timer={props.timer} endDateTimeChange={endTimeChanged}/>
              </Box>
            </Collapsible.Content>
          </Collapsible.Root>
        </Card.Body>
      </Card.Root>
    </div>
  )
}
