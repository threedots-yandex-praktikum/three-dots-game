import React, { FC, useCallback, useState } from 'react';
import './style.scss';
import {
  TInputProps,
  TRegisterProps,
} from "pages/Register/types";
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


export const VALIDATION = {
  REQUIRED: {
    pattern: /(\\S){1,}/,
    message: 'Поле является обязательным',
  },
  EMAIL: {
    pattern: /[a-z\\d\\-]+@[a-z]+\\.[a-z]+/,
    message: 'только латиница, цифры, символ "-"',
  },
  LOGIN: {
    pattern: /(?=.*[a-zA-Z\\-_])[a-zA-Z\\-_\\d]{3,20}/,
    message: 'только латиница, цифры, символы "_" и "-", от 3 до 20 символов, начинается не с цифры',
  },
  FIRST_NAME: {
    pattern: /[A-ZА-Я][A-ZА-Яа-яa-z\\-]+/,
    message: 'только латиница, кириллица, символ "-"',
  },
  SECOND_NAME: {
    pattern: /[A-ZА-Я][A-ZА-Яа-яa-z\\-]+/,
    message: 'только латиница, кириллица, символ "-"',
  },
  PHONE: {
    pattern: /(\\+?\\d+){10,15}/,
    message: 'только цифры, от 10 до 15 символов, может начинаться с +',
  },
  PASSWORD: {
    pattern: /(?=.*[A-ZА-Я])(?=.*[0-9]).{8,40}/,
    message: 'только кириллица, латиница, цифры, от 8 до 40 символов',
  },
};

const REGISTER_FORM_SCHEMA = [
  {
    id: 'login',
    label: 'Логин',
    pattern: VALIDATION.LOGIN.pattern,
    error: VALIDATION.LOGIN.message,
    placeholder: '',
    gridProps: {
      colSpan: 2,
    },
  },
  {
    id: 'email',
    label: 'Почта',
    pattern: VALIDATION.EMAIL.pattern,
    error: VALIDATION.EMAIL.message,
    placeholder: '',
  },
  {
    id: 'first_name',
    label: 'Имя',
    pattern: VALIDATION.FIRST_NAME.pattern,
    error: VALIDATION.FIRST_NAME.message,
    placeholder: '',
  },
  {
    id: 'second_name',
    label: 'Фамилия',
    pattern: VALIDATION.SECOND_NAME.pattern,
    error: VALIDATION.SECOND_NAME.message,
    placeholder: '',
  },
  {
    id: 'phone',
    label: 'Телефон',
    pattern: VALIDATION.PHONE.pattern,
    error: VALIDATION.PHONE.message,
    placeholder: '',
  },
  {
    id: 'password',
    label: 'Пароль',
    type: 'password',
    pattern: VALIDATION.PASSWORD.pattern,
    error: VALIDATION.PASSWORD.message,
    placeholder: '',
  },
  {
    id: 'password_repeat',
    label: 'Пароль (ещё раз)',
    type: 'password',
    pattern: VALIDATION.PASSWORD.pattern,
    error: VALIDATION.PASSWORD.message,
    placeholder: '',
  },
];

const INITIAL_STATE = {
  login: '',
  email: '',
  first_name: '',
  second_name: '',
  phone: '',
  password: '',
  password_repeat: '',
};

export const Register: FC<TRegisterProps> = () => {

  const [formState, setFormState] = useState(INITIAL_STATE);

  const history = useHistory();

  const updateStateByKey = useCallback(
    (key, value) => {
      const updatedState = {
        ...formState,
        [key]: value,
      };

      return setFormState(updatedState);
    },
    [formState, setFormState],
  )

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log(formState)
    },
    [formState],
  );

  const onClose = useCallback(
    () => history.push(LOGIN_ROUTE),
    [history],
  );

  return (
    <Background>
      <Box>
        <Flex align="center" justify="center">
          <Logo/>
        </Flex>
        <Box
          mt={8}
          bg="white"
          p={6}
          rounded="lg"
          w={1000}
          boxShadow="lg"
        >
          <form onSubmit={onSubmit}>
          <Grid templateColumns='repeat(2, 1fr)' gap={6}>
            {
              REGISTER_FORM_SCHEMA
                .map(
                  ({
                     id,
                     label,
                     error,
                     type,
                     pattern,
                     placeholder,
                     gridProps = {},
                   }) => {
                    // @ts-ignore
                    const value = formState[id];

                    return (
                      <GridItem key={id} {...gridProps}>
                        {
                          _renderInput({
                            id,
                            label,
                            type,
                            error: value.match(pattern) == null ? error : undefined,
                            placeholder,
                            value,
                            onChange: e => updateStateByKey(id, e.target.value),
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
                >
                  Зарегистрироваться
                </Button>
              </Flex>
            </GridItem>

          </Grid>
          </form>
        </Box>
      </Box>
    </Background>
  )
}

const _renderInput = ({
  id,
  label,
  error,
  placeholder,
  value,
  onChange,
  type = 'text',
}: TInputProps) => {

  return (
    <FormControl isInvalid={!!error} key={id}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
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



Register.propTypes = {

};
