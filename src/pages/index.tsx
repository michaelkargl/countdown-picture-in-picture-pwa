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
import { Box } from "@chakra-ui/react"

const IndexPage = () => {
  const { timerStore } = useContext(TimerDbContext)
  const [timers, setLocalTimers] = useState<readonly TimerModel[]>([])

  useEffect(() => {
    loadTimersAsync().then(r => console.log("Loaded timers %o", r))
  }, [])

  async function loadTimersAsync(): Promise<void> {
    const storedTimers = await timerStore.getTimersAsync()
    setLocalTimers(storedTimers)
  }

  async function timerChanged(timer: Readonly<TimerModel>): Promise<void> {
    console.log("Timer changed", timer);
    await timerStore.setTimerAsync(timer);
    await loadTimersAsync();
  }

  return (
    <Box className="index">
      <PictureInPictureContainer id="test">
        {timers.map((timer, index) => (
          <Timer
            key={`timer-${index}`}
            timer={timer}
            timerChanged={timerChanged}
          />
        ))}
      </PictureInPictureContainer>
    </Box>
  )
}

// Context enabled index page
export default (props: PropsWithChildren<{}>): ReactElement => (
  <Layout>
    <IndexPage />
  </Layout>
)
