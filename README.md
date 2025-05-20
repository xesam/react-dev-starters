# React.js startup boilerplate

## vite-tanstack

[./vite-tanstack/](./vite-tanstack/)

- React.js
- vite
- @tanstack/react-query
- @tanstack/react-router
- tailwindcss 4
- zustand
- zod
- react-hook-form
- vconsole

### 说明

- 使用 `vite-tsconfig-paths` 配置 `tsconfig.json` 的 `paths` ，默认为 `@`，配置文件 [./vite.config.ts](./vite.config.ts);
- 在 `import.meta.env.DEV` 为 `true` 时，启用 `@tanstack/router-devtools`，配置文件 [`./src/routes/__root.tsx`](./src/routes/__root.tsx);
- 使用 [./.prettierignore](./.prettierignore) 配置 `prettier` 排除文件（默认排除 `routeTree.gen.ts`）;
- 使用 `cross-env` 配置跨平台的环境变量，项目中建议使用 `vite` 自带的环境变量配置，`cross-env`用来给其他命令提供环境变量，注意，只有 `VITE_` 开头的环境变量才能被
  `vite` 自动注入并暴露给客户端，因此，不要使用 `VITE_` 开头的环境变量存储敏感信息。示例可以参见 `dev:stage` 命令;
- 使用 `zustand` 配置状态管理，配置文件 [`./src/store/index.ts`](./src/store/index.ts);
- 使用 `vconsole` 配置移动端调试工具;
- 使用 `react-hook-form` + `zod`+`tanstack query` 配置数据验证进行登录;
- 使用 `tanstack router` 的文件模式配置路由，同时进行权限守卫[./src/routes/\_protected.tsx](./src/routes/_protected.tsx);
