import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "currency",
    "accessor": "Currency",
    "op": "list",
    "method": "GET",
    "path": "/currencies",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "iso_code": "x",
        "iso_numeric": "x",
        "name": "x",
        "symbol": "x",
        "start_date": "2026-01-01",
        "end_date": "2026-01-01"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "rate",
    "accessor": "Rate",
    "op": "list",
    "method": "GET",
    "path": "/rates",
    "args": [],
    "select": {
      "base": "v1",
      "date": "v1",
      "quote": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "base",
      "quotes",
      "date"
    ],
    "queryArgs": [
      {
        "name": "base",
        "wire": "base"
      },
      {
        "name": "date",
        "wire": "date"
      },
      {
        "name": "quote",
        "wire": "quotes"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "date": "2026-01-01",
        "base": "x",
        "quote": "x",
        "rate": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "rate",
    "accessor": "Rate",
    "op": "load",
    "method": "GET",
    "path": "/rate/{base}/{quote}",
    "args": [
      {
        "name": "base",
        "wire": "base",
        "value": "p1"
      },
      {
        "name": "quote",
        "wire": "quote",
        "value": "p2"
      }
    ],
    "select": {
      "date": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "date"
    ],
    "queryArgs": [
      {
        "name": "date",
        "wire": "date"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "date": "2026-01-01",
      "base": "x",
      "quote": "x",
      "rate": 1
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
