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
  type: RetroType;
  title: string;
  messages?: RetroSectionMessage[];
}
