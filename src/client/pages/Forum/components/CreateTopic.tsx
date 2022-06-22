import { Button } from '@chakra-ui/button';
import { Box, Flex } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Input } from 'client/components/Input/Input';
import { FormikProvider, useFormik } from 'formik';
import React, { useCallback, useMemo } from 'react';
import { CREATE_TOPIC_FORM_SCHEMA } from '../constants';
import { TCreateTopicProps } from '../types';
import { EMPTY_STRING } from 'client/constants/generalConst';
import { createNewTopicAC } from 'client/store/reducers/forumReducer/forumActionCreators';
import { useAppSelector } from 'client/hooks/useAppSelector';
import { useAppDispatch } from 'client/hooks/useAppDispatch';


const INITIAL_STATE = {
  title: EMPTY_STRING,
  message: EMPTY_STRING,

};

export const CreateTopic = ({ isOpen, onClose }: TCreateTopicProps) => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(state => state.profileReducer);
  const { mainColor, mainColorText, secondColorText, bgColorSecond } = useAppSelector(state => state.themeReducer);
  const onSubmit = useCallback(
    values => {
      dispatch(createNewTopicAC({ message: values.message, title: values.title, userId: id as number }));
      onClose();
    },
    [id, dispatch, onClose],
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

  const isSubmitBtnDisabled = useMemo(
    () => values === INITIAL_STATE ||
      Object.values(errors).some(item => !!item),
    [values, errors],
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bg={bgColorSecond}>
        <ModalHeader color={mainColorText}>Создание обсуждения</ModalHeader>
        <ModalCloseButton color={mainColorText} />
        <ModalBody>
          <FormikProvider value={formik}>
            <form onSubmit={handleSubmit} id="create-topick">
              <Flex direction="column">
                {
                  CREATE_TOPIC_FORM_SCHEMA
                    .map(
                      ({
                        as,
                        typeField,
                        label,
                        placeholder,
                        validate,
                        type,
                      }) => {
                        return (
                          <Box key={typeField}>
                            {
                              Input({
                                as,
                                id: typeField,
                                label,
                                type,
                                validate,
                                placeholder,
                                error: errors[typeField as keyof typeof errors],
                                touched: touched[typeField as keyof typeof touched],
                                value: values[typeField as keyof typeof values],
                                onChange: handleChange,
                              })
                            }
                          </Box>
                        );
                      },
                    )
                }
              </Flex>
            </form>
          </FormikProvider>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='blue'
            mr={3}
            onClick={onClose}
            color={secondColorText}

          >
            Закрыть
          </Button>
          <Button
            variant='ghost'
            color={secondColorText}
            bg={mainColor}
            isDisabled={isSubmitBtnDisabled}
            type="submit"
            form="create-topick"
          >
            Создать
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
