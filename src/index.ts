import axios from 'axios';
import * as crypto from 'crypto';
import * as FormData from 'form-data';
import { GetBalanceFailureResponse, GetBalanceSuccessResponse, IntouchAPIEndpoints, RequestDepositResponse, RequestPaymentResponse } from './types';

export class IntouchApi {
    baseUrl:string = 'https://www.intouchpay.co.rw/api'
    accountId: string;
    password: string;
    username: string;
    callbackUrl: string;
    constructor(intouchAccountId: string,  intouchPassword: string, intouchUsername: string, intouchCallbackUrl: string){
        this.accountId = intouchAccountId;
        this.password = intouchPassword;
        this.username = intouchUsername;
        this.callbackUrl = intouchCallbackUrl;
    }
  private async makeRequest (
    method: string, body: any, endpoint: IntouchAPIEndpoints | string
  ) {
    try {
      const response = await axios({
        url: `${this.baseUrl}${endpoint}`,
        method,
        data: body,
        headers: { 'Content-Type': 'application/json' }
      })
      console.log(response)
      const data = await response.data
      return data
    } catch (err) {
        if(err instanceof Error){
          console.error(err)
            throw new Error(err.name)
        }
      throw new Error('There was an error sending a request to intouch')
    }
  }

  private generatePassword () {
    return crypto.createHash('sha256').update(
      Buffer.from(
        `${
          this.username
        }${
          this.accountId
        }${
          this.password
        }${
          Math.round(new Date().getTime() / 1000)
        }`)
    ).digest('hex')
  }

  /**
   * The App (functioning as the client) invokes the RequestPayment
    API to initiate a payment request to a subscriber on Intouchpay (functioning as the server).
    The intouchpay gateway will then respond with a pending status to the App awaiting 
    for subscriber confirmation of the transaction.
    After confirmation the Intouchpay gateway will invoke the App on
    the App transaction status url with the status of the transaction.
   * @param amount 
   * @param phone // the user's phone number where the money will come from , it should be formatted like (2507xxxxxxxx)
   * @param transactionId // your own transaction id for reference
   * @returns 
   */
  public async requestPayment (
    amount: string, 
    mobilephone: string,
    requesttransactionid: string
    ): Promise<RequestPaymentResponse> {
    const password = this.generatePassword()
    const body = {
      username: this.username,
      timestamp: String(Math.round(new Date().getTime() / 1000)),
      amount,
      password,
      mobilephone,
      requesttransactionid,
      callbackUrl:this.callbackUrl
    }
    return await this.makeRequest('POST', body, IntouchAPIEndpoints.REQUEST_PAYMENT)
  }

  /**
   * The App (functioning as the client) invokes the RequestDeposit
    API to initiate a deposit request to a subscriber on Intouchpay (functioning as the server).
    The intouchpay gateway will then process the transaction and
    respond with a transaction status response.
   * @param amount 
   * @param phone // the user's phone number where the money will be deposited , it should be formatted like (2507xxxxxxxx)
   * @param transactionId // your own transaction id for reference
   * @param reason // your reason/note/comment on the transaction
   * @returns 
   */
  public async requestDeposit (amount: string, phone: string, transactionId: string, reason: string): Promise<RequestDepositResponse> {
    const password = this.generatePassword()
    const body = {
      username: this.username,
      timestamp: Math.round(new Date().getTime() / 1000),
      amount,
      withdrawcharge: 0,
      reason,
      sid: 1,
      password,
      mobilephone: phone,
      requesttransactionid: transactionId
    }
    return await this.makeRequest('POST', body, IntouchAPIEndpoints.REQUEST_DEPOSIT)
  }

  public async getBalance () :Promise<GetBalanceSuccessResponse | GetBalanceFailureResponse>{
    const password = this.generatePassword()

    const bodyFormData = new FormData()
    bodyFormData.append('username', this.username)
    bodyFormData.append('timestamp', `${Math.round(new Date().getTime() / 1000)}`)
    bodyFormData.append('accountno', this.accountId)
    bodyFormData.append('password', password)

    const config = {
      method: 'post',
      url: `${this.baseUrl}${IntouchAPIEndpoints.GET_BALANCE}`,
      headers: {
        ...bodyFormData.getHeaders(),
        'Content-Length': bodyFormData.getLengthSync()
      },
      data: bodyFormData
    }
    const response = await axios(config)
    return response.data
  }
}
