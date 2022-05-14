import { Spinner } from "@chakra-ui/react";
import React from "react";
import { FC } from "react";
import './styles.scss';

interface SpinnerProps {
  loading: boolean
}

const SpinnerWrapper: FC<SpinnerProps> = (props) => {
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
}

export { SpinnerWrapper };
