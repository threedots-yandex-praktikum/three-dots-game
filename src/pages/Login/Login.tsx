import React, { FC, useCallback, useMemo } from "react";
import "./style.scss";
import { Logo } from "components/Logo/Logo";
import { FormikProvider, useFormik } from "formik";
import { VALIDATION } from "constants/validation";
import { renderInput } from "components/Input/Input";

import { Box, Button, Flex } from "@chakra-ui/react";
import { TLoginProps, TInitialValues } from "./types";
import { Background } from "components/Background/Background";

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
  const onSubmit = useCallback((values: TInitialValues) => {
    alert(JSON.stringify(values, null, 2));
  }, []);


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
                    return renderInput({
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
