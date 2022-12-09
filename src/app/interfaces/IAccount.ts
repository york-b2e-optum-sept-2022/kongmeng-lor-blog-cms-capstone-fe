import {IHistoryMessage} from "./IHistoryMessage";
import {IMessages} from "./IMessages";

export interface IAccount {
  id: number,
  email: string,
  name: string,
  messageEntities: IMessages[],
  blogEntities: any[]
}
