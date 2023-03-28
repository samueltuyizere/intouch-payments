export enum IntouchAPIEndpoints{
  REQUEST_PAYMENT='/requestpayment/',
  REQUEST_DEPOSIT='/requestdeposit/',
  GET_BALANCE='/getbalance'
}

export interface intouchWebhook {
  requesttransactionid:string,
  transactionid:string,
  responsecode :string,
  status:string,
  statusdesc:string,
}

enum RequestDepositStatus {
  'Successfull'='Successfull'
}
export declare interface RequestDepositResponse {
  status:RequestDepositStatus,
  message:string,
  success:boolean,
  referenceid:string,
  responsecode:string,
  transactionid:string,
  requesttransactionid:string
}

enum RequestPaymentStatus {
  'Pending'='Pending'
}

export declare interface RequestPaymentResponse {
  status:RequestPaymentStatus,
  message:string,
  success:boolean,
  responsecode:string,
  transactionid:string,
  requesttransactionid:string
}

export declare interface GetBalanceSuccessResponse{
  balance:string,
  success: boolean
}

export declare interface GetBalanceFailureResponse{
  success:boolean,
  responsecode:string,
  message: string
}