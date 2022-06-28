import { useDispatch } from 'react-redux';
import { AppDispatch } from 'client/store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
