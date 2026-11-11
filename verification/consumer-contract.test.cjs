const { test } = require('node:test')
const assert = require('node:assert/strict')
const { FrankfurterSDK } = require('../ts/dist/FrankfurterSDK.js')

// Fixed, synthetic responses: no request in this file leaves the process.
const rate = { date: '2026-01-02', base: 'USD', quote: 'EUR', rate: 0.9 }

function fixture(body, status = 200) {
  const requests = []
  const client = new FrankfurterSDK({
    system: {
      fetch: async (url, init) => {
        requests.push({ url: new URL(url), method: init.method })
        return Response.json(body, { status })
      },
    },
  })
  return { client, requests }
}

test('rate list maps public quote to the API quotes query parameter', async () => {
  const { client, requests } = fixture([rate])
  const items = await client.Rate().list({ base: 'USD', quote: 'EUR,GBP', date: '2026-01-02' })
  assert.equal(requests.length, 1)
  const { url, method } = requests[0]
  assert.equal(url.origin, 'https://api.frankfurter.dev')
  assert.equal(url.pathname, '/v2/rates')
  assert.equal(url.searchParams.get('base'), 'USD')
  assert.equal(url.searchParams.get('quotes'), 'EUR,GBP')
  assert.equal(url.searchParams.get('date'), '2026-01-02')
  assert.equal(url.searchParams.has('quote'), false)
  assert.equal(method, 'GET')
  assert.deepEqual(items.map(item => item.data()), [rate])
})

test('pair load retains the historical date and pair path', async () => {
  const { client, requests } = fixture(rate)
  assert.deepEqual((await client.Rate().load({ base: 'USD', quote: 'EUR', date: '2026-01-02' })).data(), rate)
  assert.equal(requests[0].url.pathname, '/v2/rate/USD/EUR')
  assert.equal(requests[0].url.searchParams.get('date'), '2026-01-02')
})

test('missing pair parameters fail before transport', async () => {
  const { client, requests } = fixture(rate)
  await assert.rejects(client.Rate().load({ base: 'USD' }), /quote|point|parameter/i)
  assert.equal(requests.length, 0)
})

test('empty rate list returns an empty array', async () => {
  const { client } = fixture([])
  assert.deepEqual(await client.Rate().list({ base: 'USD' }), [])
})

test('currency data preserves nullable fields at runtime', async () => {
  const currency = { iso_code: 'USD', name: 'US Dollar', symbol: null,
    iso_numeric: null, start_date: null, end_date: null }
  const { client } = fixture([currency])
  assert.deepEqual((await client.Currency().list())[0].data(), currency)
})

test('direct returns the HTTP error body without treating it as success', async () => {
  const payload = { message: 'Invalid currency pair' }
  const { client } = fixture(payload, 422)
  const result = await client.direct({ path: '/rate/INVALID/USD', method: 'GET' })
  assert.equal(result.ok, false)
  assert.equal(result.status, 422)
  assert.deepEqual(result.data, payload)
})

test('entity load rejects an unsuccessful HTTP response', async () => {
  const { client } = fixture({ message: 'Invalid currency pair' }, 422)
  await assert.rejects(client.Rate().load({ base: 'INVALID', quote: 'USD' }),
    error => error instanceof Error && error.status === 422)
})

test('malformed JSON on a 200 response is not reported as success', async () => {
  const client = new FrankfurterSDK({ system: {
    fetch: async () => new Response('{broken', { status: 200,
      headers: { 'content-type': 'application/json' } }),
  } })
  const result = await client.direct({ path: '/rates' })
  assert.equal(result.ok, false)
  assert.equal(result.status, 200)
  assert.ok(result.err instanceof Error)
})

test('a cancelled request does not reach transport', async () => {
  const { client, requests } = fixture([rate])
  const controller = new AbortController()
  controller.abort(new Error('cancelled by consumer'))
  const result = await client.direct({ path: '/rates', ctrl: { signal: controller.signal } })
  assert.equal(result.ok, false)
  assert.equal(requests.length, 0)
})

test.todo('Currency static types should also accept the documented null field values; see docs/known-issues.md')
