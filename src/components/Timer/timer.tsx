import * as React from "react"
import { TimerEntity } from "../../models"
import "./timer.css"

type TimerProps = {
  timer: TimerEntity
};

export const Timer: React.FC<TimerProps> = (props: TimerProps) => {
  const id = props.timer.id;
  const pipDocumentId = `pip-${id}`;
  const start = props.timer.startTime;
  const end = props.timer.endTime;

  const remaining = getRemainingTime(start, end);
  const percent = getTimerPercentage(start, end);

  return (<div id={pipDocumentId} className="timer">
    <h1>{remaining} - {percent}%</h1>
    <button type="button">Edit</button>
    <button type="button">Pip</button>
  </div>);
}

function getRemainingTime(start: Date, end: Date): number {
  const startTime = start.getTime();
  const endTime = end.getTime();
  return startTime - endTime;
}

function getTimerDuration(start: Date, end: Date): number {
  const startTime = start.getTime();
  const endTime = end.getTime();
  return endTime - startTime;
}

function getTimerPercentage(start: Date, end: Date): number {
  const duration = getTimerDuration(start, end);
  const remaining = getRemainingTime(start, end);
  return remaining / duration;
}