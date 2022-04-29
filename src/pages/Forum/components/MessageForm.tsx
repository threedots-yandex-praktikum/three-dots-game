import { Box, Button, Flex } from "@chakra-ui/react";
import { Input } from "components/Input/Input";
import { FormikProvider, useFormik } from "formik";
import { EMPTY_STRING } from "pages/Register/constants";
import React from "react";
import { FC, useCallback, useMemo } from "react";
import { SEND_MESSAGE_FORM_SCHEMA } from "../constants";
import { TMessageFormProps } from "../types";


const INITIAL_STATE = {
  message: EMPTY_STRING,

};



export const MessageForm: FC<TMessageFormProps> = () => {

  const onSubmit = useCallback(
    values => {
      console.log(values)
    },
    [],
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
      Object.values(errors).some(item => !!item),
    [values, errors],
  );

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} id="create-topick">
        <Flex direction="column">
          {
            SEND_MESSAGE_FORM_SCHEMA
              .map(
                ({
                  className,
                  as,
                  key,
                  label,
                  placeholder,
                  validate,
                }) => {
                  return (
                    <Box key={key}>
                      {
                        Input({
                          className,
                          as,
                          key,
                          label,
                          validate,
                          placeholder,
                          error: errors[key as keyof typeof errors],
                          touched: touched[key as keyof typeof touched],
                          value: values[key as keyof typeof values],
                          onChange: handleChange,
                        })
                      }
                    </Box>
                  );
                },
              )
          }
        </Flex>
        <Button
          disabled={isSubmitBtnDisabled}
          type="submit"
          colorScheme="purple"
        >
          Отправить
        </Button>
      </form>
    </FormikProvider>
  );
}
