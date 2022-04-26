import React, {FC, useCallback, useMemo} from "react";
import "./style.scss";
import {Logo} from "components/Logo/Logo";
import {FormikProvider, useFormik} from "formik";
import {VALIDATION} from "constants/validation";
import {Input} from "components/Input/Input";

import {Box, Button, Flex} from "@chakra-ui/react";
import {TLoginProps} from "./types";
import {Background} from "components/Background/Background";
import {UserController} from "../../controllers/UserController";
import {TSignInData} from "../../modules/api/authAPI";
import {useHistory} from "react-router";
import {HOME_ROUTE} from "../../constants/routes";
import {NOTIFICATION_LEVEL, sendNotification} from "../../modules/notification";

const EMPTY_STRING = "";

const REGISTER_FORM_SCHEMA = [
  {
    key: "login",
    label: "Логин",
    placeholder: EMPTY_STRING,
    gridProps: {
      colSpan: 2,
    },
    validate: (value: string) => {
      if (value.match(VALIDATION.LOGIN.pattern) == null) {
        return VALIDATION.LOGIN.message;
      }
    },
  },
  {
    key: "password",
    label: "Пароль",
    type: "password",
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if (value.match(VALIDATION.PASSWORD.pattern) == null) {
        return VALIDATION.PASSWORD.message;
      }
    },
  },
];

const INITIAL_STATE = {
  login: "",
  password: "",
};


export const Login: FC<TLoginProps> = () => {
  const history = useHistory();

  const onSubmit = useCallback(
    (values: TSignInData) => {
      console.log(values);
      return UserController
        .signIn(values)
        .then(() => {
          sendNotification('Успешный вход', NOTIFICATION_LEVEL.SUCCESS);
          return history.push(HOME_ROUTE)
        });
    },
    [history],
  );


  const formik = useFormik({
    initialValues: INITIAL_STATE,
    onSubmit,
  });

  const { errors, touched, handleSubmit, handleChange, values } = formik;

  const isSubmitBtnDisabled = useMemo(
    () =>
      values === INITIAL_STATE || Object.values(errors).some((item) => !!item),
    [values, errors]
  );

  return (
    <div>
      <Background>
        <Box>
          <Flex align="center" justify="center">
            <Logo />
          </Flex>
          <Box w={600} mt={8} p={6} rounded="lg" boxShadow="lg" bg="white">
            <FormikProvider value={formik}>
              <form onSubmit={handleSubmit}>
                {REGISTER_FORM_SCHEMA.map(
                  ({ key, label, type, placeholder, validate }) => {
                    return Input({
                      key,
                      label,
                      type,
                      validate,
                      placeholder,
                      error: errors[key as keyof typeof errors],
                      touched: touched[key as keyof typeof touched],
                      value: values[key as keyof typeof values],
                      onChange: handleChange,
                    });
                  }
                )}

                <Flex align="center" justify="center">
                  <Button
                    w="50%"
                    type="submit"
                    colorScheme="purple"
                    isDisabled={isSubmitBtnDisabled}
                  >
                    Войти
                  </Button>
                </Flex>
              </form>
            </FormikProvider>
          </Box>
        </Box>
      </Background>
    </div>
  );
};
