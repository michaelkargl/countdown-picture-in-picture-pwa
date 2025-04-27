import * as React from "react"
import { PropsWithChildren, useMemo } from "react"
import { WindowExtended } from "../../models/WindowExtended"
import { Exception, ResourceNotFoundException } from "../../exceptions"
import "./PictureInPictureContainer.scss"

type PictureInPictureClosedCallback = () => void
type PictureInPictureContainerProps = PropsWithChildren<{
  id: string
}>

export const PictureInPictureContainer: React.FC<PictureInPictureContainerProps> = (
  props: PictureInPictureContainerProps
): React.ReactElement => {
  // no need to re-calculate evertime -> memoize
  const pipContainerId = useMemo(() => getPipContainerId(props.id), [props.id])
  const pipButtonId = useMemo(() => getPipButtonId(props.id), [props.id])
  const pipDocumentId = useMemo(() => getPipDocumentClass(props.id), [props.id])

  return (
    <div className="pip-container" id={pipContainerId}>
      <div className={pipDocumentId}>
        <button
          className="pip-button"
          id={pipButtonId}
          onClick={() => showPictureInPictureAsync(props.id)}
        >
          🖥️
        </button>
        {props.children}
      </div>
    </div>
  )
}

function getPipContainerId(id: string): string {
  console.count(`getPipContainerId ${id}`)
  return `pip-container-${id}`
}

function getPipDocumentClass(id: string): string {
  console.count(`getPipDocumentClass ${id}`)
  return `pip-document-${id}`
}

function findPipDocuments(pipId: string, searchRoot = document.documentElement): Element[] {
  const pipDocumentClass = getPipDocumentClass(pipId);
  const pipDocuments = searchRoot.querySelectorAll(`.${pipDocumentClass}`)
  return Array.from(pipDocuments);
}

function getPipButtonId(id: string): string {
  console.count(`getPipButtonId ${id}`)
  return `pip-button-${id}`
}

function getPipButton(pipId: string, searchRoot: HTMLElement = document.documentElement): HTMLButtonElement {
  const buttonId = getPipButtonId(pipId)
  const pipButton = searchRoot.querySelector(`#${buttonId}`)

  ResourceNotFoundException.ThrowIfNullOrUndefined(pipButton, "pipButton")
  return pipButton!;
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

function hidePipButton(pipId: string, searchRoot = document.documentElement) {
  const button = getPipButton(pipId, searchRoot)
  button.setAttribute("visibility", "hidden")
}

/**
 * Creates a picture in picture clone of the pip-container.
 * @see https://developer.chrome.com/docs/web-platform/document-picture-in-picture/
 * @see https://hackernoon.com/how-to-document-picture-in-picture-in-react-with-typescript
 * @throws ResourceNotFoundException if the pipContainer is not found
 */
async function showPictureInPictureAsync(pipId: string): Promise<void> {
  if (!supportsPictureInPicture(window)) {
    throw new Error("The current browser does not support Picture in Picture")
  }

  const pipContainerId = getPipContainerId(pipId)
  const pipContainer = document.querySelector(`#${pipContainerId}`)
  ResourceNotFoundException.ThrowIfNullOrUndefined(pipContainer, "pipContainer")

  const pipDocuments = findPipDocuments(pipId, pipContainer as HTMLElement)
  ResourceNotFoundException.ThrowIfEmptyOrFalsy(pipDocuments, 'pipDocuments');

  const pipWindow = await window.documentPictureInPicture.requestWindow()
  pipWindow.document.documentElement.id = "picture-in-picture"
  copyStylesTo(document.documentElement, pipWindow.document.documentElement)
  pipWindow.document.body.append(pipDocuments[0])

  onPictureInPictureClose(() => {
    console.debug("Picture in Picture closed")
    pipContainer?.append(pipWindow.document.body)
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
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.type = sheet.type
      link.media = sheet.media.mediaText
      link.href = link.href
      destination.ownerDocument.head.appendChild(link)
    }
  }
}
