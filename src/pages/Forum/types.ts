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
  topicName?: string;
  onOpen: () => void;
};

export type TListOfThemsProps = {
  setCurrentId: (id: number | null) => unknown;
  currentTopicId: number | null;
};

export type TCreateTopicProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type TCurrentTopicProps = {
  setCurrentId: (id: number | null) => unknown;
};

export type TParams = {
  topicId: string;
};
