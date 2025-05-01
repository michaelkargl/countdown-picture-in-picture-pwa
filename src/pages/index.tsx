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
import { Box, Button, Color } from "@chakra-ui/react"
import { DateTime } from "luxon"
import { RandomUtils } from "../utils/random-utils"
import { ChakraUiUtils } from "../utils/chakra-ui-utils"

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

  async function timerChangedAsync(timer: Readonly<TimerModel>): Promise<void> {
    console.log("Timer changed", timer)
    await timerStore.setTimerAsync(timer)
    await loadTimersAsync()
  }

  function pageReload() {
    location.reload()
  }

  async function addNewTimerAsync(): Promise<void> {
    const timer: TimerModel = {
      id: crypto.randomUUID(),
      startTime: DateTime.now(),
      endTime: DateTime.now().plus({ minute: 1 }),
      refreshIntervalInMs: 1000,
      name: "new",
      color: ChakraUiUtils.getRandomPaletteColor(),
    }
    console.log("Adding new timer", timer)
    await timerChangedAsync(timer)
    // workaround to automatically start all the timers automatically (some are stuck)
    pageReload();
  }

  async function deleteTimerAsync(timer: TimerModel): Promise<void> {
    await timerStore.deleteTimerAsync(timer.id)
    await loadTimersAsync()
    // workaround to have all visual elements deleted automatically (some stay alive)
    pageReload();
  }

  return (
    <Box className="index">
      <Button onClick={addNewTimerAsync}>Add New</Button>
      <PictureInPictureContainer id="test">
        {timers.map((timer, index) => (
          <Timer
            key={`timer-${index}`}
            timer={timer}
            timerChanged={timerChangedAsync}
            saveTimerClicked={timerChangedAsync}
            deleteTimerClicked={deleteTimerAsync}
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
