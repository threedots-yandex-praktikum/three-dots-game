import React, { FC, useState } from "react";
import "./style.scss";
import bg from "static/img/bg.png";
import { Logo } from "components/Logo/Logo";
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import { TLoginProps, TInitialValues, TOnSubmit } from "./types";

function getFormLogin(initialValues: TInitialValues, onSubmit: TOnSubmit) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="login">Логин</FormLabel>
              <Field as={Input} id="login" name="login" variant="filled" />
            </FormControl>
            <FormControl isInvalid={!!errors.password && touched.password}>
              <FormLabel htmlFor="password">Пароль</FormLabel>
              <Field
                as={Input}
                id="password"
                name="password"
                type="password"
                variant="filled"
                validate={(value: string) => {
                  let error;

                  if (value.length < 5) {
                    error = "Пароль должен быть больше 5 символов";
                  }

                  return error;
                }}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme="purple" isFullWidth>
              Войти
            </Button>
          </VStack>
        </form>
      )}
    </Formik>
  );
}

export const Login: FC<TLoginProps> = () => {
  const [login] = useState("");
  const [password] = useState("");
  const onSubmit = (values: TInitialValues) => {
    alert(JSON.stringify(values, null, 2));
  };
  return (
    <div>
      <Flex
        bg="gray.100"
        bgImage={`url('${bg}')`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        align="center"
        justify="center"
        h="100vh"
      >
        <Box>
          <Flex align="center" justify="center">
            <Logo/>
          </Flex>
          <Box mt={8} bg="white" p={6} rounded="md" w={400}>
            {getFormLogin(
              {
                login,
                password,
              },
              onSubmit
            )}
          </Box>
        </Box>
      </Flex>
    </div>
  );
};

Login.propTypes = {};
