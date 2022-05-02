export type TTopicProps = {
  topic: TTopic;
};

export type TTopic = {
  topicId: number;
  title: string;
  date: number;
  lastMessage: TLastMessage;
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
