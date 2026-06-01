import { Avatar } from '@polyms/core'

// const avatarSrc = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
//   <defs>
//     <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
//       <stop offset="0" stop-color="#94a3b8" />
//       <stop offset="1" stop-color="#e2e8f0" />
//     </linearGradient>
//   </defs>
//   <rect width="80" height="80" rx="40" fill="url(#g)" />
//   <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle"
//     font-family="ui-sans-serif, system-ui" font-size="28" fill="#0f172a">JD</text>
// </svg>`)}`

export default function AvatarDefault() {
  return (
    <div className='m-auto grid grid-cols-3 items-center justify-center gap-2'>
      <Avatar className='size-12 bg-linear-65 from-violet-500 to-fuchsia-500 text-slate-100'>
        <Avatar.Fallback className='avatar-fallback' delay={0}>
          AL
        </Avatar.Fallback>
      </Avatar>
      <Avatar className='size-12'>
        <Avatar.Image
          alt='Aliah Lane'
          className='avatar-image'
          src='https://untitledui.com/images/avatars/aliah-lane'
        />
        <Avatar.Fallback className='avatar-fallback' delay={300}>
          AL
        </Avatar.Fallback>
      </Avatar>
      <div className='font-medium text-sm'>Aliah Lane</div>

      <Avatar className='size-12 bg-linear-65 from-purple-500 to-pink-500 text-slate-100'>
        <Avatar.Fallback className='avatar-fallback' delay={0}>
          RL
        </Avatar.Fallback>
      </Avatar>

      <Avatar className='size-12'>
        <Avatar.Image
          alt='Rhea Levine'
          className='avatar-image'
          src='https://untitledui.com/images/avatars/rhea-levine'
        />
        <Avatar.Fallback className='avatar-fallback' delay={300}>
          RL
        </Avatar.Fallback>
      </Avatar>

      <div className='font-medium text-sm'>Rhea Levine</div>
    </div>
  )
}
