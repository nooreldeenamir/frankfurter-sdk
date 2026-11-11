# Contributing

This is an unofficial, small TypeScript client for a subset of Frankfurter v2.
It started as a paid assessment using the Voxgig generator. AI assistance was
used; the recorded commands and tests make the technical claims checkable.

## Build and check a change

Use Node 24 and the committed npm lockfile. From the repository root:

```sh
npm ci --prefix ts
npm test --prefix ts
node verification/check-crlf-docs.cjs
node --test verification/consumer-contract.test.cjs
node examples/offline-rates.cjs
```

The generated suite uses mock data by default. The separate consumer suite
injects a transport and checks concrete request paths, query aliases, payloads,
HTTP failures, cancellation and malformed JSON. Neither command needs credentials
or a working Frankfurter API. One explicitly marked TODO records an unresolved
static type issue; it is not a passing check.

The CRLF check temporarily rewrites the three documentation files to Windows
line endings, runs the real generated documentation gate, then restores their
original bytes. Run it sequentially, not alongside a documentation editor.

The optional `node examples/live-smoke.cjs` makes four read-only requests to the
public API. Live values change; it checks response shape rather than a fixed
exchange rate. Do not put live tests into an ordinary pull-request check.

## Generated code

Do not edit `ts/` output directly. Change the model, template or component under
`.sdk/`, regenerate, and inspect the diff. [AGENTS.md](AGENTS.md) describes that
workflow. Regeneration requires its own dependencies (`npm ci --prefix .sdk`).
The original [report](REPORT.md) documents the Windows model-path workaround.

Place project-specific regressions in `verification/` and runnable examples in
`examples/`. Explain what failed before the change, the observed result after it,
and any limitation left open. Preserve the upstream MIT notices.

## Issue reports

Include the SDK commit, Node version, OS, a minimal input and expected/actual
output. Use synthetic data. Do not include customer records, private credentials
or account details. Suspected security issues should follow [SECURITY.md](SECURITY.md).

Changes to an upstream project require its maintainers' review. A local
reproduction here is not an accepted upstream fix or a community contribution.
