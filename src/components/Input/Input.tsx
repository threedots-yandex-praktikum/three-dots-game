import React from 'react';
import { Field } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input as ChakraInput,
} from '@chakra-ui/react';
import {
  TInputProps,
} from './types';

export const Input = ({
  id,
  label,
  error,
  validate,
  touched,
  placeholder,
  value,
  onChange,
  type = 'text',
  variant='filled',
  isReadOnly=false,
}: TInputProps) => {

  return (
    <FormControl
      isInvalid={touched && !!error}
      key={id}
      pb={touched && error ? 0 : 6}
    >
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Field
        as={ChakraInput}
        key={id}
        name={id}
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
};
