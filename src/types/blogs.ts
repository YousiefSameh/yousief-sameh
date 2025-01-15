import { TLoading } from "./general";

export type TBlog = {
  id: number;
  title: string;
  description: string;
  content: string;
  publishedDate: string;
}

export interface initialStateType {
	blogs: TBlog[];
	loading: TLoading;
	error: null | string;
}