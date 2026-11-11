# Changelog

All notable changes to the generated Frankfurter SDK are documented here.
This project follows [Keep a Changelog](https://keepachangelog.com) and
[Semantic Versioning](https://semver.org).

## [Unreleased]

- Fixed generated TypeScript documentation checks rejecting CRLF Markdown on
  Windows. Changed both generator components and regenerated the tests; added
  LF/CRLF fixtures and a real-document CRLF check in both hosted OS jobs.
- Added project-specific consumer contract checks for query mapping, historical
  pair requests, missing parameters, nullable runtime data, HTTP errors,
  malformed JSON and cancellation.
- Added an offline runnable example using synthetic rates, plus a bounded live
  smoke check. Live requests remain separate from pull-request CI.
- Added Linux and Windows consumer checks using Node 24 and the committed npm
  lockfile. Local Windows results do not imply either hosted job has passed.
- Documented contribution steps and a minimal strict TypeScript reproduction of
  the unresolved nullable Currency type mismatch.
- Corrected the initial changelog's language-target claim: only TypeScript was
  generated for this project.

## [0.0.1]

- Initial TypeScript Frankfurter SDK, generated with @voxgig/sdkgen from an
  independently authored three-endpoint OpenAPI subset. No npm release was made.
