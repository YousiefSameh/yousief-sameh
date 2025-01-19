import { TLoading } from "./general";

export type TBlog = {
  _id?: string;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  content: {
    ar: string;
    en: string;
  };
  publishedDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface initialStateType {
	blogs: TBlog[];
	loading: TLoading;
	error: null | string;
}