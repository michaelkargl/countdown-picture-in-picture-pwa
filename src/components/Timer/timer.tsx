import * as React from "react"
import { TimerEntity } from "../../models"
import { ProgressBar } from "../ProgressBar/ProgressBar"
import "./timer.css"
import { DateTime } from "luxon"
import Countdown, { CountdownRenderProps } from "react-countdown"
import { CountdownRendererFn } from "react-countdown/dist/Countdown"
import { pad } from '../../utils'

export type TimerProps = {
  timer: TimerEntity
}

export const Timer: React.FC<TimerProps> = (props: TimerProps) => {
  const renderer: CountdownRendererFn = (
    rendererProps: CountdownRenderProps
  ) => {
    const { hours, minutes, seconds } = rendererProps
    const percent = getTimerPercentage(props.timer) * 100
    let label = `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`

    return (
      <ProgressBar percentage={percent} label={label} timer={props.timer}>
        <ProgressBar
          percentage={0}
          label='Timer finished 🎇'
          timer={props.timer}/>
      </ProgressBar>
    )
  }

  return (
    <div className="timer">
      <Countdown
        date={props.timer.endTime.toJSDate()}
        intervalDelay={props.timer.refreshIntervalInMs}
        renderer={renderer}
        precision={2}
        autoStart={true}
      >
        <span>Timer finished</span>
      </Countdown>
    </div>
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
