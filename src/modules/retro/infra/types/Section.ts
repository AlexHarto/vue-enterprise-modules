export enum RetroType {
  CONTINUE = 'CONTINUE',
  STOP = 'STOP',
  TRY = 'TRY',
  KUDOS = 'KUDOS',
}

export interface RetroSectionMessage {
  id: string;
  authorId: string;
  label: string;
  userLikedIt: boolean;
  likes?: number;
  comments?: string[];
}

export interface RetroSectionData {
  type: RetroType;
  title: string;
  messages: RetroSectionMessage[];
}
