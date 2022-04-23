import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { Background } from "components/Background/Background";
import React, { useEffect } from "react";
import { FC } from "react";
import { useHistory } from "react-router-dom";



const ErrorPage: FC<IErrorPageProps> = ({ error, callback }) => {
  const history = useHistory();

  useEffect(() => {
    //TODO логирование ошибки
    console.log(error);
  })

  const goBack = () => {
    //TODO из-за асинхронности setState не сразу меняет состояние (думаю проблема решится переходом на редакс)
    callback();
    history.goBack();

  }

  return (
    <Background isGreyScale={true}>
      <Container bgColor={'gray.200'} p="5px">
        <Text align="center">Произошла ошибка: {error?.message}</Text>
        <Flex justifyContent="center" mt="10px">
          <Button onClick={goBack}>Назад</Button>
        </Flex>
      </Container>
    </Background>

  );
}

export default ErrorPage;
