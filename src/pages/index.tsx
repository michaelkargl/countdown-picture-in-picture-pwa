import * as React from "react"
import { Link } from "gatsby"
import { Timer } from "../components"
import { TimerEntity } from "../models"
import { DateTime } from "luxon"
import Layout from "../components/layout"
import "./index.css"

// ~~0. PiP POC~~
// 1. Get timer (1)
// 2. Show timer (1)
// 3. Timer editor below timer
// 4. PiP timer
// 5. Refactor to support n timers

const IndexPage = () => {
  const timers: TimerEntity[] = [
    {
      id: "1",
      color: "green",
      startTime: DateTime.now(),
      endTime: DateTime.now().plus({ minutes: 60 }),
      refreshIntervalInMs: 1000,
    },
    {
      id: "2",
      color: "red",
      startTime: DateTime.now(),
      endTime: DateTime.now().plus({ minutes: 40 }),
      refreshIntervalInMs: 1000,
    },
    {
      id: "3",
      color: "cyan",
      startTime: DateTime.now(),
      endTime: DateTime.now().plus({ minutes: 20 }),
      refreshIntervalInMs: 1000,
    },
    {
      id: "4",
      color: "magenta",
      startTime: DateTime.now(),
      endTime: DateTime.now().plus({ minutes: 1 }),
      refreshIntervalInMs: 1000,
    },
  ]

  return (
    <Layout>
      <hr />
      <div className="timer-container">
        {timers.map((timer, index) => <Timer key={`timer-${index}`} timer={timer}/>)}

      </div>

      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
