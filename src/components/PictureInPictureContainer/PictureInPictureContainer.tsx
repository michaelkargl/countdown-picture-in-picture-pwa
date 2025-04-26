import * as React from "react"
import { PropsWithChildren, ReactElement, useMemo, useState } from "react"
import { WindowExtended } from "../../models/WindowExtended"

type PictureInPictureClosedCallback = () => void
type PictureInPictureContainerProps = PropsWithChildren<{
  id: string
}>

export const PictureInPictureContainer: React.FC<PictureInPictureContainerProps> = (
  props: PictureInPictureContainerProps
): React.ReactElement => {
  const pipContainerId = useMemo(() => getPipContainerId(props.id), [props.id])
  const pipButtonId = useMemo(() => getPipButtonId(props.id), [props.id])

  return (
    <div id={pipContainerId}>
      <div id={pipButtonId} onClick={() => showPictureInPictureAsync(props.id)}>
        {props.children}
      </div>
    </div>
  )
}

function getPipContainerId(id: string): string {
  console.count(`getPipContainerId ${id}`)
  return `pip-container-${id}`
}

function getPipButtonId(id: string): string {
  console.count(`getPipButtonId ${id}`)
  return `pip-button-${id}`
}

function onPictureInPictureClose(callback: PictureInPictureClosedCallback) {
  if (!supportsPictureInPicture(window)) {
    throw new Error("The current browser does not support Picture in Picture")
  }

  const pipWindow = window.documentPictureInPicture.window
  if (!pipWindow) {
    console.debug("No Picture in Picture window found / none seems to be open")
    return
  }

  pipWindow.addEventListener("pagehide", event => {
    callback()
  })
}

function togglePipButtonVisibility(pipId: string) {
  const pipButtonId = getPipButtonId(pipId)
  const pipButton = document.querySelector(`#${pipButtonId}`)
  if (!pipButton) {
    throw new Error(
      `Unable to set visibility of element [#${pipButtonId}]: it cound not be found.`
    )
  }

  const visibility = pipButton.checkVisibility()
  const newVisibility = visibility ? "hidden" : "visible"
  pipButton.setAttribute("visibility", newVisibility)
}

/**
 * @see https://developer.chrome.com/docs/web-platform/document-picture-in-picture/
 * @see https://hackernoon.com/how-to-document-picture-in-picture-in-react-with-typescript
 */
async function showPictureInPictureAsync(pipId: string): Promise<void> {
  if (!supportsPictureInPicture(window)) {
    throw new Error("The current browser does not support Picture in Picture")
  }

  const pipContainerId = getPipContainerId(pipId)
  const pipContainer = document.querySelector(`#${pipContainerId}`)
  if (!pipContainer) {
    throw new Error(
      `Unable to set element with id [${pipContainerId}] into Picture in Picture mode: it is null.`
    )
  }

  const pipDocument = pipContainer.firstChild
  if (!pipDocument) {
    console.error(
      `Unable to show picture in picture. Element [#${pipContainerId}] has no children to view.`
    )
    return
  }

  const pipWindow = await window.documentPictureInPicture.requestWindow({
    disallowReturnToOpener: true
  })
  copyStylesTo(document.documentElement, pipWindow.document.documentElement)
  pipWindow.document.body.append(pipDocument)

  onPictureInPictureClose(() => {
    pipContainer.append(pipDocument)
    togglePipButtonVisibility(pipId)
  })

  if (!supportsPictureInPicture(window)) {
    throw new Error("The current browser does not support Picture in Picture")
  }
}

function supportsPictureInPicture(win: object): win is WindowExtended {
  const extWindow = (win as any) as WindowExtended
  return !!extWindow && !!extWindow.documentPictureInPicture
}

function* getStyleSheets(): IterableIterator<CSSStyleSheet> {
  const styleSheets = document.styleSheets
  for (let i = 0; i < styleSheets.length; i++) {
    yield styleSheets[i]
  }
}

function* getCSSRules(styleSheet: CSSStyleSheet): IterableIterator<CSSRule> {
  const cssRules = styleSheet.cssRules

  if (!cssRules) {
    console.debug("Stylesheet does not contain any CSS rules. Skipping...")
    return
  }

  for (let i = 0; i < cssRules.length; i++) {
    yield cssRules[i]
  }
}

function getCSSRulesAsArray(styleSheet: CSSStyleSheet): CSSRule[] {
  const rules: CSSRule[] = []
  for (const rule of getCSSRules(styleSheet)) {
    rules.push(rule)
  }
  return rules
}

function copyStylesTo(source: HTMLElement, destination: HTMLElement) {
  for (let sheet of getStyleSheets()) {
    if (!sheet.cssRules) {
      continue
    }

    const cssRuleArray = getCSSRulesAsArray(sheet)
    if (!cssRuleArray?.length) {
      continue
    }

    try {
      const cssRules = cssRuleArray.map(rule => rule.cssText).join("")
      const style = document.createElement("style")
      style.textContent = cssRules
      destination.ownerDocument.head.appendChild(style)

    } catch (ex) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = sheet.type;
      link.media = sheet.media.mediaText;
      link.href = link.href;
      destination.ownerDocument.head.appendChild(link)
    }
  }
}
