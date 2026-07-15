# 补齐 Remotion 渲染依赖

请将此包中的两个文件上传到仓库根目录：

- `.gitignore`
- `remotion/public/cinematic-bed.wav`

上传后，进入 `remotion` 目录执行：

```bash
npm install
npm run typecheck
npm run render
```

背景音乐从已验证的 30 秒最终成片中提取，长度为 30.016 秒、48 kHz 双声道，与视频时长匹配。
