import React, { useCallback, useMemo, useState, MouseEvent } from 'react';
import './style.scss';
import { Background } from 'client/components/Background';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Grid,
  GridItem,
  Icon,
} from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import { Input } from 'client/components/Input';
import Upload, { UploadProps } from 'rc-upload';
import { FiEdit } from 'react-icons/fi';
import { PROFILE_FORM_SCHEMA } from './constans';
import { EDIT_PASSWORD_ROUTE } from 'client/constants/routes';
import { useHistory } from 'react-router-dom';
import { ProfileController } from 'client/controllers/ProfileController';
import { TChangeProfileData } from 'client/modules/api/profileAPI';
import { UserController } from 'client/controllers/UserController';
import { TUserData } from 'client/components/Root/context';
import _mapValues from 'lodash/mapValues';
import _isNil from 'lodash/isNil';
import _isEqual from 'lodash/isEqual';
import { useAppSelector } from 'client/hooks/useAppSelector';
import { generateAvatarLink } from 'client/utils/generateAvatarLink';
import { SpinnerWrapper } from '../../components/Spinner';


export const Profile = () => {
  const history = useHistory();

  const { isFetch } = useAppSelector(state => state.fetchReducer);
  const { profileReducer: userData } = useAppSelector(state => state);
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = useCallback(
    values => {
      const onSuccesfulProfileDataChange = () => {
        setIsEdit(false);
      };

      return ProfileController
        .changeProfile(values as TChangeProfileData, onSuccesfulProfileDataChange);
    },
    [setIsEdit],
  );

  const logout = useCallback(
    () => {
      const onSuccesfulLogout = () => {
        setIsEdit(false);
      };
      return UserController.logOut(onSuccesfulLogout);
    },
    [],
  );

  const goEditPassword = useCallback(
    () => history.push(EDIT_PASSWORD_ROUTE),
    [history],
  );

  const preparedUserDataValues = _mapValues(
    userData,
    (value: string) => _isNil(value) ? '' : value,
  );

  const formik = useFormik({
    initialValues: preparedUserDataValues as unknown as Omit<TUserData, 'id'>,
    onSubmit,
  });

  const { errors, touched, handleSubmit, handleChange, handleReset, values } = formik;

  const startEditing = (e: MouseEvent) => {
    e.preventDefault();
    return setIsEdit(!isEdit);
  };

  const cancelEditing = useCallback(
    (e: MouseEvent) => {
      handleReset(e);
      setIsEdit(false);
    },
    [handleReset],
  );

  const isSubmitBtnDisabled = useMemo(
    () =>
      _isEqual(values, userData) || Object.values(errors).some((item) => !!item),
    [userData, values, errors],
  );

  const propsUpload: UploadProps = {
    action: (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file as Blob);
      const onSuccesfulChangeAvatar = () => {
        setIsEdit(false);
      };
      return ProfileController
        .changeAvatar(formData, onSuccesfulChangeAvatar);

    },
    multiple: false,
  };

  const classAvatar = isEdit
    ? 'profile__avatar profile__avatar--opacity'
    : 'profile__avatar';

  const avatarLink = generateAvatarLink(userData.avatar);

  return (
    <Background>
      <Box className="profile">
        <Flex align="center" justify="center">
          <div className="dot-avatar"></div>
          <Box className="profile__avatar-wrap">
            <Avatar
              className={classAvatar}
              bg={avatarLink ? 'transparent' : 'red.500'}
              size="lg"
              src={avatarLink}
            />
            {
              isEdit ?
                <Upload
                  {...propsUpload}
                  className="profile__upload"
                  accept="image/jpeg,image/png,image/gif"
                >
                  <Icon as={FiEdit} w={8} h={8} color="grey" />
                </Upload> :
                null
            }
          </Box>
          <div className="dot-avatar"></div>
        </Flex>
        <Box w={1000} mt={8} p={6} rounded="lg" bg="white" pos='relative'>
          <FormikProvider value={formik}>
            <SpinnerWrapper loading={isFetch}>
              <form onSubmit={handleSubmit}>
                <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                  {PROFILE_FORM_SCHEMA.map(
                    ({ typeField, label, placeholder, validate }) => (
                      <GridItem key={typeField}>
                        <Input
                          variant={isEdit ? 'outline' : 'unstyled'}
                          id={typeField}
                          label={label}
                          validate={validate}
                          placeholder={placeholder}
                          error={errors[typeField as keyof typeof errors]}
                          touched={touched[typeField as keyof typeof touched]}
                          value={values[typeField as keyof typeof values]}
                          onChange={handleChange}
                          isReadOnly={!isEdit}
                        />
                      </GridItem>
                    ),
                  )}
                  <GridItem colStart={1} className="profile__change-password-btn-section">
                    {
                      isEdit ?
                        <Button
                          w="50%"
                          onClick={goEditPassword}
                        >
                          Изменить пароль
                        </Button> :
                        null
                    }
                  </GridItem>
                  <GridItem colStart={2} className="profile__buttons-section">
                    {
                      isEdit ?
                        (
                          <Flex justify="flex-end">
                            <Button
                              w="50%"
                              mr={3}
                              onClick={cancelEditing}
                            >
                              Отмена
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
                        ) :
                        (
                          <Flex justify="flex-end">
                            <Button
                              w="50%"
                              mr={3}
                              onClick={logout}
                            >
                              Выйти
                            </Button>
                            <Button
                              variant="outline"
                              w="50%"
                              onClick={startEditing}
                            >
                              Редактировать
                            </Button>
                          </Flex>
                        )
                    }
                  </GridItem>
                </Grid>
              </form>
            </SpinnerWrapper>
          </FormikProvider>
        </Box>
      </Box>
    </Background>
  );
};
