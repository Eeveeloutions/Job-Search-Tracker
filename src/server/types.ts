export type ServerError = {
  log: string;
  status: number;
  message: { err: string };
  type: string;
  url: string;
};
