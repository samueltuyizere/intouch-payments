[![wakatime](https://wakatime.com/badge/github/samueltuyizere/intouch-payments.svg)](https://wakatime.com/badge/github/samueltuyizere/intouch-payments)

## Summary

This Library provides easy access to [Intouchpay's](http://intouchpay.co.rw/) API to process mobile money payments by MTN Rwanda Mobile Money accounts and Airtel Money accounts.

Available features are:

- Payments: Get money from your client's mobile money accounts.
- Deposits: Send money tp your client's mobile money accounts (withdrawals).
- Checking Balances: get the remaining balance on your intouch account.

### Set Up

Before you start using this package, Contact the IntouchPay team and request the following:

- username
- accountno
- partnerpassword

For testing purposes you can use these:

- username: testa
- accountno: 250160000011
- partnerpassword: pass123456789

However, confirm first with their team so that you are the only one using the test account, and test with the lowest amount possible (100 RWF)

## Usage

### Installation

To install the library, run this comman in your terminal:

```sh
npm install intouch-payments
```

### Initialization

```javascript
const IntouchApi = require('intouch-payments'); // or import IntouchApi from 'intouch-payments'
const intouch = new IntouchApi(process.env.INTOUCH_USERNAME, process.env.INTOUCH_ACCOUNT_NO, process.env.INTOUCH_PARTNER_PASSWORD, process.env.INTOUCH_CALLBACK_URL);
```

### Getting money from a momo account (requesting a payment)

```javascript
const IntouchApi = require('intouch-payments'); // or import IntouchApi from 'intouch-payments'
const intouch = new IntouchApi(process.env.INTOUCH_USERNAME, process.env.INTOUCH_ACCOUNT_NO, process.env.INTOUCH_PARTNER_PASSWORD);

const request = await IntouchApi.requestPayment(amount, phone, transactionId) // (100, '2507xxxxxxxx', 'sample-reference')
```

### Sending money to a momo account (requesting a deposit / withdraw)

```javascript
const IntouchApi = require('intouch-payments'); // or import IntouchApi from 'intouch-payments'
const intouch = new IntouchApi(process.env.INTOUCH_USERNAME, process.env.INTOUCH_ACCOUNT_NO, process.env.INTOUCH_PARTNER_PASSWORD);

const request = await IntouchApi.requestDeposit(amount, phone, transactionId, reason) // (100, '2507xxxxxxxx', 'sample-reference', 'testing-withdraw')
```

### Getting your account's balance

```javascript
const IntouchApi = require('intouch-payments'); // or import IntouchApi from 'intouch-payments'
const intouch = new IntouchApi(process.env.INTOUCH_USERNAME, process.env.INTOUCH_ACCOUNT_NO, process.env.INTOUCH_PARTNER_PASSWORD);

const request = await IntouchApi.getBalance()
```

# Going Live

Contact the Intouch team to set up a callback url to receive webhooks and get live credentials
[Email](mailto:benitha.louange@intouch.co.rw)
