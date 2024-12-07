## [1.7.1](https://github.com/Noah-Ywh/lc-library/compare/v1.7.0...v1.7.1) (2024-12-07)

### 🐛Bug Fixes

* **Konva Input:** 更好的输入效果 ([7ff1cb6](https://github.com/Noah-Ywh/lc-library/commit/7ff1cb6ebb0eec81a1630957661c714bcec8efc1))

# [1.7.0](https://github.com/Noah-Ywh/lc-library/compare/v1.6.11...v1.7.0) (2024-12-05)

### ✨Features

* **lc-helpers:** 计算两个日期之间的天数 ([4e8ddd9](https://github.com/Noah-Ywh/lc-library/commit/4e8ddd9a0a3cc8208a0ffefe2561a6605b80c952))

### 🔨Code Refactoring

* **lc-helpers:** 重构 Input 类 ([00621ac](https://github.com/Noah-Ywh/lc-library/commit/00621ace7a6743a194a1948a449b61989f2dbc62))

### 🛠️Chore

* update deps ([9145701](https://github.com/Noah-Ywh/lc-library/commit/9145701b02501b33313e4dd9f88da203212dbd5c))
* update deps ([f632629](https://github.com/Noah-Ywh/lc-library/commit/f632629f212b245a2f0107c2344b7cf85018b551))

## [1.6.11](https://github.com/Noah-Ywh/lc-library/compare/v1.6.10...v1.6.11) (2024-10-19)

### 🐛Bug Fixes

* **Konva Slot:** 移除组件的同时移除挂载节点 ([d35ab1c](https://github.com/Noah-Ywh/lc-library/commit/d35ab1c862aaf4971fe3b2229a6cd90003e4f673))

## [1.6.10](https://github.com/Noah-Ywh/lc-library/compare/v1.6.9...v1.6.10) (2024-10-14)

### 🐛Bug Fixes

* **Konva Slot:** 提供 `update` 方法去手动更新组件 ([3f8fc1b](https://github.com/Noah-Ywh/lc-library/commit/3f8fc1b015d2750fa69588c0f934307f09b49c7a))

## [1.6.9](https://github.com/Noah-Ywh/lc-library/compare/v1.6.8...v1.6.9) (2024-10-10)

### 🐛Bug Fixes

* **Konva Slot:** 可传递 Vue 全局上下文到子组件 ([4bfde1f](https://github.com/Noah-Ywh/lc-library/commit/4bfde1f7a36b3b2772d04d1d48ee587581c4dc3f))

## [1.6.8](https://github.com/Noah-Ywh/lc-library/compare/v1.6.7...v1.6.8) (2024-10-10)

### 🔨Code Refactoring

* **Konva Slot:** 使用 `h` 替换 `createApp`，以避免创建新的 Vue 实例 ([9011017](https://github.com/Noah-Ywh/lc-library/commit/9011017fcbbbc3398ef3e0bd86eaa442941e4222))

### 🛠️Chore

* 更新依赖 ([e4edc78](https://github.com/Noah-Ywh/lc-library/commit/e4edc78efadc3e85092822f618a3198961990288))

## [1.6.5](https://github.com/Noah-Ywh/lc-library/compare/v1.6.4...v1.6.5) (2024-09-19)

### 🐛Bug Fixes

* **lc-helpers:** 区分 props 和 provide，保持 provide 的响应性 ([a5cac3b](https://github.com/Noah-Ywh/lc-library/commit/a5cac3bbadf02bdcf3d5cbe4ef28e7b2fb95a9ed))

## [1.6.4](https://github.com/Noah-Ywh/lc-library/compare/v1.6.3...v1.6.4) (2024-09-19)

### 🐛Bug Fixes

* **lc-helpers:** 正确传递当前 Konva Slot 所在位置 ([bf1dcf5](https://github.com/Noah-Ywh/lc-library/commit/bf1dcf502636c7ba0fc49d4bb4a0b8655a4091d2))

## [1.6.3](https://github.com/Noah-Ywh/lc-library/compare/v1.6.2...v1.6.3) (2024-09-18)

### 🐛Bug Fixes

* **Konva Slot:** 移动画布或图形时，正确设置坐标 ([d92072b](https://github.com/Noah-Ywh/lc-library/commit/d92072b197b3cd99edb5ff904a6837923ae6cf9a))

## [1.6.2](https://github.com/Noah-Ywh/lc-library/compare/v1.6.1...v1.6.2) (2024-09-18)

### 🐛Bug Fixes

* **Konva Slot:** 监听 wheel 事件并正确设置坐标 ([dab02a8](https://github.com/Noah-Ywh/lc-library/commit/dab02a8b4c48073c1312f6f68cc8bab38bebcf28))

# [1.6.0](https://github.com/Noah-Ywh/lc-library/compare/v1.5.0...v1.6.0) (2024-09-14)

### ✨Features

* **lc-helpers:** 新增基于 `Konva` 的 `Input`、`Slot` 类 ([75bd749](https://github.com/Noah-Ywh/lc-library/commit/75bd749e0784f35da2f0715f21473a123771684e))

### 🐛Bug Fixes

* **lc-helpers:** 单独导出 konva 相关类 ([6ce4443](https://github.com/Noah-Ywh/lc-library/commit/6ce444384ab08966da9ea047d9f78356c01b208d))
* **lc-helpers:** 处理入参的边界情况 ([e715fbd](https://github.com/Noah-Ywh/lc-library/commit/e715fbd2f2910dbfe81f17e0464cf7c6ea803a6c))
* **lc-helpers:** 约束入参类型 ([5ff58a3](https://github.com/Noah-Ywh/lc-library/commit/5ff58a31562e60022cf6a3bf01a11f360def50d5))

### ⚡Performance Improvements

* **lc-helpers:** 代码优化 ([19bfa48](https://github.com/Noah-Ywh/lc-library/commit/19bfa48e3ef8284b31158bdee652c88831547a07))

### 🛠️Chore

* **eslint:** eslint 更新至 v9 ([2913654](https://github.com/Noah-Ywh/lc-library/commit/2913654ccc6923f24e3b2056c03eaec1e97317e2))
* **package:** update deps ([d203673](https://github.com/Noah-Ywh/lc-library/commit/d20367378a8231e4576f9004644107faf48ed954))
* **package:** 新增 konva ([79b730d](https://github.com/Noah-Ywh/lc-library/commit/79b730df7ad0a1a5fce692e643899fda7f12d801))
* **package:** 更新依赖 ([5986025](https://github.com/Noah-Ywh/lc-library/commit/598602578bf901c0d4332f55f148131862f48cb7))
* update deps ([bb2d8da](https://github.com/Noah-Ywh/lc-library/commit/bb2d8dabfa8f99fa79c578bff339bc7c508ff907))
* 更新描述 ([7988feb](https://github.com/Noah-Ywh/lc-library/commit/7988feb10e3b06d7689a150458587e156ab5f4b8))
* 更新配置 ([a310330](https://github.com/Noah-Ywh/lc-library/commit/a310330642435973d6eea57ccec1228455f64127))

### 🏗️Build System

* 不再创建 `.map` 文件 ([3cb228b](https://github.com/Noah-Ywh/lc-library/commit/3cb228be0cd25b1229421ff8b6269d2156036551))

# [1.5.0](https://github.com/Noah-Ywh/lc-library/compare/v1.4.0...v1.5.0) (2024-05-15)

### ✨Features

* **lc-helpers:** 新增多个通用函数 ([c2d1c95](https://github.com/Noah-Ywh/lc-library/commit/c2d1c952e3bb8488f4decd2975a4fcde08cb9af8))

### ⚡Performance Improvements

* **lc-helpers:** 删除无用函数 ([4a8774c](https://github.com/Noah-Ywh/lc-library/commit/4a8774c3dfcd9bbb2eacb32de41e35cac94f9b64))

# [1.4.0](https://github.com/Noah-Ywh/lc-library/compare/v1.3.1...v1.4.0) (2024-04-30)

### ✨Features

* **useObserveSizeChange:** 新增 `useObserveSizeChange` 函数，监听一个元素的布局属性变化并调用回调 ([dafd735](https://github.com/Noah-Ywh/lc-library/commit/dafd735843b42da2d5c392267b9c0c50c7204a10))

### 🐛Bug Fixes

* **lc-helpers:** 修复部分函数未导出 ([4c270fe](https://github.com/Noah-Ywh/lc-library/commit/4c270fee9bf99d2c8646e2eb3aaba8e37b75982d))

### 🔨Code Refactoring

* **useTryCatch:** `tryCatch` 重命名为 `useTryCatch` ([58e4825](https://github.com/Noah-Ywh/lc-library/commit/58e4825a1b586a06498c6b2bed5a519602c21ca4))

## [1.3.1](https://github.com/Noah-Ywh/lc-library/compare/v1.3.0...v1.3.1) (2024-04-23)

### 🐛Bug Fixes

* 优化 html 类名的命名标准 ([a46dcd3](https://github.com/Noah-Ywh/lc-library/commit/a46dcd3f49a4e379da51cf1bb589d0cd3005434b))

# [1.3.0](https://github.com/Noah-Ywh/lc-library/compare/v1.2.0...v1.3.0) (2024-04-22)

### ✨Features

* 新增 `tryCatch` 用于简化 `try catch` 写法 ([86b987a](https://github.com/Noah-Ywh/lc-library/commit/86b987a4c39bd9a9c6ff8776d94ee4d30608e7a8))

# [1.0.0](https://github.com/Noah-Ywh/lc-library/compare/9a7a82cbf946e9a1d2a0382dd09f78a4f239a321...v1.0.0) (2024-04-07)

### ✨Features

* first commit ([9a7a82c](https://github.com/Noah-Ywh/lc-library/commit/9a7a82cbf946e9a1d2a0382dd09f78a4f239a321))

