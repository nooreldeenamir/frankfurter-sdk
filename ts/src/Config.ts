
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Frankfurter',
        slug: "frankfurter",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "https://api.frankfurter.dev/v2",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        currency: {
        },
  
        rate: {
        },
  
    }
  }


  entity = {
    "currency": {
      "fields": [
        {
          "name": "end_date",
          "title": "End Date",
          "type": "`$STRING`",
          "format": "date"
        },
        {
          "name": "iso_code",
          "title": "Iso Code",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "iso_numeric",
          "title": "Iso Numeric",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "start_date",
          "title": "Start Date",
          "type": "`$STRING`",
          "format": "date"
        },
        {
          "name": "symbol",
          "title": "Symbol",
          "type": "`$STRING`"
        }
      ],
      "name": "currency",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/currencies",
              "segments": [
                {
                  "lit": "currencies"
                }
              ],
              "parts": [
                "currencies"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "rate": {
      "fields": [
        {
          "name": "base",
          "title": "Base",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "date",
          "title": "Date",
          "type": "`$STRING`",
          "req": true,
          "format": "date"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "quote",
          "title": "Quote",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "rate",
          "title": "Rate",
          "type": "`$NUMBER`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "from": {
          "base": "base",
          "quote": "quote"
        },
        "name": "id",
        "parts": [
          "base",
          "quote"
        ],
        "sep": "/"
      },
      "name": "rate",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/rates",
              "segments": [
                {
                  "lit": "rates"
                }
              ],
              "parts": [
                "rates"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "base",
                    "orig": "base",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "quote",
                    "orig": "quotes",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/rate/{base}/{quote}",
              "segments": [
                {
                  "lit": "rate"
                },
                {
                  "var": "base"
                },
                {
                  "var": "quote"
                }
              ],
              "parts": [
                "rate",
                "{base}",
                "{quote}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "base",
                    "orig": "base",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "quote",
                    "orig": "quote",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "base",
                  "quote"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

