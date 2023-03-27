import { IntouchAPIEndpoints } from './types';
import axios from 'axios';
import * as crypto from 'crypto';
import * as FormData from 'form-data';

export class IntouchApi {
    intouchBaseUrl:string = 'https://www.intouchpay.co.rw/api'
    intouchAccountId: string;
    intouchPassword: string;
    intouchUsername: string;
    constructor(intouchAccountId: string,  intouchPassword: string, intouchUsername: string){
        this.intouchAccountId = intouchAccountId;
        this.intouchPassword = intouchPassword;
        this.intouchUsername = intouchUsername;
    }
  private async makeRequest (
    method: string, body: any, endpoint: IntouchAPIEndpoints | string
  ) {
    try {
      const response = await axios({
        url: `${this.intouchBaseUrl}${endpoint}`,
        method,
        data: body,
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.data
      return data
    } catch (err) {
        if(err instanceof Error){
            throw new Error(err.message)
        }
      throw new Error('There was an error sending a request to intouch')
    }
  }

  private generatePassword () {
    return crypto.createHash('sha256').update(
      Buffer.from(
        `${
          this.intouchUsername
        }${
          this.intouchAccountId
        }${
          this.intouchPassword
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
  public async requestPayment (amount: number, phone: string, transactionId: string) {
    const password = this.generatePassword()
    const body = {
      username: this.intouchUsername,
      timestamp: Math.round(new Date().getTime() / 1000),
      amount,
      password,
      mobilephone: phone,
      requesttransactionid: transactionId
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
  public async requestDeposit (amount: number, phone: string, transactionId: string, reason: string) {
    const password = this.generatePassword()
    const body = {
      username: this.intouchUsername,
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

  public async getBalance () {
    const password = this.generatePassword()

    const bodyFormData = new FormData()
    bodyFormData.append('username', this.intouchUsername)
    bodyFormData.append('timestamp', `${Math.round(new Date().getTime() / 1000)}`)
    bodyFormData.append('accountno', this.intouchAccountId)
    bodyFormData.append('password', password)

    const config = {
      method: 'post',
      url: `${this.intouchBaseUrl}${IntouchAPIEndpoints.GET_BALANCE}`,
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
