import { Button } from '@chakra-ui/button';
import { Box, Flex } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Input } from 'components/Input/Input';
import { FormikProvider, useFormik } from 'formik';
import React, { useCallback, useMemo } from 'react';
import { CREATE_TOPIC_FORM_SCHEMA } from '../constants';
import { TCreateTopicProps } from '../types';
import { EMPTY_STRING } from 'constants/generalConst';


const INITIAL_STATE = {
  title: EMPTY_STRING,
  message: EMPTY_STRING,

};

export const CreateTopic = ({ isOpen, onClose }: TCreateTopicProps) => {

  const onSubmit = useCallback(
        values => {
          console.log(values);
        },
        [],
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
            <ModalContent>
                <ModalHeader>Создание обсуждения</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormikProvider value={formik}>
                        <form onSubmit={handleSubmit} id="create-topick">
                            <Flex direction="column">
                                {
                                    CREATE_TOPIC_FORM_SCHEMA
                                        .map(
                                            ({
                                                as,
                                                key,
                                                label,
                                                placeholder,
                                                validate,
                                                type,
                                            }) => {
                                              return (
                                                    <Box key={key}>
                                                        {
                                                            Input({
                                                              as,
                                                              id: key,
                                                              label,
                                                              type,
                                                              validate,
                                                              placeholder,
                                                              error: errors[key as keyof typeof errors],
                                                              touched: touched[key as keyof typeof touched],
                                                              value: values[key as keyof typeof values],
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
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Закрыть
                    </Button>
                    <Button
                        variant='ghost'
                        colorScheme="purple"
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
