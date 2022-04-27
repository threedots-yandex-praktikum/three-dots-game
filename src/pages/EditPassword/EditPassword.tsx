import React, { useCallback, useMemo } from "react";
import { TRegisterProps } from "./types";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Logo } from "components/Logo/Logo";
import { Background } from "components/Background/Background";
import { PROFILE_ROUTE } from "constants/routes";
import { useHistory } from "react-router";
import { FormikProvider, useFormik } from "formik";
import { EDIT_PASSWORD_FORM_SCHEMA } from "./constants";
import { EMPTY_STRING } from "constants/generalConst";

import { Input } from "components/Input/Input";

const INITIAL_STATE = {
  password: EMPTY_STRING,
  password_repeat: EMPTY_STRING,
};

export const EditPassword = (props: TRegisterProps) => {
  const history = useHistory();

  const onSubmit = useCallback((values) => {
    console.log(values);
  }, []);

  const onClose = useCallback(() => history.push(PROFILE_ROUTE), [history]);

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    onSubmit,
  });

  const { errors, touched, handleSubmit, handleChange, values } = formik;

  const isSubmitBtnDisabled = useMemo(
    () =>
      values === INITIAL_STATE ||
      Object.values(errors).some((item) => !!item) ||
      values.password.trim() !== values.password_repeat.trim(),
    [values, errors]
  );

  return (
    <Background>
      <Box>
        <Flex align="center" justify="center">
          <Logo />
        </Flex>
        <Box w={600} mt={8} p={6} rounded="lg" boxShadow="lg" bg="white">
          <FormikProvider value={formik}>
            <form onSubmit={handleSubmit}>
             
                {EDIT_PASSWORD_FORM_SCHEMA.map(
                  ({
                    key,
                    label,
                    type,
                    placeholder,
                    validate,
                  }) => {
                    return (
                      
                        <Input
                          variant="outline"
                          key={key}
                          label={label}
                          type={type}
                          validate={validate}
                          placeholder={placeholder}
                          error={errors[key as keyof typeof errors]}
                          touched={touched[key as keyof typeof touched]}
                          value={values[key as keyof typeof values]}
                          onChange={handleChange}
                        />
                      
                    );
                  }
                )}
               
                  <Flex align="center" justify="center">
                    <Button w="50%" mr={3} onClick={onClose}>
                      Назад
                    </Button>
                    <Button
                      w="50%"
                      type="submit"
                      colorScheme="purple"
                      isDisabled={isSubmitBtnDisabled}
                    >
                      Сохранить
                    </Button>
                  </Flex>

            </form>
          </FormikProvider>
        </Box>
      </Box>
    </Background>
  );
};
