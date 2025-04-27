import { DateTime } from "luxon"

export interface TimerEntity {
  id: string
  refreshIntervalInMs: number
  startTime: DateTime
  endTime: DateTime
  color: string
}