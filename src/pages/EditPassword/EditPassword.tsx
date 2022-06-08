import React, { useCallback, useMemo } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Logo } from 'components/Logo/Logo';
import { Background } from 'components/Background/Background';
import { PROFILE_ROUTE } from 'constants/routes';
import { useHistory } from 'react-router';
import { FormikProvider, useFormik } from 'formik';
import { EDIT_PASSWORD_FORM_SCHEMA, EDIT_PASSWORD_INITIAL_STATE } from './constants';
import { Input } from 'components/Input/Input';
import { ProfileController } from 'controllers/ProfileController';
import { TChangePasswordData } from 'modules/api/profileAPI';


export const EditPassword = () => {
  const history = useHistory();

  const onSubmit = useCallback(
    (values) => {
      const dataToSend = {
        newPassword: values.new_password,
        oldPassword: values.old_password,
      };
      return ProfileController.changePassword(dataToSend as TChangePasswordData);
    },
    [],
  );

  const onClose = useCallback(() => history.push(PROFILE_ROUTE), [history]);

  const formik = useFormik({
    initialValues: EDIT_PASSWORD_INITIAL_STATE,
    onSubmit,
  });

  const { errors, touched, handleSubmit, handleChange, values } = formik;

  const isSubmitBtnDisabled = useMemo(
    () =>
      values === EDIT_PASSWORD_INITIAL_STATE ||
      Object.values(errors).some((item) => !!item) ||
      values.new_password.trim() !== values.password_repeat.trim(),
    [values, errors],
  );

  return (
    <Background>
      <Box>
        <Flex align="center" justify="center">
          <Logo />
        </Flex>
        <Box w={600} mt={8} p={6} rounded="lg" bg="white">
          <FormikProvider value={formik}>
            <form onSubmit={handleSubmit}>

              {EDIT_PASSWORD_FORM_SCHEMA.map(
                ({
                  typeField,
                  label,
                  type,
                  placeholder,
                  validate,
                }) => {
                  return (
                    <Input
                      variant="outline"
                      key={typeField}
                      id={typeField}
                      label={label}
                      type={type}
                      validate={validate}
                      placeholder={placeholder}
                      error={errors[typeField as keyof typeof errors]}
                      touched={touched[typeField as keyof typeof touched]}
                      value={values[typeField as keyof typeof values]}
                      onChange={handleChange}
                    />
                  );
                },
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
