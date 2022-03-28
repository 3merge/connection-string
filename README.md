# connection-string-q3

This is a small helper package for `q3-api` projects deployed via Heroku,
looking to leverage a Static IP vendor like QuotaGuard. Since the Q3 framework
relies on `process.env.CONNECTION`, this helper dynamically assembles this
vendor with proxy options. Simply require the package in the first line of both
`index.js` and `worker.js`, then ensure the following variables exist:

```Javascript
// SRV connection string
process.env.MONGO = '';

// Proxy URL
process.env.QUOTAGUARDSTATIC_URL = '';

// Optional!
// QuotaGuard's HTTP and SOCKS5 connection strings only differ in port
// so we default to 1080 unless this value exists
process.env.QUOTAGUARDSTATIC_URL_PORT = '';
```
