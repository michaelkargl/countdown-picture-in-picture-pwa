/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Header } from "./header"
import { ChakraUiProvider } from "./ui/chakra-ui-provider"
import "@fontsource/fusion-pixel-12px-monospaced-jp"
import "./layout.scss"
import { Box } from "@chakra-ui/react"
import { TimerDbContext } from "../contexts"
import { TimerDB } from "../db/TimerDB"
import { TimerModelVsTimerEntityMapper } from "../mapping/TimerModelVsTimerEntityMapper"

const TIMER_DB = new TimerDB(new TimerModelVsTimerEntityMapper())

type LayoutProps = React.PropsWithChildren<{}>
const Layout: React.FC<LayoutProps> = ({ children }): React.ReactElement => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ChakraUiProvider>
      <TimerDbContext.Provider value={{ timerDb: TIMER_DB }}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Box>
          <main>{children}</main>
        </Box>

        <footer>
          <span>Built with 💖 ({new Date().getFullYear()})</span>
        </footer>
      </TimerDbContext.Provider>
    </ChakraUiProvider>
  )
}

export default Layout
