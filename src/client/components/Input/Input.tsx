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
import { useAppSelector } from '../../hooks/useAppSelector';


export const Input = ({
  id,
  label,
  error,
  validate,
  touched,
  placeholder,
  value,
  onChange,
  as,
  type = 'text',
  className,
  variant = 'filled',
  isReadOnly = false,
}: TInputProps) => {
  const { mainColorText } = useAppSelector(state => state.themeReducer);

  return (
    <FormControl
      className={isReadOnly ? 'form-control--is-read-only' : undefined}
      isInvalid={touched && !!error}
      key={id}
      pb={touched && error ? 0 : 6}
    >
      <FormLabel color={mainColorText} htmlFor={id}>{label}</FormLabel>
      <Field
        as={as || ChakraInput}
        key={id}
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        validate={validate}
        variant={variant}
        isReadOnly={isReadOnly}
        className={className}
        color={mainColorText}
        bgColor='inherit'
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
