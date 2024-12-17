export type NoticeMessage = {
  id: number;
  title: string;
  contents: string;
  sendAt: string;
  isRead: boolean;
};

export type MessageType = 'notice' | 'survey' | 'alerm';

export const MessageTypeKor: Record<MessageType, string> = {
  notice: '공지',
  survey: '참여조사',
  alerm: '알림',
};

export type Message = NoticeMessage & {
  isSurvey: boolean;
  imageUrl?: string;
  // type: MessageType;
  isResponded?: boolean;
};

export type MessageInnerParam = {
  screen: string; // 홈에서 보여줄 탭
  noticeId: string;
};
