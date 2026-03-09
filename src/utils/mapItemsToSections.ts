import type { AppDataSchema } from '@/types/app-config'
import type { NavItem } from '@/types/item'
import type { SectionViewModel } from '@/types/view-model'
import { mapItemToViewModel } from './mapItemToViewModel'

function getTimeValue(dateStr?: string | null): number {
  if (!dateStr) return 0
  const time = new Date(dateStr).getTime()
  return Number.isNaN(time) ? 0 : time
}

function sortItems(items: NavItem[]): NavItem[] {
  return [...items].sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER
    if (orderA !== orderB) return orderA - orderB

    const priorityA = a.priority ?? 0
    const priorityB = b.priority ?? 0
    if (priorityA !== priorityB) return priorityB - priorityA

    const updateA = getTimeValue(a.updateTime)
    const updateB = getTimeValue(b.updateTime)
    if (updateA !== updateB) return updateB - updateA

    return a.title.localeCompare(b.title, 'zh-CN')
  })
}

export function mapItemsToSections(appData: AppDataSchema): SectionViewModel[] {
  const sortedItems = sortItems(appData.items)

  const sections = sortedItems.map((item, index) =>
    mapItemToViewModel(item, index, appData)
  )

  return sections.map((section, index, arr) => ({
    ...section,
    index,
    relations: {
      ...section.relations,
      previous: index > 0
        ? {
            id: arr[index - 1].id,
            title: arr[index - 1].title
          }
        : undefined,
      next: index < arr.length - 1
        ? {
            id: arr[index + 1].id,
            title: arr[index + 1].title
          }
        : undefined
    }
  }))
}