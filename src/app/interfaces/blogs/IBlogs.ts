import {IComments} from "./IComments";

export interface IBlogs {
  id: number,
  title: string,
  body: string,
  create_Date: string,
  update_Date: string,
  owner_Email: string,
  owner_Id: number,
  view_Counts: number,
  view_Accounts: number[],
  commentsLists: IComments[]
}
