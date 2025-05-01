import { DateTime } from "luxon"

export interface TimerCreateModel {
  name: string
  refreshIntervalInMs: number
  startTime: DateTime
  endTime: DateTime
  color: string
}