import * as React from "react"
import Rough from "roughjs"
import { PropsWithChildren, useEffect } from "react"
import "./ProgressBar.css"
import { TimerEntity } from "../../models"
import { HStack, Progress } from "@chakra-ui/react"

type ProgressBarProps = PropsWithChildren<{
  timer: TimerEntity
  percentage: number
  label: string
}>

export const ProgressBar: React.FC<ProgressBarProps> = (
  props: ProgressBarProps
) => {

  return (
    <>
      <Progress.Root
        min={0}
        max={100}
        defaultValue={props.percentage}
        value={Math.max(0, props.percentage)}
        variant="subtle"
        shape='rounded'
        colorPalette={props.timer.color}

        size="xl"
      >
        <HStack gap={5}>
          <Progress.Label>{props.label}</Progress.Label>
          <Progress.Track flex='1'>
            <Progress.Range />
          </Progress.Track>
          <Progress.ValueText>{props.percentage.toFixed(2)}</Progress.ValueText>
        </HStack>
      </Progress.Root>
    </>
  )
}
