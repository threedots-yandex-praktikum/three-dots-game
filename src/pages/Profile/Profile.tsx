import React, { FC, useCallback, useMemo, useState } from "react";
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
import { FormikProvider, useFormik } from "formik";
import { Input } from "components/Input/Input";
import Upload, { UploadProps } from "rc-upload";
import { FiEdit } from "react-icons/fi";
import { PROFILE_FORM_SCHEMA, INITIAL_STATE } from "./constans";
import { TProfileProps } from "./types";
import { EDIT_PASSWORD_ROUTE } from "constants/routes";
import { useHistory } from "react-router";

const renderButtons = (
  isEdit: boolean,
  toggleEdit: React.MouseEventHandler,
  isSubmitBtnDisabled: boolean
) => {
  if (isEdit) {
    return (
      <Flex align="center" justify="center">
        <Button w="50%" mr={3} onClick={toggleEdit}>
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
      <Button variant="outline" w="50%" mr={3} onClick={toggleEdit}>
        Редактировать
      </Button>
    </Flex>
  );
};

const renderUpload = (propsUpload: UploadProps, isEdit: boolean) => {
  if (isEdit) {
    // принимает src. по этому загрузка файла будет в отдельной ветке
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
  return "";
};

export const Profile: FC<TProfileProps> = () => {
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = useCallback((values) => {
    console.log(values);
  }, []);

  const toggleEdit = () => setIsEdit(!isEdit);

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    onSubmit,
  });

  const { errors, touched, handleSubmit, handleChange, values } = formik;

  const isSubmitBtnDisabled = useMemo(
    () =>
      values === INITIAL_STATE || Object.values(errors).some((item) => !!item),
    [values, errors]
  );
  const propsUpload: UploadProps = {
    action: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("/upload.do");
        }, 2000);
      });
    },
    multiple: true,
    onStart(file: File) {
      console.log("onStart", file, file.name);
    },
    onSuccess() {
      console.log("onSuccess");
    },
    onError() {
      console.log("onError");
    },
  };

  const classAvatar = isEdit
    ? "profile__avatar profile__avatar--opacity"
    : "profile__avatar";

  const history = useHistory();
  const goEditPassword = useCallback(
    () => history.push(EDIT_PASSWORD_ROUTE),
    [history]
  );

  return (
    <Background>
      <Box className="profile">
        <Flex align="center" justify="center">
          <div className="dot-avatar"></div>
          <Box className="profile__avatar-wrap">
            <Avatar className={classAvatar} bg="red.500" size="lg" />
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
                          key={key}
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
                <GridItem colStart={2}>
                  {renderButtons(isEdit, toggleEdit, isSubmitBtnDisabled)}
                </GridItem>
              </Grid>
            </form>
          </FormikProvider>
        </Box>
      </Box>
    </Background>
  );
};

Profile.propTypes = {};
