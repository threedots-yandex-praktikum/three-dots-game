import { Spinner } from '@chakra-ui/react';
import React  from 'react';
import './styles.scss';


interface SpinnerProps {
  loading: boolean,
  children: React.ReactNode,
}


export const SpinnerWrapper = (props: SpinnerProps) => {
  return (
    <>
      {
        props.loading && <div className="spinner">
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='purple.500'
            size='xl'
          />
        </div>
      }
      {props.children}
    </>
  );
};
