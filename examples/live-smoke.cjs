const assert = require('node:assert/strict')
const { FrankfurterSDK } = require('../ts/dist/FrankfurterSDK.js')

async function main() {
  const client = new FrankfurterSDK()
  const pair = (await client.Rate().load({ base: 'EUR', quote: 'USD' })).data()
  assert.equal(pair.base, 'EUR')
  assert.equal(pair.quote, 'USD')
  assert.ok(Number.isFinite(pair.rate) && pair.rate > 0)
  console.log('PASS pair load:', JSON.stringify(pair))

  const rates = await client.Rate().list({ base: 'USD', quote: 'EUR,GBP' })
  assert.equal(rates.length, 2)
  assert.deepEqual(rates.map(item => item.data().quote).sort(), ['EUR', 'GBP'])
  assert.ok(rates.every(item => item.data().base === 'USD'))
  console.log('PASS filtered rate list:', rates.length)

  const currencies = await client.Currency().list()
  assert.ok(currencies.some(item => item.data().iso_code === 'EGP'))
  assert.ok(currencies.some(item => item.data().iso_code === 'USD'))
  console.log('PASS currency list:', currencies.length)

  const error = await client.direct({ path: '/rate/INVALID/usd', method: 'GET' })
  assert.equal(error.ok, false)
  assert.ok(error.status >= 400 && error.status < 500)
  console.log('PASS direct error envelope:', error.status)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
