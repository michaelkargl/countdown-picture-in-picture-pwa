"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import React from "react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { ThemeProvider } from "next-themes"

export function ChakraUiProvider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider enableSystem={true}>
        <ColorModeProvider {...props} />
      </ThemeProvider>
    </ChakraProvider>
  )
}
