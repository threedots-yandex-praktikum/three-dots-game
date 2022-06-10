import React, { useCallback, useMemo } from 'react';
import { Logo } from 'client/components/Logo';
import { FormikProvider, useFormik } from 'formik';
import { Input } from 'client/components/Input';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Background } from 'client/components/Background';
import { LOGIN_FORM_SCHEMA, INITIAL_STATE } from './constants';
import { UserController } from 'client/controllers/UserController';
import { TSignInData } from 'client/modules/api/authAPI';
import { useHistory } from 'react-router';
import { HOME_ROUTE, REGISTER_ROUTE, GAME_START_ROUTE } from 'client/constants/routes';
import { useAppSelector } from 'client/hooks/useAppSelector';
import { SpinnerWrapper } from 'client/components/Spinner';

export const Login = () => {
  const history = useHistory();
  const { isFetch } = useAppSelector(state => state.fetchReducer);

  const onSubmit = useCallback(
    (values: TSignInData) => {
      const onSucseccefulLogin = () => {
        history.push(HOME_ROUTE);
      };
      UserController
        .signIn(values, onSucseccefulLogin);
    },
    [history],
  );



  const goSignup = useCallback(()=> {
    history.push(REGISTER_ROUTE);
  }, [history]);

  const goPlayGame = useCallback(()=> {
    history.push(GAME_START_ROUTE);
  }, [history]);

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    onSubmit,
  });

  const onSignUpYa = useCallback(
    () => {
      UserController
        .signUpYaOAuth();
    },
    [],
  );
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
                    ({ typeField, label, type, placeholder, validate }) => (
                      <Input
                        id={typeField}
                        key={typeField}
                        label={label}
                        type={typeField}
                        validate={validate}
                        placeholder={placeholder}
                        error={errors[typeField as keyof typeof errors]}
                        touched={touched[typeField as keyof typeof touched]}
                        value={values[typeField as keyof typeof values]}
                        onChange={handleChange}
                      />
                    ),
                  )}

                <Flex align="center" justify="space-between">
                <Button colorScheme='purple' variant='link' ml={10} onClick={goSignup}>
                  Зарегистрироваться
                </Button>
                  <Button
                    w="50%"
                    type="submit"
                    colorScheme="purple"
                    isDisabled={isSubmitBtnDisabled}
                  >
                    Войти
                  </Button>
                </Flex>
              </form>
            </SpinnerWrapper>
            </FormikProvider>
          </Box>
          <Flex mt={10} align="center" justify="center">
          <Button colorScheme='purple' variant='link' onClick={goPlayGame}>
            Играть без регистрация
          </Button>
          </Flex>
          <Flex align="center" justify="center" mt={10}>
            <Button colorScheme='purple' variant='link' onClick={ onSignUpYa }>
              Войти через
              <Text
                color="red"
              >&nbsp;Y</Text>
              andex
            </Button>
          </Flex>
        </Box>
      </Background>
    </div>
  );
};
