export enum EFetchActions {
  FETCH_ON = "FETCH_ON",
  FETCH_OFF = "FETCH_OFF",
}
export type TStateFetch = {
  isFetch: boolean;
};
interface IFetchON {
  type: EFetchActions.FETCH_ON;
}
interface IFetchOFF {
  type: EFetchActions.FETCH_OFF;
}

export type TFetchAction = IFetchON | IFetchOFF;
