import {IComments} from "./IComments";

export interface IBlogs {
  id: string,
  title: string,
  body: string,
  create_Date: string,
  update_Date: string,
  owner_Email: string,
  owner_Id: string,
  view_Counts: number,
  view_Accounts: number[],
  commentsLists: IComments[]
}
