# Maintenance check: 11 November 2026

This check adds consumer examples and regressions to the original generated
assessment project. It is one dated maintenance update, not evidence of a
long-running release history. AI assistance was used to prepare and execute
the checks. The commands below allow a reader to verify the observations.

Environment: Windows, Node 24.22.1, TypeScript 6.0.3 from the existing lockfile.
The default shell's Node 22.11.0 is below the package's declared minimum;
the checks used the installed Node 24 executable instead.

| Check | Result |
| --- | --- |
| `npm test --prefix ts` | 228 tests: 218 pass, 10 skip, 0 fail |
| `node --test verification/consumer-contract.test.cjs` | 9 pass, 0 fail, 1 explicit TODO |
| `node examples/offline-rates.cjs` | Passed; no HTTP request, two synthetic records |
| Strict compile of `verification/nullable-contract.ts` | Expected failure: four TS2322 errors for null fields |
| `node --use-system-ca examples/live-smoke.cjs` | Four read-only checks passed: pair, filtered list, 200-currency list, invalid pair HTTP 422 |

The generated suite and consumer suite answer different questions. The new tests
exercise the public SDK surface against synthetic API-shaped responses and
inspect the URL sent to an injected transport. They do not call internal
utilities or depend on a live currency rate. In particular, `quote` on the SDK
list operation must become `quotes` in the API request, and an HTTP 200 with
broken JSON must not become a successful result.

The Currency test confirms runtime preservation of null fields. The separate
compile reproduction confirms the declarations still disagree with that payload.
This update does not repair the generator's nullable-type path. The TODO remains
visible so a green test run is not presented as a fully satisfied contract.

The new `consumer-contract` workflow runs these offline checks on Linux and
Windows. Hosted runs must be checked on GitHub after publication; local success
alone is not evidence of hosted CI success. No package publication, upstream
issue submission, external contribution acceptance or new speaker event is
implied by this update.

The optional live check now applies a 15-second timeout to each fetch. Node's
system CA option was used for this Windows environment; TLS verification was
left enabled. A failure from an unavailable upstream service should be reported
separately from the deterministic offline checks.
