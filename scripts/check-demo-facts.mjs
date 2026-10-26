import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

// Hartwell DEMO facts must only live in lib/demo-facts.ts. Any literal below found elsewhere fails the check.
const ROOT = process.cwd()
const DIRS = ['app', 'components', 'lib']
const SOURCE = 'lib/demo-facts.ts'
const FORBIDDEN = [
  /butterfly valve/i,
  /高性能蝶阀/,
  /\bDN\d{2,3}\b/,
  /\bPN\d{2}\b/,
  /\bH-200\b/,
  /\d+(\.\d+)?MB\b/,
  /hartwell-demo\.example/,
  /\bHW-[A-Z]{2,3}-\d/,
  /Ductile iron|球墨铸铁/,
]

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return walk(path)
    return /\.(ts|tsx)$/.test(name) ? [path] : []
  })
}

const failures = []
for (const dir of DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const rel = relative(ROOT, file)
    if (rel === SOURCE) continue
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        for (const pattern of FORBIDDEN) {
          if (pattern.test(line)) failures.push(`${rel}:${i + 1}  ${pattern}  ${line.trim()}`)
        }
      })
  }
}

if (failures.length) {
  console.error(`Demo facts hardcoded outside ${SOURCE}:\n${failures.join('\n')}`)
  process.exit(1)
}
console.log(`check:demo passed — all Hartwell DEMO facts come from ${SOURCE}.`)
