const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

// Exercise the real documentation gate after the conversion a Windows Git
// checkout can perform. Keep exact bytes so this check leaves no doc changes.
const root = path.resolve(__dirname, '..')
const originals = ['README.md', 'ts/README.md', 'ts/REFERENCE.md'].map(name => {
  const file = path.join(root, name)
  return { file, bytes: fs.readFileSync(file) }
})

try {
  for (const { file, bytes } of originals) {
    fs.writeFileSync(file, bytes.toString('utf8').replace(/\r?\n/g, '\r\n'))
  }
  const result = spawnSync(process.execPath, ['--test',
    'ts/dist-test/ReadmeExample.test.js', 'ts/dist-test/readme_examples.test.js'],
  { cwd: root, stdio: 'inherit', timeout: 120000 })
  if (result.error) throw result.error
  process.exitCode = result.status ?? 1
} finally {
  for (const { file, bytes } of originals) fs.writeFileSync(file, bytes)
}
