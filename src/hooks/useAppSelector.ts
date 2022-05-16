import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../store/reducers/rootReducer';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
