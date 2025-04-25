import * as React from "react"
import { useEffect, useState } from "react"
import { TimerEntity } from "../../models"
import { PictureInPictureContainer } from "../PictureInPictureContainer/PictureInPictureContainer"
import { ProgressBar } from "../ProgressBar/ProgressBar"
import "./timer.css"

export type TimerProps = {
  timer: TimerEntity
};

export const Timer: React.FC<TimerProps> = (props: TimerProps) => {
  const [now, setNow] = useState(new Date())
  const remaining = getRemainingTime(props.timer.startTime, props.timer.endTime)
  const percent = getTimerPercentage(props.timer.startTime, props.timer.endTime)

  useEffect(() => {
    console.debug("useEffect: componentWillMount")

    // Elements in this level of userEffect will be called once (mind the empty dependency array [])
    // https://www.freecodecamp.org/news/react-lifecycle-methods-and-hooks-for-beginners/
    console.debug("Initializing a ticker with a [%ims] interval.", props.timer.refreshIntervalInMs)
    const ticker = setInterval(() => {
      setNow(new Date())
    }, props.timer.refreshIntervalInMs)

    // The returned function will be called before unmounting the component / cleanup function
    // https://robertmarshall.dev/blog/componentwillunmount-functional-components-react/
    return () => {
      console.debug("useEffect: componentWillUnmount")
      clearInterval(ticker)
    }

    // Empty dependency array, runs only once
  }, [])

  return (<PictureInPictureContainer id={props.timer.id}>
    <div className="timer">
      <ProgressBar percentage={percent} color={'green'}>
        <span>{remaining}</span>
      </ProgressBar>

    </div>
  </PictureInPictureContainer>)
}

function getRemainingTime(start: Date, end: Date): number {
  const startTime = start.getTime()
  const endTime = end.getTime()
  return startTime - endTime
}

function getTimerDuration(start: Date, end: Date): number {
  const startTime = start.getTime()
  const endTime = end.getTime()
  return endTime - startTime
}

function getTimerPercentage(start: Date, end: Date): number {
  const duration = getTimerDuration(start, end)
  const remaining = getRemainingTime(start, end)
  return remaining / duration
}