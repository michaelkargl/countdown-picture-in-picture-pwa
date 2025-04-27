import * as React from "react"
import { TimerEntity } from "../../models"
import { PictureInPictureContainer } from "../PictureInPictureContainer/PictureInPictureContainer"
import { ProgressBar } from "../ProgressBar/ProgressBar"
import "./timer.css"
import { DateTime } from "luxon"
import Countdown, { CountdownRenderProps } from "react-countdown"
import { CountdownRendererFn } from "react-countdown/dist/Countdown"

export type TimerProps = {
  timer: TimerEntity
}

export const Timer: React.FC<TimerProps> = (props: TimerProps) => {
  const renderer: CountdownRendererFn = (
    rendererProps: CountdownRenderProps
  ) => {
    const { hours, minutes, seconds, completed } = rendererProps

    if (completed) {
      return <span>Timer finished 🎇</span>
    }

    const percent = getTimerPercentage(props.timer) * 100
    return (
      <ProgressBar percentage={percent} color={"green"}>
        <span>
          {hours}:{minutes}:{seconds} | {percent}
        </span>
      </ProgressBar>
    )
  }

  return (
    <PictureInPictureContainer id={props.timer.id}>
      <div className="timer">
        <Countdown
          date={props.timer.endTime.toJSDate()}
          intervalDelay={props.timer.refreshIntervalInMs}
          renderer={renderer}
          precision={2}
        >
          <span>Timer finished</span>
        </Countdown>
      </div>
    </PictureInPictureContainer>
  )
}

function toDateTime(date: Date | number | string): DateTime | undefined {
  if (date instanceof Date) {
    return DateTime.fromJSDate(date)
  }
  if (typeof date === "number") {
    return DateTime.fromMillis(date)
  }
  return DateTime.fromISO(date.toString())
}

function getTimerPercentage(timer: TimerEntity, precision = 4): number {
  const duration = timer.endTime.diff(timer.startTime)
  const remaining = timer.endTime.diffNow()
  const percentage = remaining.milliseconds / duration.milliseconds
  return +percentage.toFixed(precision)
}
