import { Button, Container, Flex, Text } from '@chakra-ui/react';
import { Background } from 'components/Background/Background';
import React from 'react';
import { TErrorBoundaryProps, TErrorBoundaryState } from './types';


export class ErrorBoundary extends React.Component<TErrorBoundaryProps> {
  state: TErrorBoundaryState = {
    hasError: false,
    error: null,
  };


  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    //TODO логирование ошибки
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Background isGreyScale={true}>
          <Container bgColor={'gray.200'} p="5px">
            <Text align="center">Произошла ошибка: {this.state.error?.message}</Text>
            <Flex justifyContent="center" mt="10px">
              <Button
                onClick={() => {
                  this.setState({ hasError: null, error: null });
                  this.props.onClick();
                }}
              >
                Назад
              </Button>
            </Flex>
          </Container>
        </Background>
      );
    }
    return this.props.children;
  }
}
