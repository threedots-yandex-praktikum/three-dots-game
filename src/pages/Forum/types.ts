export type TForumProps = Record<string, unknown>;
export type TThemProps = {
  them: TThem;
};

export type TThem = {
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
  themName?: string;
  onOpen: () => void;
};

export type TListOfThemsProps = {
  thems: TThem[];
  setTitle: (title: string) => unknown;
  setIsSelected: (flag: boolean) => void;
};

export type TCreateThemeProps = {
  isOpen: boolean;
  onClose: () => void;
};
export type TCurrentTopicProps = {
  topicId: number;
};

export type TMessageFormProps = {};
