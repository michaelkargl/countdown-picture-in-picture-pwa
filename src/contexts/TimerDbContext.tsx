import { createContext } from "react"
import { ITimerDb, TimerDB } from "../db/TimerDB"
import { TimerModelVsTimerEntityMapper } from "../mapping/TimerModelVsTimerEntityMapper"

export interface TimerDbContextProps {
  timerDb: ITimerDb
}

export const TimerDbContext = createContext<TimerDbContextProps>({
  timerDb: new TimerDB(new TimerModelVsTimerEntityMapper())
});


