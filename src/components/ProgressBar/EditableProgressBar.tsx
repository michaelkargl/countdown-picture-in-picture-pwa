import * as React from "react"
import { ReactElement } from "react"
import { ProgressBar, ProgressBarProps } from "./ProgressBar"
import { Box, Card, Collapsible, Flex } from "@chakra-ui/react"
import { TimerEditor } from "../Timer/timer-editor"
import { TimerModel } from "../../models"
import { DateTime } from "luxon"

type EditableProgressBarProps = ProgressBarProps & {
  timerChanged: (timer: TimerModel) => void,
  deleteTimerClicked: (timer: TimerModel) => void,
  saveTimerClicked: (timer: TimerModel) => void
}

export const EditableProgressBar: React.FC<EditableProgressBarProps> = (
  props: EditableProgressBarProps,
): ReactElement => {
  function endTimeChanged(endDateTime: string) {
    // you always want to know the time from now to then + it will make the bar long again
    const startTime = DateTime.now();
    const endTime = DateTime.fromISO(endDateTime);
    props.timerChanged({
      ...props.timer,
      startTime,
      endTime,
    });
  }

  return (
    <Box className="editable-progress-bar-component">
      <Card.Root variant="elevated">
        <Card.Header>{props.timer.name}</Card.Header>
        <Card.Body>
          <Collapsible.Root>
            <Flex gap={2} grow={1}>
              <div style={{ width: "100%" }}>
                <ProgressBar {...props} />
              </div>
              <div>
                <Collapsible.Trigger size="xs" variant="outline">
                  🔽
                </Collapsible.Trigger>
              </div>
            </Flex>
            <Collapsible.Content>
              <Box padding="4">
                <TimerEditor
                  timer={props.timer}
                  endDateTimeChange={endTimeChanged}
                  deleteTimerClicked={props.deleteTimerClicked}
                  saveTimerClicked={props.saveTimerClicked}
                />
              </Box>
            </Collapsible.Content>
          </Collapsible.Root>
        </Card.Body>
      </Card.Root>
    </Box>
  )
}
