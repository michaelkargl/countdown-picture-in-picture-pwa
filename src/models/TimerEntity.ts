import { IsoDateString } from "./IsoDateString"

export interface TimerEntity {
  id: string
  name: string
  refreshIntervalInMs: number
  startTime: IsoDateString
  endTime: IsoDateString
  color: string
}
