import React, { FC, useCallback, useMemo } from 'react';
import {
  TInputProps,
  TRegisterProps,
} from "./types";
import {
  Box, Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import {Logo} from "components/Logo/Logo";
import { Background } from 'components/Background/Background';
import {LOGIN_ROUTE} from "../../constants/routes";
import {useHistory} from "react-router";
import {Field, FormikProvider, useFormik} from "formik";
import { EMPTY_STRING, REGISTER_FORM_SCHEMA } from './constants';


const INITIAL_STATE = {
  login: EMPTY_STRING,
  email: EMPTY_STRING,
  first_name: EMPTY_STRING,
  second_name: EMPTY_STRING,
  phone: EMPTY_STRING,
  password: EMPTY_STRING,
  password_repeat: EMPTY_STRING,
};

export const Register: FC<TRegisterProps> = () => {
  const history = useHistory();

  const onSubmit = useCallback(
    values => {
      console.log(values)
    },
    [],
  );

  const onClose = useCallback(
    () => history.push(LOGIN_ROUTE),
    [history],
  );

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    onSubmit,
  })

  const {
    errors,
    touched,
    handleSubmit,
    handleChange,
    values,
  } = formik;

  const isSubmitBtnDisabled = useMemo(
    () => values === INITIAL_STATE ||
      Object.values(errors).some(item => !!item) ||
      values.password.trim() !== values.password_repeat.trim(),
    [values, errors],
  );

  return (
    <Background>
      <Box>
        <Flex align="center" justify="center">
          <Logo/>
        </Flex>
        <Box
          w={1000}
          mt={8}
          p={6}
          rounded="lg"
          boxShadow="lg"
          bg="white"
        >
          <FormikProvider value={formik}>
            <form onSubmit={handleSubmit}>
              <Grid
                templateColumns='repeat(2, 1fr)'
                gap={3}
              >
                {
                  REGISTER_FORM_SCHEMA
                    .map(
                      ({
                         key ,
                         label,
                         type,
                         placeholder,
                          validate,
                         gridProps = {},
                       }) => {
                        return (
                          <GridItem key={key} {...gridProps}>
                            {
                              _renderInput({
                                key,
                                label,
                                type,
                                validate,
                                placeholder,
                                error: errors[key as keyof typeof errors],
                                touched: touched[key as keyof typeof touched],
                                value: values[key as keyof typeof values],
                                onChange: handleChange,
                              })
                            }
                          </GridItem>
                        );
                      },
                    )
                }
                <GridItem colStart={2}>
                  <Flex align="center" justify="center">
                    <Button
                      w="50%"
                      mr={3}
                      onClick={onClose}
                    >
                      Назад
                    </Button>
                    <Button
                      w="50%"
                      type="submit"
                      colorScheme="purple"
                      isDisabled={isSubmitBtnDisabled}
                    >
                      Зарегистрироваться
                    </Button>
                  </Flex>
                </GridItem>
              </Grid>
            </form>
          </FormikProvider>
        </Box>
      </Box>
    </Background>
  )
}

const _renderInput = ({
  key,
  label,
  error,
  validate,
  touched,
  placeholder,
  value,
  onChange,
  type = 'text',
}: TInputProps) => {

  return (
    <FormControl
      isInvalid={touched && !!error}
      key={key}
      pb={touched && error ? 0 : 6}
    >
      <FormLabel htmlFor={key}>{label}</FormLabel>
      <Field
        as={Input}
        key={key}
        name={key}
        type={type}
        value={value}
        onChange={onChange}
        validate={validate}
        variant="filled"
      />
      {
        error ?
          <FormErrorMessage>
            {error}
          </FormErrorMessage> :
          null
      }
      {
        placeholder ?
          <FormHelperText>
            {placeholder}
          </FormHelperText> :
          null
      }
    </FormControl>
  );
}

