import { RandomUtils } from "./random-utils"
import { ColorPalette } from "@chakra-ui/react"

const CHAKRA_COLORS = [
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
  "red",
  "gray",
]

export class ChakraUiUtils {
  public static getRandomPaletteColor(): string {
    return RandomUtils.getRandomElement(CHAKRA_COLORS)
  }
}
