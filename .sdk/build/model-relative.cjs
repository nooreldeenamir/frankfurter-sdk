const { Model } = require('@voxgig/model')

async function main() {
  for (const path of process.argv.slice(2)) {
    const base = path.slice(0, path.lastIndexOf('/'))
    const result = await new Model({ path, base, require: process.cwd(), debug: 'warn' }).run()
    if (!result.ok) {
      process.exitCode = 1
      return
    }
    console.log('Model build passed:', path)
  }
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
