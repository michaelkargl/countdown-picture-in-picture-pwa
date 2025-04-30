import { DateTime } from "luxon"

export interface TimerModel {
  id: string
  name: string
  refreshIntervalInMs: number
  startTime: DateTime
  endTime: DateTime
  color: string
}