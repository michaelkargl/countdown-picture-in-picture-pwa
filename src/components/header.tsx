import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { ReactElement } from "react"
import { ColorModeButton } from "./ui/color-mode"

type HeaderProps = {
  siteTitle: string
}

export const Header: React.FC<HeaderProps> = ({ siteTitle }): ReactElement => (
  <header>
    <ColorModeButton />
  </header>
);