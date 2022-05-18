import React, { useCallback, useContext, useMemo } from 'react';
import { Logo } from 'components/Logo';
import { FormikProvider, useFormik } from 'formik';
import { Input } from 'components/Input';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Background } from 'components/Background';
import { LOGIN_FORM_SCHEMA, INITIAL_STATE } from './constants';
import { UserController } from 'controllers/UserController';
import { TSignInData } from 'modules/api/authAPI';
import { useHistory } from 'react-router';
import { HOME_ROUTE, REGISTER_ROUTE, GAME_START_ROUTE } from 'constants/routes';
import { NOTIFICATION_LEVEL, sendNotification } from 'modules/notification';
import { TUserData, UserContext } from 'components/Root/context';


export const Login = () => {
  const history = useHistory();
  const { setUserData } = useContext(UserContext);

  const onSubmit = useCallback(
    (values: TSignInData) => UserController
      .signIn(values)
      .then(response => {
        setUserData(response as TUserData);
        sendNotification('Приветствуем Тебя в ThreeDots!', NOTIFICATION_LEVEL.SUCCESS);
        return history.push(HOME_ROUTE);
      }).catch(()=> {
        sendNotification('Ошибка сети, повторите позже', NOTIFICATION_LEVEL.ERROR);
      }),
    [setUserData, history],
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
          <Box w={600} mt={8} p={6} rounded="lg" boxShadow="lg" bg="white">
            <FormikProvider value={formik}>
              <form onSubmit={handleSubmit}>
                {LOGIN_FORM_SCHEMA.map(
                  ({ typeField, label, type, placeholder, validate }) => (
                    <Input
                      id={typeField}
                      key={typeField}
                      label={label}
                      type={type}
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
            </FormikProvider>
          </Box>
          <Flex mt={10} align="center" justify="center">
          <Button colorScheme='purple' variant='link' ml={10} onClick={goPlayGame}>
            Играть без регистрация
          </Button>            
          </Flex>
        </Box>
      </Background>
    </div>
  );
};
