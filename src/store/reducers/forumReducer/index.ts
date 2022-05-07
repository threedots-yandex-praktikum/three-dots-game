import { EForumActions } from "./types";

const initialState = {
  stub:null
}

export const forumReducer = (state=initialState, action: { type: any; })=>{
  switch (action.type) {
    case EForumActions.SET_TOPICS:
      
      break;
  
    default:
      break;
  }
}