#!/usr/bin/env node

import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const packageRoot = path.resolve(__dirname, '..')
const sourceSkillDir = path.join(packageRoot, 'skills', 'ui-kit')

const agentsTarget = ['.agents', 'skills', 'ui-kit']

const linkTargets = {
	claude: ['.claude', 'skills', 'ui-kit'],
	copilot: ['.github', 'skills', 'ui-kit'],
	cursor: ['.cursor', 'skills', 'ui-kit'],
}

const fileTargets = ['agents', 'codex']

const help = `Install the @polyms/ui-kit agent skill into a consumer repository.

Files are written to .agents/skills/ui-kit. Codex reads that folder.
Cursor, Claude Code, and Copilot paths are symlinks to it.

Usage:
  ui-kit-skill [options]
  ui-kit-skill add-skill [options]

Options:
  --target <all|cursor|claude|codex|copilot|agents>  Install target (default: all)
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

	const names = ['all', ...fileTargets, ...Object.keys(linkTargets)]

	if (!names.includes(args.target)) {
		throw new Error(
			`Invalid --target "${args.target}". Expected all, cursor, claude, codex, copilot, or agents.`
		)
	}

	return args
}

const lstatIfExists = async targetPath => {
	try {
		return await fs.lstat(targetPath)
	} catch (error) {
		if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') return null
		throw error
	}
}

const copyDir = async (source, destination, { dryRun, force }) => {
	const existing = await lstatIfExists(destination)

	if (existing && !force) {
		return { destination, status: 'skipped' }
	}

	if (dryRun) {
		return { destination, status: existing ? 'would-overwrite' : 'would-create' }
	}

	if (existing) {
		await fs.rm(destination, { force: true, recursive: true })
	}

	await fs.mkdir(path.dirname(destination), { recursive: true })
	await fs.cp(source, destination, { dereference: true, recursive: true })

	return { destination, status: 'installed' }
}

const linkDir = async (agentsDir, destination, { dryRun, force }) => {
	const linkPath = path.relative(path.dirname(destination), agentsDir)
	const existing = await lstatIfExists(destination)
	const alreadyLinked = existing?.isSymbolicLink() && (await fs.readlink(destination)) === linkPath

	if (alreadyLinked || (existing && !force)) {
		return { destination, status: 'skipped' }
	}

	if (dryRun) {
		return { destination, status: existing ? 'would-overwrite' : 'would-link' }
	}

	if (existing) {
		await fs.rm(destination, { force: true, recursive: true })
	}

	await fs.mkdir(path.dirname(destination), { recursive: true })
	await fs.symlink(linkPath, destination)

	return { destination, status: 'linked' }
}

const selectedTargets = target => {
	if (fileTargets.includes(target)) return []
	if (target === 'all') return Object.keys(linkTargets)
	return [target]
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

	const agentsDir = path.join(args.cwd, ...agentsTarget)
	const results = [await copyDir(sourceSkillDir, agentsDir, args)]

	for (const target of selectedTargets(args.target)) {
		const destination = path.join(args.cwd, ...linkTargets[target])
		results.push(await linkDir(agentsDir, destination, args))
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
