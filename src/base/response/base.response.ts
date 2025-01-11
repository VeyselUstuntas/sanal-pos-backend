export class BaseResponse<T> {
  data: T;
  message: string;
  success: boolean;

  constructor(baseResponse: Partial<BaseResponse<T>>) {
    Object.assign(this, baseResponse);
  }
}
