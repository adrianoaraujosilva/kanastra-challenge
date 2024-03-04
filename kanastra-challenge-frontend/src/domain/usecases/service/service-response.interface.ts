export interface ServiceResponse<Result = any> {
  success: boolean;
  message: string;
  result: Result;
}
