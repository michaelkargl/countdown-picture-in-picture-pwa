import * as React from "react"
import Rough from "roughjs"
import { PropsWithChildren, useEffect } from "react"
import "./ProgressBar.css"
import { TimerEntity } from "../../models"

type ProgressBarProps = PropsWithChildren<{
  timer: TimerEntity
  percentage: number
}>

export const ProgressBar: React.FC<ProgressBarProps> = (
  props: ProgressBarProps
) => {
  return (
    <>
      <div className="progress-bar-container">
        <div
          style={{
            width: `${props.percentage}%`,
            backgroundColor: props.timer.color,
          }}
          className="progress-bar"
        >
          {props.percentage} %
        </div>
      </div>
    </>
  )
}
