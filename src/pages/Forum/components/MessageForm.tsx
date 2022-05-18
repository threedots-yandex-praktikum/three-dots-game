import { Box, Button, Flex } from '@chakra-ui/react';
import { Input } from 'components/Input/Input';
import { FormikProvider, useFormik } from 'formik';
import React, { useCallback, useMemo } from 'react';
import { SEND_MESSAGE_FORM_SCHEMA } from '../constants';
import { EMPTY_STRING } from 'constants/generalConst';


const INITIAL_STATE = {
  message: EMPTY_STRING,
};

export const MessageForm = () => {

  const onSubmit = useCallback(
    values => {
      console.log(values);
    },
    [],
  );

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    onSubmit,
  });

  const {
    errors,
    touched,
    handleSubmit,
    handleChange,
    values,
  } = formik;

  const { typeField, as, label, className, placeholder, validate } = SEND_MESSAGE_FORM_SCHEMA;

  const isSubmitBtnDisabled = useMemo(
    () => values === INITIAL_STATE ||
      Object.values(errors).some(item => !!item),
    [values, errors],
  );

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} id="create-topick">
        <Flex direction="column">
          <Box >
            {
              Input({
                className,
                as,
                id: typeField,
                label,
                validate,
                placeholder,
                error: errors[typeField as keyof typeof errors],
                touched: touched[typeField as keyof typeof touched],
                value: values[typeField as keyof typeof values],
                onChange: handleChange,
              })
            }
          </Box>
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
};
