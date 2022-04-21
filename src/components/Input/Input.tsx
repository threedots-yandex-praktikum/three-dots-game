import React from 'react';
import {Field} from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  TInputProps,
} from "./types";

export const renderInput = ({
  key,
  label,
  error,
  validate,
  touched,
  placeholder,
  value,
  onChange,
  type = 'text',
  variant='filled',
  isReadOnly=false
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
        variant={variant}
        isReadOnly={isReadOnly}
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
