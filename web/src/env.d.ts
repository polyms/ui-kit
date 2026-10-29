declare const __VERSION__: string

interface ImportMetaEnv {
	readonly VITE_AMPLITUDE_API_KEY?: string
	readonly VITE_SENTRY_DSN?: string
}

declare var __amplitudeInitialized: boolean | undefined
