import { TTopic } from '../../store/reducers/forumReducer/types';

export type TTopicProps = {
  topic: TTopic;
};

export type TLastMessage = {
  userName: string;
  message: string;
} | null;

export type TInteractivePanelProps = {
  topicName?: string | null;
  onOpen?: () => void;
};

export type TCreateTopicProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type TParams = {
  topicId: string;
};
export type TMessageFormProps = {
  topicId: number;
  commentId?: number | null;
  parentId?: number | null;
  closeReplyForm?: () => void,
  canBeClosed?: boolean,
  value?: string,
};
