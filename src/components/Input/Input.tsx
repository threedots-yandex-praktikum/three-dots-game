import React from 'react';
import {Field} from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input as ChakraInput,
} from "@chakra-ui/react";
import {
  TInputProps,
} from "./types";

export const Input = ({
  key,
  label,
  error,
  validate,
  touched,
  placeholder,
  value,
  onChange,
  as,
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
        as={as || ChakraInput}
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
