import { createContext } from "react"
import { ITimerDb, TimerDB } from "../db/TimerDB"
import { TimerModelVsTimerEntityMapper } from "../mapping/TimerModelVsTimerEntityMapper"

export interface TimerDbContextProps {
  timerStore: ITimerDb
}

export const TimerDbContext = createContext<TimerDbContextProps>({
  timerStore: new TimerDB(new TimerModelVsTimerEntityMapper())
});


