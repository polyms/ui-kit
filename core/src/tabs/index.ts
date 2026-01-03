import { Tab, TabList } from './Tab'
import { TabPanel } from './TabPanel'
import { TabRoot } from './TabRoot'

export const Tabs = Object.assign(TabRoot, {
  Tab,
  List: TabList,
  Panel: TabPanel,
})
