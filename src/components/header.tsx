import React, { ReactElement } from "react"
import { Link } from 'gatsby';
import { ColorModeButton } from "./ui/color-mode"

type HeaderProps = {
  siteTitle: string
}

export const Header: React.FC<HeaderProps> = ({ siteTitle }): ReactElement => (
  <header>
    <span>{siteTitle}</span>
    <ColorModeButton />
    <Link to="/presentations">Presentations</Link>
  </header>
);