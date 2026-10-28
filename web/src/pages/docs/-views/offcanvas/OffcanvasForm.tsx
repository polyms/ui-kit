import { Button, Field, Modal, Offcanvas } from '@polyms/ui-kit'
import { type SubmitEvent, useRef, useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type Profile = {
	name: string
	email: string
	bio: string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export default function OffcanvasForm() {
	const [profile, setProfile] = useState<Profile>({
		name: 'Linh Nguyen',
		email: 'linh@polyms.dev',
		bio: 'Product designer building accessible interfaces.',
	})
	const [draft, setDraft] = useState(profile)
	const [open, setOpen] = useState(false)
	const [confirmDiscard, setConfirmDiscard] = useState(false)
	const [touched, setTouched] = useState({ name: false, email: false })
	const [saved, setSaved] = useState(false)
	const nameRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	const nameInvalid = !draft.name.trim()
	const emailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())
	const dirty = draft.name !== profile.name || draft.email !== profile.email || draft.bio !== profile.bio

	function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault()
		setTouched({ name: true, email: true })
		if (nameInvalid || emailInvalid) {
			const firstInvalid = nameInvalid ? nameRef : emailRef
			firstInvalid.current?.focus()
			return
		}

		const next = { name: draft.name.trim(), email: draft.email.trim(), bio: draft.bio.trim() }
		setProfile(next)
		setDraft(next)
		setSaved(true)
		setOpen(false)
	}

	return (
		<div className='m-auto w-full max-w-sm space-y-4'>
			<div className='rounded-xl border border-line bg-surface-2 p-4'>
				<p className='font-semibold text-fg'>{profile.name}</p>
				<p className='text-sm text-muted'>{profile.email}</p>
				{profile.bio && <p className='mt-3 text-sm text-fg'>{profile.bio}</p>}
			</div>
			<Offcanvas
				onOpenChange={(nextOpen, details) => {
					if (!nextOpen && dirty) {
						details.cancel()
						setConfirmDiscard(true)
						return
					}
					if (nextOpen) {
						setDraft(profile)
						setTouched({ name: false, email: false })
						setSaved(false)
					}
					setOpen(nextOpen)
				}}
				open={open}
				swipeDirection='right'
			>
				<Offcanvas.Trigger render={<Button variant='primary' />}>Edit profile</Offcanvas.Trigger>
				<Offcanvas.Content size='lg'>
					<Offcanvas.Header>
						<Offcanvas.Title>Edit profile</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Description>Update your contact details and introduce yourself.</Offcanvas.Description>
					<Offcanvas.Body>
						<form className='space-y-5' noValidate onSubmit={handleSubmit}>
							<Field invalid={touched.name && nameInvalid} name='name' required>
								<Field.Label>What should we call you?</Field.Label>
								<Field.Control
									aria-invalid={touched.name && nameInvalid}
									autoComplete='name'
									autoFocus
									maxLength={80}
									onBlur={() => setTouched(current => ({ ...current, name: true }))}
									onChange={event => setDraft(current => ({ ...current, name: event.target.value }))}
									ref={nameRef}
									required
									rounded
									type='text'
									value={draft.name}
								/>
								<Field.Feedback>Enter your name.</Field.Feedback>
							</Field>
							<Field invalid={touched.email && emailInvalid} name='email' required>
								<Field.Label>Where can we reach you?</Field.Label>
								<Field.Control
									aria-invalid={touched.email && emailInvalid}
									autoComplete='email'
									onBlur={() => setTouched(current => ({ ...current, email: true }))}
									onChange={event => setDraft(current => ({ ...current, email: event.target.value }))}
									ref={emailRef}
									required
									rounded
									type='email'
									value={draft.email}
								/>
								<Field.Description>Use the email address you check regularly.</Field.Description>
								<Field.Feedback>Enter a valid email address.</Field.Feedback>
							</Field>
							<Field name='bio'>
								<Field.Label>Want to add a short bio?</Field.Label>
								<Field.Control
									className='rounded-xl'
									maxLength={160}
									onChange={event => setDraft(current => ({ ...current, bio: event.target.value }))}
									render={<textarea rows={4} />}
									value={draft.bio}
								/>
								<Field.Description>Optional · {draft.bio.length}/160 characters</Field.Description>
							</Field>
							<div className='flex justify-end gap-2 border-t border-line pt-4 pb-20 md:pb-0'>
								<Offcanvas.Close render={<Button />}>Cancel</Offcanvas.Close>
								<Button type='submit' variant='primary'>
									Save changes
								</Button>
							</div>
						</form>
						<Modal onOpenChange={setConfirmDiscard} open={confirmDiscard}>
							<Modal.Content size='sm'>
								<Modal.Header>Discard changes?</Modal.Header>
								<Modal.Body>Your unsaved edits will be lost. Keep editing to finish your profile.</Modal.Body>
								<Modal.Footer>
									<Modal.Close render={<Button />}>Keep editing</Modal.Close>
									<Modal.Close
										onClick={() => {
											setDraft(profile)
											setOpen(false)
										}}
										render={<Button variant='danger' />}
									>
										Discard changes
									</Modal.Close>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
					</Offcanvas.Body>
				</Offcanvas.Content>
			</Offcanvas>
			<p aria-live='polite' className='min-h-5 text-sm text-muted' role='status'>
				{saved
					? 'Profile saved. Your updated details are shown above.'
					: 'Changes are saved locally for this preview.'}
			</p>
		</div>
	)
}
