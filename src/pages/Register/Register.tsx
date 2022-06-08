import React, { useCallback, useMemo } from 'react';
import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { Logo } from 'components/Logo';
import { Background } from 'components/Background';
import { HOME_ROUTE, LOGIN_ROUTE } from 'constants/routes';
import { useHistory } from 'react-router';
import { FormikProvider, useFormik } from 'formik';
import { REGISTER_FORM_SCHEMA, REGISTER_INITIAL_STATE } from './constants';
import { UserController } from 'controllers/UserController';
import { Input } from 'components/Input';
import { useAppSelector } from 'hooks/useAppSelector';
import { SpinnerWrapper } from 'components/Spinner';


export const Register = () => {
  const history = useHistory();
  const { isFetch } = useAppSelector(state => state.fetchReducer);

  const onSubmit = useCallback(
    values => {
      const onSucseccefulRegistration = () => {
        history.push(HOME_ROUTE);
      };
      UserController
        .signUp(values, onSucseccefulRegistration);
    },
    [history],
  );

  const onSignUpYa = useCallback(
    () => {
      UserController
        .signUpYaOAuth();
    },
    [],
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
          pos="relative"
        >
          <FormikProvider value={formik}>
            <SpinnerWrapper loading={isFetch}>
              <form onSubmit={handleSubmit}>
                <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                  {REGISTER_FORM_SCHEMA.map(
                    ({
                      typeField,
                      label,
                      type,
                      placeholder,
                      validate,
                      gridProps = {},
                    }) => {
                      return (
                        <GridItem key={typeField} {...gridProps}>
                          <Input
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
                        isDisabled={isSubmitBtnDisabled || isFetch}
                      >
                        Зарегистрироваться
                      </Button>
                    </Flex>
        
                  </GridItem>  
                </Grid>

              </form>
              <Flex align="center" justify="center" mt={10}>
                <Button colorScheme='purple' variant='link' onClick={ onSignUpYa }>
                  Зарегистрироваться с помощью 
                  <Text
                    color="red"
                  >&nbsp;Y</Text>
                  andex
                </Button>                  
              </Flex>
            </SpinnerWrapper>
          </FormikProvider>
        </Box>
      </Box>
    </Background>
  );
};
