const assert = require('node:assert/strict')
const { FrankfurterSDK } = require('../ts/dist/FrankfurterSDK.js')

async function main() {
  const requests = []
  const synthetic = [
    { date: '2026-01-02', base: 'USD', quote: 'EUR', rate: 0.9 },
    { date: '2026-01-02', base: 'USD', quote: 'GBP', rate: 0.8 },
  ]
  const client = new FrankfurterSDK({ system: {
    fetch: async (url, init) => {
      requests.push({ url: String(url), method: init.method })
      return Response.json(synthetic)
    },
  } })
  const items = await client.Rate().list({ base: 'USD', quote: 'EUR,GBP', date: '2026-01-02' })
  assert.deepEqual(items.map(item => item.data()), synthetic)
  assert.equal(new URL(requests[0].url).searchParams.get('quotes'), 'EUR,GBP')
  console.log('Synthetic fixture data. No live HTTP request was made.')
  console.log(JSON.stringify({ request: requests[0], rates: items.map(item => item.data()) }, null, 2))
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
