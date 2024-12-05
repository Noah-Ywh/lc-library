<script setup lang="ts">
import { useDateGetNowYMD, useDateGetOffsetDate, useDateCalculateDays } from '@noahyu/lc-helpers'
const { year, month, monthLabel, day, dayLabel, yearMonth, date } = useDateGetNowYMD()
const offset = 2
const {
  year: yearO,
  month: monthO,
  monthLabel: monthLabelO,
  day: dayO,
  dayLabel: dayLabelO,
  yearMonth: yearMonthO,
  date: dateO,
} = useDateGetOffsetDate(date, offset)
const diffDays= useDateCalculateDays('2024-04-06', '2027-06-27')
</script>

# 日期

```ts
import { useDateGetNowYMD, useDateGetOffsetDate, useDateCalculateDays } from '@noahyu/lc-helpers'
```

## 获取今日日期

```ts
const { year, month, monthLabel, day, dayLabel, yearMonth, date } = useDateGetNowYMD()
```

year: -> {{year}}  
month -> {{month}}  
monthLabel -> {{monthLabel}}  
day -> {{day}}  
dayLabel -> {{dayLabel}}  
yearMonth -> {{yearMonth}}  
date -> {{date}}

## 获取偏移日期

```ts
/**
 * @Describe 给定一个日期，并获取在这之前或之后的日期
 * @param { string } date `'YYYY-MM' | 'YYYY-MM-DD'`
 * @param { number } offset 偏移量
 */
const { date: dateNow } = useDateGetNowYMD()
const offset = 2
const { year, month, monthLabel, day, dayLabel, yearMonth, date } = useDateGetOffsetDate(
  dateNow,
  offset,
)
```

year: -> {{yearO}}  
month -> {{monthO}}  
monthLabel -> {{monthLabelO}}  
day -> {{dayO}}  
dayLabel -> {{dayLabelO}}  
yearMonth -> {{yearMonthO}}  
date -> {{dateO}}

## 计算两个日期之间的天数

```ts
/**
 * @Describe 计算两个日期之间的天数
 * @param { string } startDate `'YYYY-MM-DD'`
 * @param { string } endDate `'YYYY-MM-DD'`
 */
const diffDays = useDateCalculateDays('2024-04-06', '2027-06-27')
```

diffDays: -> {{diffDays}}
