export enum RetroType {
  CONTINUE,
  STOP,
  TRY,
  KUDOS,
}

export interface RetroSectionMessage {
  id?: string;
  index: number;
  type: RetroType;
  author: string;
  label: string;
  likes: string[];
  comments?: string[];
}

export interface RetroSectionData {
  type: RetroType;
  name: string;
  title: string;
}
