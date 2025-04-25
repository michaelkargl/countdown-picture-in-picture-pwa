import * as React from "react"
import { PropsWithChildren } from "react"
import "./ProgressBar.css"

type ProgressBarProps = PropsWithChildren<{
  percentage: number;
  color: string;
}>;

export const ProgressBar: React.FC<ProgressBarProps> = (props: ProgressBarProps) => {
  return (<>
    <div className="progress-bar-container">
      <div style={{
        width: `${props.percentage}%`,
        backgroundColor: props.color
      }} className="progress-bar">
        {props.percentage} %
      </div>
    </div>
  </>)
}