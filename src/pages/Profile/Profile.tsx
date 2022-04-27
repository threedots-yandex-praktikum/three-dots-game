import React, {FC, useCallback, useContext, useMemo, useState} from "react";
import "./style.scss";
import { Background } from "components/Background/Background";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import {FormikProvider, useFormik} from "formik";
import { Input } from "components/Input/Input";
import Upload, { UploadProps } from "rc-upload";
import { FiEdit } from "react-icons/fi";
import { PROFILE_FORM_SCHEMA } from "./constans";
import {TProfileProps} from "./types";
import {NOTIFICATION_LEVEL, sendNotification} from "../../modules/notification";
import {LOGIN_ROUTE} from "constants/routes";
import {useHistory} from "react-router-dom";
import {ProfileController} from "../../controllers/ProfileController";
import {TChangeProfileData} from "modules/api/profileAPI";
import {UserController} from "../../controllers/UserController";
import {TUserData, UserContext} from "components/Root/context";
import _mapValues from 'lodash/mapValues';
import _isNil from 'lodash/isNil';
import _isEqual from 'lodash/isEqual';


const renderButtons = (
  isEdit: boolean,
  startEditing: any,
  cancelEditing: any,
  isSubmitBtnDisabled: boolean,
  logout: React.MouseEventHandler,
) => {
  if (isEdit) {
    return (
      <Flex align="center" justify="center">
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
    );
  }
  return (
    <Flex align="center" justify="flex-end">
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
        mr={3}
        onClick={startEditing}
      >
        Редактировать
      </Button>
    </Flex>
  );
};

const renderUpload = (propsUpload: UploadProps, isEdit: boolean) => {
  if (isEdit) {
    return (
      <Upload
        {...propsUpload}
        className="profile__upload"
        accept="image/jpeg,image/png,image/gif"
      >
        <Icon as={FiEdit} w={8} h={8} color="grey" />
      </Upload>
    );
  }
  return null;
};

export const Profile: FC<TProfileProps> = () => {
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);

  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = useCallback(
    values => {
      return ProfileController
        .changeProfile(values as TChangeProfileData)
        .then(response => {
          setUserData(response);
          setIsEdit(false);
          sendNotification('Данные пользователя успешно изменены', NOTIFICATION_LEVEL.SUCCESS);
        });
    },
    [setUserData, setIsEdit],
  );

  const logout = useCallback(
    () => UserController
      .logOut()
      .then(() => {
        setUserData(null);
        sendNotification('Пользователь вышел из системы', NOTIFICATION_LEVEL.INFO);
        return history.push(LOGIN_ROUTE);
      }),
    [setUserData, history],
  );

  const goEditPassword = useCallback(
    () => history.push(EDIT_PASSWORD_ROUTE),
    [history]
  );

  const preparedUserDataValues = _mapValues(
    userData,
    (value: string) => _isNil(value) ? '' : value,
  );

  const formik = useFormik({
    initialValues: preparedUserDataValues as TUserData,
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
    [],
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

      return ProfileController
        .changeAvatar(formData)
        .then(avatarSrc => {
          setUserData({
            ...userData || {},
            avatar: avatarSrc,
          });
          setIsEdit(false);
          sendNotification('Аватар успешно обновлен', NOTIFICATION_LEVEL.SUCCESS);

          return avatarSrc;
        });
    },
    multiple: false,
  };

  const classAvatar = isEdit
    ? "profile__avatar profile__avatar--opacity"
    : "profile__avatar";

  const avatarLink = values.avatar ?
    `https://ya-praktikum.tech/api/v2/resources/${(values as TUserData).avatar}` :
    undefined;

  return (
    <Background>
      <Box className="profile">
        <Flex align="center" justify="center">
          <div className="dot-avatar"></div>
          <Box className="profile__avatar-wrap">
            <Avatar
              className={classAvatar}
              bg={avatarLink ? "transparent" : "red.500"}
              size="lg"
              src={avatarLink}
            />
            {renderUpload(propsUpload, isEdit)}
          </Box>
          <div className="dot-avatar"></div>
        </Flex>
        <Box w={1000} mt={8} p={6} rounded="lg" bg="white">
          <FormikProvider value={formik}>
            <form onSubmit={handleSubmit}>
              <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                {PROFILE_FORM_SCHEMA.map(
                  ({ key, label, placeholder, validate, gridProps = {} }) => {
                    return (
                      <GridItem key={key} {...gridProps}>
                        <Input
                          variant={isEdit ? "outline" : "unstyled"}
                          id={key}
                          label={label}
                          validate={validate}
                          placeholder={placeholder}
                          error={errors[key as keyof typeof errors]}
                          touched={touched[key as keyof typeof touched]}
                          value={values[key as keyof typeof values]}
                          onChange={handleChange}
                          isReadOnly={!isEdit}
                        />
                      </GridItem>
                    );
                  }
                )}
                <GridItem m={4} colStart={1}>
                  <Button onClick={goEditPassword} variant="link">
                    Изменить пароль
                  </Button>
                </GridItem>
                <GridItem colStart={2} className="profile__buttons-section">
                  {renderButtons(isEdit, startEditing, cancelEditing, isSubmitBtnDisabled, logout)}
                </GridItem>
              </Grid>
            </form>
          </FormikProvider>
        </Box>
      </Box>
    </Background>
  );
};
