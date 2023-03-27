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