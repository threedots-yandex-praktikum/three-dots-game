export type TTopicProps = {
  them: TTopic;
};

export type TTopic = {
  themId: number;
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
  thems: TTopic[];
  setTitle: (title: string) => unknown;
  setIsSelected: (flag: boolean) => void;
};

export type TCreateTopicProps = {
  isOpen: boolean;
  onClose: () => void;
};
export type TCurrentTopicProps = {
  topicId: number;
};
