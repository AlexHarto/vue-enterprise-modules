export enum RetroType {
  CONTINUE,
  STOP,
  TRY,
  KUDOS,
}

export interface RetroSectionMessage {
  index: number;
  type: RetroType;
  author: number;
  label: string;
  likes: number[];
  comments?: string[];
}

export interface RetroSectionData {
  type: RetroType;
  name: string;
  title: string;
}
