import { act } from "react-dom/test-utils";
import { resolutions } from "../settings";

export const getUrlFileType = (url: string) => {
  const urlArray = url.split(".");
  return urlArray[urlArray.length - 1];
};

export const deviceMediaQuery = {
  mobileS: `(max-width: ${resolutions.mobileS})`,
  mobileM: `(max-width: ${resolutions.mobileM})`,
  mobileL: `(max-width: ${resolutions.mobileL})`,
  tablet: `(max-width: ${resolutions.tablet})`,
  laptop: `(max-width: ${resolutions.laptop})`,
  laptopL: `(max-width: ${resolutions.laptopL})`,
  desktop: `(max-width: ${resolutions.desktop})`,
};

export const waitForComponentToPaint = async (wrapper: any) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();
  });
};
