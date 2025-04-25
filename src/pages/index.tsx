import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Timer } from "../components"
import { TimerEntity } from "../models"

// 0. PiP POC
// 1. Get timer (1)
// 2. Show timer (1)
// 3. Timer editor below timer
// 4. PiP timer
// 5. Refactor to support n timers

const IndexPage = () => {
    const timer: TimerEntity = {
        id: '1',
        startTime: new Date('2025-04-25T21:40:23'),
        endTime: new Date(),
        refreshIntervalInMs: 1000
    }

    return (
      <Layout>
          <SEO title="Home" />
          <h1>Hi people</h1>
          <p>Welcome to your new Gatsby site.</p>
          <p>Now go build something great.</p>
          <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
              <Image />
          </div>
          <Link to="/page-2/">Go to page 2</Link>

          <hr />

          <Timer timer={timer}></Timer>
      </Layout>
    )
}

export default IndexPage
