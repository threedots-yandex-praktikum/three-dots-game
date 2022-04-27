import React, { useCallback, useContext, useMemo } from 'react';
import { Box, Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { Logo } from 'components/Logo/Logo';
import { Background } from 'components/Background/Background';
import { HOME_ROUTE, LOGIN_ROUTE } from 'constants/routes';
import { useHistory } from 'react-router';
import { FormikProvider, useFormik } from 'formik';
import {REGISTER_FORM_SCHEMA, REGISTER_INITIAL_STATE} from './constants';
import { UserController } from 'controllers/UserController';
import { NOTIFICATION_LEVEL, sendNotification } from 'modules/notification';
import { Input } from 'components/Input/Input';
import { UserContext } from 'components/Root/context';


export const Register = () => {
  const history = useHistory();
  const { setUserData } = useContext(UserContext);

  const onSubmit = useCallback(
    values => UserController
      .signUp(values)
      .then(response => {
        setUserData(response);

        sendNotification('Пользователь успешно зарегистрирован', NOTIFICATION_LEVEL.SUCCESS);
        return history.push(HOME_ROUTE);
      }),
    [setUserData, history],
  );

  const onClose = useCallback(() => history.push(LOGIN_ROUTE), [history]);

  const formik = useFormik({
    initialValues: REGISTER_INITIAL_STATE,
    onSubmit,
  });

  const { errors, touched, handleSubmit, handleChange, values } = formik;

  const isSubmitBtnDisabled = useMemo(
    () =>
      values === REGISTER_INITIAL_STATE ||
      Object.values(errors).some((item) => !!item) ||
      values.password.trim() !== values.password_repeat.trim(),
    [values, errors],
  );

  return (
    <Background>
      <Box>
        <Flex align="center" justify="center">
          <Logo />
        </Flex>
        <Box
          w={1000}
          mt={8}
          p={6}
          rounded="lg"
          boxShadow="lg"
          bg="white"
        >
          <FormikProvider value={formik}>
            <form onSubmit={handleSubmit}>
              <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                {REGISTER_FORM_SCHEMA.map(
                  ({
                    key,
                    label,
                    type,
                    placeholder,
                    validate,
                    gridProps = {},
                  }) => {
                    return (
                      <GridItem key={key} {...gridProps}>
                        <Input
                          id={key}
                          label={label}
                          type={type}
                          validate={validate}
                          placeholder={placeholder}
                          error={errors[key as keyof typeof errors]}
                          touched={touched[key as keyof typeof touched]}
                          value={values[key as keyof typeof values]}
                          onChange={handleChange}
                        />
                      </GridItem>
                    );
                  },
                )}
                <GridItem colStart={2}>
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
                      Зарегистрироваться
                    </Button>
                  </Flex>
                </GridItem>
              </Grid>
            </form>
          </FormikProvider>
        </Box>
      </Box>
    </Background>
  );
};
