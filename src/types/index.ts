export interface MetaData {
  [key: string]: any;
}

export interface ResponsePayload {
  status: boolean;
  data: any;
  message: string;
  meta: MetaData;
}
