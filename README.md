# 食品安全守护者｜30秒竖屏短视频

## 成片

最终成片规格：1080×1920、30 fps、900帧、30.016秒，H.264 + AAC。仓库保存可复现的源工程；MP4 成片作为独立交付物保存，避免把生成视频长期写入 Git 历史。

本版包含电影化工业环境音、字幕与全部画面动效。沉稳中文男声旁白脚本已保存在 `content/voiceover.txt`，因当前受限运行环境无法下载本地中文语音模型，未烧录进本次MP4；后续可在 HeyGen 中按该脚本直接配音并替换音轨。

## 工程结构

- `index.html`：HyperFrames HTML/GSAP合成源文件。
- `DESIGN.md`：视觉识别与动效规范。
- `remotion/`：Remotion React/TypeScript镜像工程。
- `content/captions.json`：Remotion Caption结构字幕数据。
- `content/voiceover.txt`：中文男声旁白文案。
- `subtitles.srt`：可直接上传平台的字幕文件。
- `stills/contact-sheet.png`：关键帧检查图。
- `output/verification.txt`：媒体与布局验证结果。

## 获取成片

MP4、源工程压缩包与关键帧预览已在 ChatGPT 任务交付中提供。长期通过 GitHub 分发成片时，建议使用 GitHub Releases；持续维护大量视频素材时建议启用 Git LFS。

## Remotion

```bash
cd remotion
npm install
npm run studio
npm run render
```

## HyperFrames

```bash
npm install
npx hyperframes lint .
npx hyperframes check .
npx hyperframes preview
```

## HeyGen配音建议

- 声线：沉稳、克制、有力量的中文男声。
- 语速：0.94–0.98倍。
- 情绪转折：0–18秒保持压迫克制；18秒“停线”后逐步坚定上扬；片尾使命语放慢。
- 混音：旁白峰值高于音乐约6–8 dB；停线按钮前保留0.2秒抽空。
