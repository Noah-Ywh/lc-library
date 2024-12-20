export interface FormattedDate {
  year: number
  month: number
  monthLabel: string
  day?: number
  dayLabel?: string
  yearMonth: string
  date: string
}

/**
 * @Describe 获取今日日期
 */
export function useDateGetNowYMD(): Required<FormattedDate> {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const monthLabel = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate()
  const dayLabel = date.getDate().toString().padStart(2, '0')

  return {
    year,
    month,
    monthLabel,
    day,
    dayLabel,
    yearMonth: `${year}-${monthLabel}`,
    date: `${year}-${monthLabel}-${dayLabel}`,
  }
}

/**
 * @Describe 给定一个日期，并获取在这之前或之后的日期
 * @param { string } date `'YYYY-MM' | 'YYYY-MM-DD'`
 * @param { number } offset 偏移量
 */
export function useDateGetOffsetDate(date: string, offset: number): FormattedDate {
  const formatYYYMM = /^\d{4}-\d{2}$/
  const formatYYYMMDD = /^\d{4}-\d{2}-\d{2}$/

  const assignDate = new Date(date)

  if (formatYYYMM.test(date)) {
    assignDate.setMonth(assignDate.getMonth() + offset)

    const year = assignDate.getFullYear()
    const month = assignDate.getMonth() + 1
    const monthLabel = (assignDate.getMonth() + 1).toString().padStart(2, '0')

    return {
      year,
      month,
      monthLabel,
      yearMonth: `${year}-${monthLabel}`,
      date: `${year}-${monthLabel}`,
    }
  } else if (formatYYYMMDD.test(date)) {
    assignDate.setDate(assignDate.getDate() + offset)

    const year = assignDate.getFullYear()
    const month = assignDate.getMonth() + 1
    const monthLabel = (assignDate.getMonth() + 1).toString().padStart(2, '0')
    const day = assignDate.getDate()
    const dayLabel = assignDate.getDate().toString().padStart(2, '0')

    return {
      year,
      month,
      monthLabel,
      day,
      dayLabel,
      yearMonth: `${year}-${monthLabel}`,
      date: `${year}-${monthLabel}-${dayLabel}`,
    }
  }
  console.error(`[lc-helpers] 日期格式不正确：${date} (YYYY-MM-DD 或 YYYY-MM)`)
  return {
    year: 0,
    month: 0,
    monthLabel: '',
    yearMonth: '',
    date: '',
  }
}

/**
 * @Describe 计算两个日期之间的天数
 * @param { string } startDate `'YYYY-MM-DD'`
 * @param { string } endDate `'YYYY-MM-DD'`
 */
export function useDateCalculateDays(startDate: string, endDate: string) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = end.getTime() - start.getTime()
  const diffDays = diffTime / (1000 * 60 * 60 * 24)
  return diffDays
}
