import { TLoading } from "./general";

export type TDashboard = {
  projectsCount: number,
  blogsCount: number
}

export type TinitialState = {
  dashboard: TDashboard,
  loading: TLoading;
  error: null | string;
}