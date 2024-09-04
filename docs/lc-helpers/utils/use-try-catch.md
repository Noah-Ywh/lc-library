# TryCatch

```ts
import { useTryCatch } from '@noahyu/lc-helpers'
```

## 包装一个异步请求

```ts
const [data, err] = await useTryCatch<{ name: string }>(
  http.get({
    url: 'https://example.com/user',
  }),
)
```
