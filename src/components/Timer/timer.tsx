import * as React from "react"
import { TimerModel } from "../../models"
import { ProgressBar } from "../ProgressBar/ProgressBar"
import { DateTime } from "luxon"
import Countdown, { CountdownRenderProps } from "react-countdown"
import { CountdownRendererFn } from "react-countdown/dist/Countdown"
import { pad } from "../../utils"
import { EditableProgressBar } from "../ProgressBar/EditableProgressBar"
import "./timer.css"


export type TimerProps = {
  timer: TimerModel,
  timerChanged: (timer: Readonly<TimerModel>) => void
}

export const Timer: React.FC<TimerProps> = (props: TimerProps) => {

  const renderer: CountdownRendererFn = (
    rendererProps: CountdownRenderProps
  ) => {
      const { hours, minutes, seconds } = rendererProps
    const percent = getTimerPercentage(props.timer) * 100
    let label = `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`

    function timerChanged(timer: Readonly<TimerModel>): void {
      props.timerChanged({...timer});
    }

    return (
      <EditableProgressBar percentage={percent} label={label} timer={props.timer} timerChanged={timerChanged}>
        <ProgressBar
          percentage={0}
          label='Timer finished 🎇'
          timer={props.timer}/>
      </EditableProgressBar>
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

function getTimerPercentage(timer: TimerModel, precision = 4): number {
  const duration = timer.endTime.diff(timer.startTime)
  const remaining = timer.endTime.diffNow()
  const percentage = remaining.milliseconds / duration.milliseconds
  return +percentage.toFixed(precision)
}
