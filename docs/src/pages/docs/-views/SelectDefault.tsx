import { Select } from '@polyms/core'

const frontend = [
  { label: 'Next.js', value: 'next' },
  { label: 'Vite', value: 'vite' },
  { label: 'Astro', value: 'astro' },
]
const backend = [
  { label: 'Express', value: 'express' },
  { label: 'NestJS', value: 'nestjs' },
  { label: 'Fastify', value: 'fastify' },
  { label: 'Django', value: 'django' },
  { label: 'Flask', value: 'flask' },
  { label: 'Rails', value: 'rails' },
]

export default function SelectDefault() {
  return (
    <div>
      <Select>
        <Select.Trigger placeholder='Select'>{item => item.label}</Select.Trigger>
        <Select.Content>
          {frontend.map(item => (
            <Select.Item key={item.value} value={item.label}>
              {item.label}
            </Select.Item>
          ))}
          <Select.Separator />
          <Select.Group>
            <Select.GroupLabel>Backend</Select.GroupLabel>
            {backend.map(item => (
              <Select.Item key={item.value} value={item.label}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select>
    </div>
  )
}
