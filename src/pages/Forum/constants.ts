import { Textarea } from '@chakra-ui/textarea';
import { VALIDATION } from 'constants/validation';
import { EMPTY_STRING } from 'constants/generalConst';

export const CREATE_TOPIC_FORM_SCHEMA = [
  {
    typeField: 'title',
    label: 'Название темы',
    placeholder: EMPTY_STRING,
    type: 'text',
    validate: (value: string) => {
      if (value.match(VALIDATION.REQUIRED.pattern) == null) {
        return VALIDATION.REQUIRED.message;
      }
    },
  },
  {
    typeField: 'message',
    label: 'Сообщение',
    placeholder: EMPTY_STRING,
    as: Textarea,
    validate: (value: string) => {
      if (value.match(VALIDATION.REQUIRED.pattern) == null) {
        return VALIDATION.REQUIRED.message;
      }
    },
  },
];

export const SEND_MESSAGE_FORM_SCHEMA = {
  typeField: 'message',
  label: EMPTY_STRING,
  placeholder: EMPTY_STRING,
  as: Textarea,
  className: 'resize_none',
  validate: (value: string) => {
    if (value.match(VALIDATION.REQUIRED.pattern) == null) {
      return VALIDATION.REQUIRED.message;
    }
  },
};
