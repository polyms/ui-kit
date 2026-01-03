import { Tabs } from '@polyms/core'

export default function SelectDefault() {
  return (
    <Tabs>
      <Tabs.List>
        <Tabs.Tab value='sans'>Sans-serif</Tabs.Tab>
        <Tabs.Tab value='serif'>Serif</Tabs.Tab>
        <Tabs.Tab value='mono'>Mono</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='sans'>Sans-serif</Tabs.Panel>
      <Tabs.Panel value='serif'>Serif</Tabs.Panel>
      <Tabs.Panel value='mono'>Mono</Tabs.Panel>
    </Tabs>
  )
}
