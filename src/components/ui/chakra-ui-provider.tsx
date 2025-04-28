"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import React from "react"
import {
  ColorModeProvider,
  type ColorModeProviderProps
} from "./color-mode"
import { ThemeProvider } from "next-themes"

export function ChakraUiProvider(props: ColorModeProviderProps) {

  // Mind the order of providers
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props}>
        <ThemeProvider enableSystem={true}>
          {props.children}
        </ThemeProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}
