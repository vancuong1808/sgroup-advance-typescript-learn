import { CustomResponseResult } from "../typings/custom.interface";

export class Result implements CustomResponseResult {
    isOk: boolean;
    status: number;
    message: string | string[];
    data?: object | undefined;
  constructor(isOk: boolean, status: number, message: string | string[], data?: object | string ) {
    this.isOk = isOk;
    this.status = status;
    this.message = message;
    if (data !== undefined) {
        this.data = { value : data };
    }
  }
}