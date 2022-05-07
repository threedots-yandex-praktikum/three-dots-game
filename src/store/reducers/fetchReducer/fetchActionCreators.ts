import { EFetchActions } from "./types";

//AC - action creator
export const setFetchOnAC = () => {
  return { type: EFetchActions.FETCH_ON };
};

export const setFetchOffAC = () => {
  return { type: EFetchActions.FETCH_OFF };
};
