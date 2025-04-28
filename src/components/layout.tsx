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
    <>
      <ChakraUiProvider>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Box>
        <main>
            {children}
        </main>
        </Box>

        <footer>
          <span>Built with 💖 ({new Date().getFullYear()})</span>
        </footer>
      </ChakraUiProvider>
    </>
  )
}

export default Layout
