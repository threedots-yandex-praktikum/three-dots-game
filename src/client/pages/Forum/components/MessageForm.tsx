import { Box, Button, Flex } from '@chakra-ui/react';
import { Input } from 'client/components/Input/Input';
import { FormikProvider, useFormik } from 'formik';
import React, { useCallback, useMemo } from 'react';
import { SEND_MESSAGE_FORM_SCHEMA } from '../constants';
import { EMPTY_STRING } from 'client/constants/generalConst';
import { useDispatch } from 'react-redux';
import { sendMessageAC } from 'client/store/reducers/forumReducer/forumActionCreators';
import { useAppSelector } from 'client/hooks/useAppSelector';
import { TMessageFormProps } from '../types';
import _isFunction from 'lodash/isFunction';


const INITIAL_STATE = {
  message: EMPTY_STRING,
};

export const MessageForm = ({ topicId, commentId = null, closeReplyForm, canBeClosed }: TMessageFormProps) => {

  const dispatch = useDispatch();
  const { id } = useAppSelector(state => state.profileReducer);
  const { secondColorText, mainColor } = useAppSelector(state => state.themeReducer);

  const onSubmit = useCallback(
    (values, { resetForm }) => {
      dispatch(sendMessageAC({ ...values, userId: id as number, topicId, parentId: commentId }));

      _isFunction(closeReplyForm) && closeReplyForm();
      resetForm({ values: '' });
    },
    [dispatch, id, topicId, commentId, closeReplyForm],
  );

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    onSubmit,

  });

  const {
    errors,
    touched,
    handleSubmit,
    handleChange,
    values,
  } = formik;

  const { typeField, as, label, className, placeholder, validate } = SEND_MESSAGE_FORM_SCHEMA;

  const isSubmitBtnDisabled = useMemo(
    () => values === INITIAL_STATE ||
      Object.values(errors).some(item => !!item),
    [values, errors],
  );

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} id="create-topick">
        <Flex direction="column">
          <Box >
            {
              Input({
                className,
                as,
                id: typeField,
                label,
                validate,
                placeholder,
                error: errors[typeField as keyof typeof errors],
                touched: touched[typeField as keyof typeof touched],
                value: values[typeField as keyof typeof values],
                onChange: handleChange,
              })
            }
          </Box>
        </Flex>
        <Button
          disabled={isSubmitBtnDisabled}
          type="submit"
          bg={mainColor}
          color={secondColorText}
        >
          Отправить
        </Button>
        {
          canBeClosed ?
            <Button
              bg={mainColor}
              color={secondColorText}
              onClick={closeReplyForm}
            >
              Отмена
            </Button> :
            null
        }
      </form>
    </FormikProvider>
  );
};
