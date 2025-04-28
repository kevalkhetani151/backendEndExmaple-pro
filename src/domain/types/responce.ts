export interface successResponce<T = unknown> {
  status: true;
  message: string;
  data: T;
  error: [];
}

export interface errorResponce<E = unknown> {
  status: false;
  message: string;
  error: E;
  data: [];
}
