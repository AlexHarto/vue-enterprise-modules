export enum RetroType {
  CONTINUE = 'CONTINUE',
  STOP = 'STOP',
  TRY = 'TRY',
  KUDOS = 'KUDOS',
}

export interface RetroSectionMessage {
  label: string;
  likes?: number;
  unlinkes?: number;
  comments?: string[];
}

export interface RetroSectionData {
  title: string;
  type: RetroType;
  messages?: RetroSectionMessage[];
}
