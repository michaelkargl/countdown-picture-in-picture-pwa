import * as React from "react"
import Rough from "roughjs"
import { PropsWithChildren, useEffect } from "react"
import "./ProgressBar.css"
import { TimerEntity } from "../../models"

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
      <div className="progress-bar-container">
        <div
          style={{
            width: `${props.percentage}%`,
            backgroundColor: props.timer.color,
          }}
          className="progress-bar"
        >
          <div className="timer-label-overlay">
            <span className="timer-percent">{props.percentage}</span>
            <span className="timer-label">{props.label}</span>
          </div>
        </div>
      </div>
    </>
  )
}
