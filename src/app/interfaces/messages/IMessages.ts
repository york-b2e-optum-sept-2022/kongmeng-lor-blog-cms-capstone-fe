import {IHIstoryMessages} from "./IHIstoryMessages";
export interface IMessages {
  id: number,
  current_Message: string,
  owner: string,
  email_From: string,
  email_To: string,
  owner_To_Name: string,
  owner_From_Name: string,
  historyEntities:IHIstoryMessages[]
}
