# Voxgig SDK generator assessment: Frankfurter v2

Prepared for Nooreldeen Abdelkarim, 9 October 2026. AI assistance was used to inspect documentation, author the limited API description, operate the Voxgig generator, investigate setup failures, and run verification. The candidate should review and understand the project before submission. Human review time has not been measured; it must not be represented as completed personal work.

## API and scope

Frankfurter provides public reference exchange rates without authentication. A GitHub API listing of all 804 repositories in `voxgig-sdk` contained no Frankfurter-named SDK when checked on 9 October. Its [official documentation](https://frankfurter.dev/) and [OpenAPI specification](https://api.frankfurter.dev/v2/openapi.json) informed an independently authored OpenAPI 3.0.3 subset in `.sdk/def/openapi.json`.

This SDK covers JSON responses from three endpoints: `/rates`, `/rate/{base}/{quote}`, and `/currencies`. It does not cover providers, coverage, all filters, CSV or NDJSON. No account, trial or API key was necessary. It is unofficial and MIT licensed.

## Result and verification

- Scaffolded with `@voxgig/create-sdkgen` 0.30.7; generated with `@voxgig/sdkgen` 4.34.3 and `@voxgig/apidef` 8.25.0.
- Generated TypeScript entities: `Rate` (`load`, `list`) and `Currency` (`list`). No generated SDK source was hand-edited.
- Verified using Node 24.19.0 and TypeScript 6.0.3. Both SDK and test-model builds passed.
- Generated offline suite: **218 passed, 10 skipped, 0 failed** (228 total). Skipped checks are not counted as passes.
- Live SDK smoke checks passed: EUR/USD pair, a USD list restricted to EUR/GBP, currency list containing EGP/USD, and an invalid-pair HTTP 422 error envelope. Run `node examples/live-smoke.cjs` after building. On this Windows machine, Node's `--use-system-ca` option was necessary; TLS verification was never disabled.
- `doctor` exited 1 for one intentional fork: `model/target/ts.aontu`, where TypeScript and Node type dependencies were pinned to the versions tested. It reported 0 edited templates, 0 stale files, 0 missing files and 0 outdated files. This is a disclosed drift finding, not a clean doctor result.

## Developer-experience observations

**Useful:** the entity surface is compact; `.Rate().load({base, quote})` is straightforward. The model mapped SDK `quote` to the API's plural `quotes` query parameter correctly. Generated documentation, offline tests, MIT attribution and the direct-call error envelope made the output inspectable and testable.

**Windows automatic installation:** the scaffold wrote files, then failed with `Failed to start npm: spawn npm ENOENT`. `--no-install` produced a useful message explaining that targets/features need installed dependencies. Installing dependencies separately and invoking `target add ts` worked.

**Windows model paths:** the standard `voxgig-model model/sdk.aontu` command reported an existing `api/api-info.aontu` as missing; search paths omitted the Windows drive/model directory. Calling the same exported `Model` API with relative `path` and `base` values succeeded. `.sdk/build/model-relative.cjs` records this workaround, and the project's generate script uses it. A minimal Windows path regression would help distinguish drive, separator and spaces-in-path cases.

**Nullable types:** the input permits null for currency `symbol`, `iso_numeric`, `start_date` and `end_date`. Generated `Currency` types express these as optional strings, without `| null`. This is a static contract mismatch; passing live tests does not establish type correctness. A nullable-field fixture would improve coverage. It has not been repaired in this assessment.

**Warnings and drift:** generation disables an unreachable `BasicRateFlow` load step because its synthetic flow does not supply required path parameters. Ordinary pair loading passed live verification. Also, the documentation allows editing target dependency declarations, while `doctor` flags those edits as forks; a documented project-level dependency override would make this choice clearer.

**Local environment:** the ordinary npm launcher selected Node 22 despite Node 24 being available. Registry downloads were slow, and an unconstrained compiler range initially selected TypeScript 7 without its Windows executable. Those are setup observations, not proven generator defects. A published TypeScript 6 archive was downloaded into a temporary tooling directory and added to npm's cache; committed manifests/lockfiles use registry versions, with no local archive dependency.

## Reproduction and limitations

With Node 24 and npm available:

```text
cd .sdk
npm ci
npm run generate
cd ../ts
npm ci
npm test
cd ..
node examples/live-smoke.cjs
```

The build and packaging session ran from 14:30 to 14:56 Cairo (26 minutes). Actual candidate human time is unmeasured. No full-API or production-readiness claim is made. Publication was separately authorised afterward: https://github.com/nooreldeenamir/frankfurter-sdk. No npm package, employer email or invoice has been published or sent. Candidate review remains before employer submission; local results above do not imply successful remote CI.
