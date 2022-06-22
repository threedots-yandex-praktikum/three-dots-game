import { Spinner } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import './styles.scss';


interface SpinnerProps {
  loading: boolean,
  children: React.ReactNode,
}


export const SpinnerWrapper = (props: SpinnerProps) => {
  const { mainColor, bgColorSecond } = useAppSelector(state => state.themeReducer);
  return (
    <>
      {
        props.loading && <div className="spinner">
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor={bgColorSecond}
            color={mainColor}
            size='xl'
          />
        </div>
      }
      {props.children}
    </>
  );
};
