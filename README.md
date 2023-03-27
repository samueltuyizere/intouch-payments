## Summary

This Library provides easy access to Intouchpayment's API to process mobile money payments by MTN Rwanda Mobile Money accounts and Airtel Money accounts.

Available features are:

- Payments: Get money from your client's mobile money accounts.
- Deposits: Send money tp your client's mobile money accounts (withdrawals).
- Checking Balances: get the remaining balance on your intouch account.

### Set Up

Before you start using this package, Contact the IntouchPayments team and request the following:
- username
- accountno
- partnerpassword

For testing purposes you can use these:
- username: testa
- accountno: 
- partnerpassword: 

However, confirm first with their team so that you are the only one using the test account, and test with the lowes amount possible (100 RWF)

## Usage

### Installation

To install the library, run this comman in your terminal:

```sh
npm install intouch-payments
```


### Initialization

```javascript
const IntouchApi = require('intouch-payments'); // or import IntouchApi from 'intouch-payments'
const intouch = new IntouchApi(process.env.INTOUCH_USERNAME, process.env.INTOUCH_ACCOUNT_NO, process.env.INTOUCH_PARTNER_PASSWORD);
```