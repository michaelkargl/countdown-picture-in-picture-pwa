import * as React from "react"
import { PropsWithChildren, useMemo, useState } from "react"
import { WindowExtended } from "../../models/WindowExtended"

type PictureInPictureClosedCallback = () => void;
type PictureInPictureContainerProps = PropsWithChildren<{
  id: string
}>;

export const PictureInPictureContainer: React.FC<PictureInPictureContainerProps> = (props: PictureInPictureContainerProps) => {
  const pipContainerId = useMemo(() => getPipContainerId(props.id), [props.id]);
  const pipButtonId = useMemo(() => getPipButtonId(props.id), [props.id]);

  return (<div id={pipContainerId}>
    <div id={pipButtonId} onClick={() => showPictureInPictureAsync(props.id)}>
      {props.children}
    </div>
  </div>)
}

function getPipContainerId(id: string): string {
  console.count(`getPipContainerId ${id}`);
  return `pip-container-${id}`
}

function getPipButtonId(id: string): string {
  console.count(`getPipButtonId ${id}`);
  return `pip-button-${id}`
}

function onPictureInPictureClose(callback: PictureInPictureClosedCallback) {
  if (!supportsPictureInPicture(window)) {
    throw new Error("The current browser does not support Picture in Picture")
  }

  const pipWindow = window.documentPictureInPicture.window;
  pipWindow. addEventListener("pagehide", (event) => {
    callback();
  });
}


function togglePipButtonVisibility(pipId: string) {
  const pipButtonId = getPipButtonId(pipId);
  const pipButton = document.querySelector(`#${pipButtonId}`)
  if (!pipButton) {
    throw new Error(`Unable to set visibility of element [#${pipButtonId}]: it cound not be found.`)
  }

  const visibility = pipButton.checkVisibility();
  const newVisibility = visibility ? "hidden" : "visible";
  pipButton.setAttribute("visibility", newVisibility);
}

async function showPictureInPictureAsync(pipId: string): Promise<void> {

  if (!supportsPictureInPicture(window)) {
    throw new Error("The current browser does not support Picture in Picture")
  }

  const pipContainerId = getPipContainerId(pipId);
  const pipContainer = document.querySelector(`#${pipContainerId}`)
  if (!pipContainer) {
    throw new Error(`Unable to set element with id [${pipContainerId}] into Picture in Picture mode: it is null.`)
  }

  const pipDocument = pipContainer.firstElementChild;
  const pipWindow = await window.documentPictureInPicture.requestWindow({
    disallowReturnToOpener: true
  });
  pipWindow.document.body.append(pipDocument);

  onPictureInPictureClose(() => {
    pipContainer.append(pipDocument);
    togglePipButtonVisibility(pipId);
  })

  if (!supportsPictureInPicture(window)) {
    throw new Error("The current browser does not support Picture in Picture")
  }
}

function supportsPictureInPicture(win: object): win is WindowExtended {
  const extWindow = win as any as WindowExtended
  return !!extWindow && !!extWindow.documentPictureInPicture
}

/**
 *
 * @param id the id of the html element to set the picture in picture state
 * @param state true = enter picture in picture, false = exit picture in picture
 * @see https://developer.chrome.com/docs/web-platform/document-picture-in-picture/
 * @see https://hackernoon.com/how-to-document-picture-in-picture-in-react-with-typescript
 */
async function setPictureInPictureAsync(id: string, state: boolean): Promise<void> {

}
