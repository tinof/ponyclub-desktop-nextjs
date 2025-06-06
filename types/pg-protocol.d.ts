declare module 'pg-protocol/dist/messages' {
  export interface NoticeMessage {
    name?: string;
    message?: string;
    [key: string]: unknown;
  }
}
