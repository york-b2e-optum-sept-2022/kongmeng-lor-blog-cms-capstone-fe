import {IHistoryMessage} from "./IHistoryMessage";

export interface IMessages {
  id: number,
  current_Message: string,
  email_From: string,
  email_To: string,
  history_Messages:any[];
}
