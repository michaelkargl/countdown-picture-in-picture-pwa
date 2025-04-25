export interface WindowExtended extends Window {
  documentPictureInPicture: {
    requestWindow: (options?: {
      width?: number;
      height?: number;
      disallowReturnToOpener?: boolean;
      preferInitialWindowPlacement?: boolean
    }) => Promise<Window>;

    window: Window | null;
  };
}