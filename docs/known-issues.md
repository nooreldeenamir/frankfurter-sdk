# Known issues

## Nullable currency fields lose `null` in TypeScript output

Status: reproduced, unresolved. This entry describes the generated client in this
repository, not a claim about the latest generator release.

The committed OpenAPI subset (`.sdk/def/openapi.json`) marks Currency `symbol`,
`iso_numeric`, `start_date` and `end_date` as nullable strings. The generated
`ts/src/FrankfurterTypes.ts` represents them as optional strings. An omitted
property and a JSON `null` are different values under TypeScript strict null
checking. The client preserves `null` at runtime; the static declarations reject
that valid input.

After building `ts/`, run this from the repository root:

```sh
node ts/node_modules/typescript/bin/tsc --strict --noEmit --skipLibCheck verification/nullable-contract.ts
```

Expected for the current client: nonzero exit, with four TS2322 diagnostics:
`Type 'null' is not assignable to type 'string | undefined'.`

`verification/consumer-contract.test.cjs` separately checks that a synthetic
currency record with all four null fields survives the public `Currency().list()`
operation. Its TODO marks the missing static contract. Fixing the declarations
requires tracing nullability through the API model and generation component,
regenerating, and replacing that TODO with a passing strict compile check.
Do not remove a null at runtime merely to satisfy the current declaration.

## Scope and verification limits

Only `/rates`, `/rate/{base}/{quote}` and `/currencies` JSON responses are modeled.
No npm package has been published. Runtime smoke checks do not establish full API
coverage, financial suitability or production readiness. The original generator
and environment observations remain in [REPORT.md](../REPORT.md).
