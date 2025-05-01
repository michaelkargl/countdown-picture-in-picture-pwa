import * as React from "react"
import { PropsWithChildren } from "react"
import "./ProgressBar.css"
import { TimerModel } from "../../models"
import { Box, HStack, Progress } from "@chakra-ui/react"
import { ValueChangeDetails } from "@chakra-ui/react/dist/types/components/slider/namespace"

export type ProgressBarProps = PropsWithChildren<{
  timer: TimerModel
  percentage: number
  label: string
}>

export const ProgressBar: React.FC<ProgressBarProps> = (
  props: ProgressBarProps,
) => {
  function progressChange(details: ValueChangeDetails): void {
    console.log("Progress changed: %o", details)
  }

  return (
    <Box className="progress-bar-component">
      <Progress.Root
        min={0}
        max={100}
        defaultValue={props.percentage}
        value={Math.max(0, props.percentage)}
        variant="subtle"
        shape="rounded"
        colorPalette={props.timer.color}
        onValueChange={progressChange}
        size="xl"
      >
        <HStack gap={5}>
          <Progress.Label>{props.label}</Progress.Label>
          <Progress.Track flex="1">
            <Progress.Range />
          </Progress.Track>
          <Progress.ValueText>{props.percentage.toFixed(2)}</Progress.ValueText>
        </HStack>
      </Progress.Root>
    </Box>
  )
}
