import {IMessages} from "./messages/IMessages";
import {IBlogs} from "./blogs/IBlogs";

export interface IAccount {
  id: number,
  email: string,
  name: string,
  messageEntities: IMessages[],
  blogEntities: IBlogs[]
}
