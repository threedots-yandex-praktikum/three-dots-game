import React, { useCallback, useMemo } from 'react';
import { Logo } from 'components/Logo';
import { FormikProvider, useFormik } from 'formik';
import { Input } from 'components/Input';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Background } from 'components/Background';
import { LOGIN_FORM_SCHEMA, INITIAL_STATE } from './constants';
import { UserController } from 'controllers/UserController';
import { TSignInData } from 'modules/api/authAPI';
import { useHistory } from 'react-router';
import { HOME_ROUTE } from 'constants/routes';
import { useAppSelector } from 'hooks/useAppSelector';
import { SpinnerWrapper } from '../../components/Spinner';




export const Login = () => {
  const history = useHistory();
  const { isFetch } = useAppSelector(state => state.fetchReducer);

  const onSubmit = useCallback(

    (values: TSignInData) => {
      const onSucseccefulLogin = () => {
        history.push(HOME_ROUTE)
      }
      UserController
        .signIn(values, onSucseccefulLogin)
    },
    [history],
  );

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    onSubmit,
  });

  const { errors, touched, handleSubmit, handleChange, values } = formik;

  const isSubmitBtnDisabled = useMemo(
    () =>
      values === INITIAL_STATE || Object.values(errors).some((item) => !!item),
    [values, errors],
  );

  return (
    <div>
      <Background>
        <Box>
          <Flex align="center" justify="center">
            <Logo />
          </Flex>
          <Box w={600} mt={8} p={6} rounded="lg" boxShadow="lg" bg="white" pos='relative'>
            <FormikProvider value={formik}>
              <SpinnerWrapper loading={isFetch}>
                <form onSubmit={handleSubmit}>
                  {LOGIN_FORM_SCHEMA.map(
                    ({ key, label, type, placeholder, validate }) => (
                      <Input
                        id={key}
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
                    ),
                  )}

                  <Flex align="center" justify="center">
                    <Button
                      w="50%"
                      type="submit"
                      colorScheme="purple"
                      isDisabled={isSubmitBtnDisabled || isFetch}
                    >
                      Войти
                    </Button>
                  </Flex>
                </form>
              </SpinnerWrapper>
            </FormikProvider>
          </Box>
        </Box>
      </Background>
    </div>
  );
};
