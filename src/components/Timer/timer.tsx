import * as React from "react"
import { useEffect, useState } from "react"
import { TimerEntity } from "../../models"
import { PictureInPictureContainer } from "../PictureInPictureContainer/PictureInPictureContainer"
import { ProgressBar } from "../ProgressBar/ProgressBar"
import "./timer.css"
import { DateTime } from "luxon"

export type TimerProps = {
  timer: TimerEntity
}

export const Timer: React.FC<TimerProps> = (props: TimerProps) => {
  const [now, setNow] = useState(DateTime.now())
  const percent = getTimerPercentage(now, props.timer.endTime)

  useEffect(() => {
    console.debug("useEffect: componentWillMount")

    // Elements in this level of userEffect will be called once (mind the empty dependency array [])
    // https://www.freecodecamp.org/news/react-lifecycle-methods-and-hooks-for-beginners/
    console.debug(
      "Initializing a ticker with a [%ims] interval.",
      props.timer.refreshIntervalInMs
    )
    const ticker = setInterval(() => {
      setNow(() => DateTime.now())
    }, 1000)

    // The returned function will be called before unmounting the component / cleanup function
    // https://robertmarshall.dev/blog/componentwillunmount-functional-components-react/
    return () => {
      console.debug("useEffect: componentWillUnmount")
      clearInterval(ticker)
    }

    // Empty dependency array, runs only once
  }, [])

  return (
    <PictureInPictureContainer id={props.timer.id}>
      <div className="timer">
        <ProgressBar percentage={percent} color={"green"}>
          <span>{percent}</span>
        </ProgressBar>
      </div>
    </PictureInPictureContainer>
  )
}

function getTimerPercentage(start: DateTime, end: DateTime): number {
  const duration = end.diff(start);
  const remaining = end.diffNow();
  const percentage = remaining.milliseconds / duration.milliseconds
  return percentage * 100
}
