import * as React from "react"
import { Link } from "gatsby"
import { Timer } from "../components"
import { TimerEntity } from "../models"
import * as luxon from "luxon"
import Layout from "../components/layout"

// ~~0. PiP POC~~
// 1. Get timer (1)
// 2. Show timer (1)
// 3. Timer editor below timer
// 4. PiP timer
// 5. Refactor to support n timers

const IndexPage = () => {
  const timer: TimerEntity = {
    id: "1",
    startTime: luxon.DateTime.now().toJSDate(),
    endTime: luxon.DateTime.now().plus({ minutes: 60 }).toJSDate(),
    refreshIntervalInMs: 1000,
  }

  return (
    <Layout>
      <hr />

      <Timer timer={timer}></Timer>

      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
