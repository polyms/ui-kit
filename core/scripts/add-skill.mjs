#!/usr/bin/env node

import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const packageRoot = path.resolve(__dirname, '..')
const sourceSkillDir = path.join(packageRoot, 'skills', 'core-ui')

const targetMap = {
  agents: ['.agents', 'skills', 'core-ui'],
  claude: ['.claude', 'skills', 'core-ui'],
  cursor: ['.cursor', 'skills', 'core-ui'],
}

const help = `Install the @polyms/core-ui agent skill into a consumer repository.

Usage:
  core-ui-skill [options]
  core-ui-skill add-skill [options]

Options:
  --target <all|cursor|claude|agents>  Install target (default: all)
  --cwd <path>                         Consumer repository root (default: current directory)
  --force                              Overwrite existing skill files
  --dry-run                            Print planned changes without writing files
  -h, --help                           Show help
`

const parseArgs = argv => {
  const args = {
    cwd: process.cwd(),
    dryRun: false,
    force: false,
    target: 'all',
  }

  const rest = argv[0] === 'add-skill' ? argv.slice(1) : argv

  for (let index = 0; index < rest.length; index += 1) {
    const value = rest[index]

    if (value === '--target') {
      args.target = rest[index + 1] ?? args.target
      index += 1
      continue
    }

    if (value === '--cwd') {
      args.cwd = path.resolve(rest[index + 1] ?? args.cwd)
      index += 1
      continue
    }

    if (value === '--force') {
      args.force = true
      continue
    }

    if (value === '--dry-run') {
      args.dryRun = true
      continue
    }

    if (value === '-h' || value === '--help') {
      args.help = true
      continue
    }

    throw new Error(`Unknown option: ${value}`)
  }

  if (!['all', ...Object.keys(targetMap)].includes(args.target)) {
    throw new Error(`Invalid --target "${args.target}". Expected all, cursor, claude, or agents.`)
  }

  return args
}

const copyDir = async (source, destination, { dryRun, force }) => {
  if (existsSync(destination) && !force) {
    return { destination, status: 'skipped' }
  }

  if (dryRun) {
    return { destination, status: existsSync(destination) ? 'would-overwrite' : 'would-create' }
  }

  if (force) {
    await fs.rm(destination, { force: true, recursive: true })
  }

  await fs.mkdir(path.dirname(destination), { recursive: true })
  await fs.cp(source, destination, { recursive: true })

  return { destination, status: 'installed' }
}

const run = async () => {
  const args = parseArgs(process.argv.slice(2))

  if (args.help) {
    console.info(help)
    return
  }

  if (!existsSync(sourceSkillDir)) {
    throw new Error(`Cannot find source skill directory: ${sourceSkillDir}`)
  }

  const targets = args.target === 'all' ? Object.keys(targetMap) : [args.target]
  const results = []

  for (const target of targets) {
    const destination = path.join(args.cwd, ...targetMap[target])
    results.push(await copyDir(sourceSkillDir, destination, args))
  }

  for (const result of results) {
    console.info(`${result.status}: ${path.relative(args.cwd, result.destination)}`)
  }

  if (results.some(result => result.status === 'skipped')) {
    console.info('Use --force to overwrite an existing installed skill.')
  }
}

run().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
