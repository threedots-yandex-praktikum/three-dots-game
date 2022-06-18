import React, { useCallback, useMemo } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Logo } from 'client/components/Logo/Logo';
import { Background } from 'client/components/Background/Background';
import { PROFILE_ROUTE } from 'client/constants/routes';
import { useHistory } from 'react-router';
import { FormikProvider, useFormik } from 'formik';
import { EDIT_PASSWORD_FORM_SCHEMA, EDIT_PASSWORD_INITIAL_STATE } from './constants';
import { Input } from 'client/components/Input/Input';
import { ProfileController } from 'client/controllers/ProfileController';
import { TChangePasswordData } from 'client/modules/api/profileAPI';
import { useAppSelector } from '../../hooks/useAppSelector';


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
  const { mainColorText, bgColorSecond, secondColorText, mainColor } = useAppSelector(state => state.themeReducer)
  return (
    <Background>
      <Box>
        <Flex align="center" justify="center">
          <Logo />
        </Flex>
        <Box w={600} mt={8} p={6} rounded="lg" bg={secondColorText}>
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
                <Button
                  w="50%"
                  mr={3}
                  onClick={onClose}
                  color={mainColorText}
                  bg={bgColorSecond}
                >
                  Назад
                </Button>
                <Button
                  w="50%"
                  type="submit"
                  color={secondColorText}
                  bg={mainColor}
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
