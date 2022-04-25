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
import { VALIDATION } from "constants/validation";
import { FormikProvider, useFormik } from "formik";
import { renderInput } from "components/Input/Input";
import Upload, { UploadProps } from "rc-upload";
import { EditIcon } from "@chakra-ui/icons";

type ProfileProps = Record<string, unknown>;
const EMPTY_STRING = "";

const PROFILE_FORM_SCHEMA = [
  {
    key: "login",
    label: "Логин",
    placeholder: EMPTY_STRING,
    gridProps: {
      colSpan: 2,
    },
    validate: (value: string) => {
      if (value.match(VALIDATION.LOGIN.pattern) == null) {
        return VALIDATION.LOGIN.message;
      }
    },
  },
  {
    key: "email",
    label: "Почта",
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if (value.match(VALIDATION.EMAIL.pattern) == null) {
        return VALIDATION.EMAIL.message;
      }
    },
  },
  {
    key: "first_name",
    label: "Имя",
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if (value.match(VALIDATION.FIRST_NAME.pattern) == null) {
        return VALIDATION.FIRST_NAME.message;
      }
    },
  },
  {
    key: "second_name",
    label: "Фамилия",
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if (value.match(VALIDATION.SECOND_NAME.pattern) == null) {
        return VALIDATION.SECOND_NAME.message;
      }
    },
  },
  {
    key: "phone",
    label: "Телефон",
    placeholder: EMPTY_STRING,
    validate: (value: string) => {
      if (value.match(VALIDATION.PHONE.pattern) == null) {
        return VALIDATION.PHONE.message;
      }
    },
  },
];

const INITIAL_STATE = {
  login: "login",
  email: "name@yandex.ru",
  first_name: "Иван",
  second_name: "Иванов",
  phone: "89009999999",
};

export const Profile: FC<ProfileProps> = () => {
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = useCallback((values) => {
    console.log(values);
  }, []);


  const toggleEdit = useCallback(() => setIsEdit(!isEdit), [isEdit]);

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


  const renderButtons = useCallback(() => {
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
  }, [isEdit, isSubmitBtnDisabled, toggleEdit]);

  const renderUpload = useCallback(() => {

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
    if (isEdit) {
      // принимает src. по этому загрузка файла будет в отдельной ветке
      return (
        <Upload {...propsUpload} className="profile__upload" accept="image/jpeg,image/png,image/gif">
          <Icon as={EditIcon} w={8} h={8} color="grey" />
        </Upload>
      );
    }
    return ''

  }, [isEdit]);

  let classAvatar = 'profile__avatar' 
  if (isEdit) {
    classAvatar+=' profile__avatar--opacity' 
  }

  return (
    <Background>
      <Box className="profile">
        <Flex align="center" justify="center">
          <div className="dot-avatar"></div>
          <Box className="profile__avatar-wrap">
            <Avatar className={classAvatar} bg="red.500" size="lg" />
            {renderUpload()}
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
                        {renderInput({
                          variant: isEdit ? "outline" : "unstyled",
                          key,
                          label,
                          validate,
                          placeholder,
                          error: errors[key as keyof typeof errors],
                          touched: touched[key as keyof typeof touched],
                          value: values[key as keyof typeof values],
                          onChange: handleChange,
                          isReadOnly: !isEdit,
                        })}
                      </GridItem>
                    );
                  }
                )}
                <GridItem colStart={2}>{renderButtons()}</GridItem>
              </Grid>
            </form>
          </FormikProvider>
        </Box>
      </Box>
    </Background>
  );
};

Profile.propTypes = {};
