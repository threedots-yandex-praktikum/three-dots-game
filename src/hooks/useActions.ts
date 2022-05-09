import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "../store/reducers/rootActions";

export const useActions = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  return bindActionCreators(actionCreators, dispatch);
};
