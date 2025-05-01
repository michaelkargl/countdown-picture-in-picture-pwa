import * as React from "react"
import { PictureInPictureContainer, Timer } from "../components"
import { TimerModel } from "../models"
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

const IndexPage = () => {
  const { timerDb } = useContext(TimerDbContext)
  const [timers, setTimers] = useState<readonly TimerModel[]>([])

  useEffect(() => {
    const loadTimersAsync = async () => {
      const storedTimers = await timerDb.getTimersAsync()
      setTimers(storedTimers)
    }

    loadTimersAsync().then(r => {
      console.log("Loaded timers for %o", r)
    })
  }, [])

  function timerChanged(timer: Readonly<TimerModel>): void {
    console.log("Timer changed", timer)
    setTimers(timers.map(t => (t.id === timer.id ? timer : t)))
  }

  return (
    <div className="index">
      <PictureInPictureContainer id="test">
        {timers.map((timer, index) => (
          <Timer
            key={`timer-${index}`}
            timer={timer}
            timerChanged={timerChanged}
          />
        ))}
      </PictureInPictureContainer>
    </div>
  )
}

// Context enabled index page
export default (props: PropsWithChildren<{}>): ReactElement => (
  <Layout>
    <IndexPage />
  </Layout>
)
