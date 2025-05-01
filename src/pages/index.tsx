import * as React from "react"
import { PictureInPictureContainer, Timer } from "../components"
import { TimerModel } from "../models"
import { DateTime } from "luxon"
import Layout from "../components/layout"
import {
  useState,
  useContext,
  useEffect,
  ReactElement,
  PropsWithChildren,
} from "react"
import { TimerDbContext } from "../contexts"

import "./index.css"

// ~~0. PiP POC~~
// 1. Get timer (1)
// 2. Show timer (1)
// 3. Timer editor below timer
// 4. PiP timer
// 5. Refactor to support n timers

const TIMERS: TimerModel[] = [
  {
    id: "1",
    color: "green",
    name: "green",
    startTime: DateTime.now(),
    endTime: DateTime.now().plus({ minutes: 60 }),
    refreshIntervalInMs: 1000,
  },
  {
    id: "2",
    name: "red",
    color: "red",
    startTime: DateTime.now(),
    endTime: DateTime.now().plus({ minutes: 40 }),
    refreshIntervalInMs: 1000,
  },
  {
    id: "3",
    color: "cyan",
    name: "cyan",
    startTime: DateTime.now(),
    endTime: DateTime.now().plus({ minutes: 20 }),
    refreshIntervalInMs: 1000,
  },
  {
    id: "4",
    color: "magenta",
    name: "magenta",
    startTime: DateTime.now(),
    endTime: DateTime.now().plus({ minutes: 1 }),
    refreshIntervalInMs: 1000,
  },
  {
    id: "5",
    color: "orange",
    name: "orange",
    startTime: DateTime.now(),
    endTime: DateTime.now().plus({ seconds: 6 }),
    refreshIntervalInMs: 1000,
  },
]

const IndexPage = () => {
  const { timerDb } = useContext(TimerDbContext)
  const [timers, setTimers] = useState<readonly TimerModel[]>([])

  useEffect(() => {
    const loadTimersAsync = async () => {

      const storedTimers = await timerDb.getTimersAsync()
      setTimers(storedTimers)
    }

    loadTimersAsync().then(r => {
      console.log('Loaded timers for %o', r)
    });

  }, [])

  function timerChanged(timer: Readonly<TimerModel>): void {
    console.log("Timer changed", timer)
    setTimers(timers.map(t => (t.id === timer.id ? timer : t)))
  }

  return (
    <PictureInPictureContainer id="test">
      <div className="timer-container">
        {timers.map((timer, index) => (
          <Timer
            key={`timer-${index}`}
            timer={timer}
            timerChanged={timerChanged}
          />
        ))}
      </div>
    </PictureInPictureContainer>
  )
}

// Context enabled index page
export default (props: PropsWithChildren<{}>): ReactElement => (
  <Layout>
    <IndexPage />
  </Layout>
)
