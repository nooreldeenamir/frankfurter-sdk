import type { Currency } from '../ts/dist/FrankfurterTypes'

// Reproduction of a known mismatch, NOT a passing compile fixture.
// The OpenAPI input permits null for each of these four fields.
const currency: Currency = {
  iso_code: 'USD',
  name: 'US Dollar',
  symbol: null,
  iso_numeric: null,
  start_date: null,
  end_date: null,
}

console.log(currency)
