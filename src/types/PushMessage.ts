export type AppPush = {
  noticeId?: string; // TODO 어떻게 답 올지 모름 아직
  title: string;
  body: string;
  createdAt: string;
  isRead?: boolean; // TODO 어떻게 답 올지 모름 아직
  data: {screen?: string; noticeId?: number};
};
