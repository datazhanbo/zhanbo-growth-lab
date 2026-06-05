# 站点部署指南

本文档指导你完成站点的完整部署和配置过程。

---

## 目录

1. [前置准备](#前置准备)
2. [安装 Hugo](#安装-hugo)
3. [推送代码到 GitHub](#推送代码到-github)
4. [Netlify 部署配置](#netlify-部署配置)
5. [Decap CMS 配置](#decap-cms-配置)
6. [Giscus 评论系统配置](#giscus-评论系统配置)
7. [日常使用指南](#日常使用指南)

---

## 前置准备

确保你有以下账号：
- [ ] GitHub 账号 (已有仓库: https://github.com/datazhanbo/zanbo-growth-lab)
- [ ] Netlify 账号 (https://www.netlify.com)

---

## 安装 Hugo

在本地开发需要安装 Hugo：

**macOS:**
```bash
brew install hugo
```

**验证安装:**
```bash
hugo version
```

**本地启动站点:**
```bash
cd /Users/hezan/Documents/netlify/zanbo-growth-lab
hugo server -D
```

访问: http://localhost:1313

---

## 推送代码到 GitHub

### 1. 安装 PaperMod 主题

由于网络原因，主题子模块可能没有成功下载，手动安装：

```bash
cd /Users/hezan/Documents/netlify/zanbo-growth-lab

# 如果子模块添加失败，手动下载主题
git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod

# 如果还是失败，直接下载 ZIP 解压到 themes/PaperMod
```

### 2. 设置远程仓库

```bash
cd /Users/hezan/Documents/netlify/zanbo-growth-lab

# 添加远程仓库
git remote add origin https://github.com/datazhanbo/zanbo-growth-lab.git

# 切换到 main 分支
git checkout -b main

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Hugo + Decap CMS site"

# 推送到 GitHub
git push -u origin main
```

---

## Netlify 部署配置

### 1. 新建站点

1. 登录 Netlify: https://app.netlify.com
2. 点击 **"Add new site"** → **"Import an existing project"**
3. 选择 **"GitHub"**
4. 授权 Netlify 访问你的 GitHub 仓库
5. 选择 `zanbo-growth-lab` 仓库

### 2. 部署设置

Netlify 会自动读取项目中的 `netlify.toml` 配置文件，确认以下设置：

- **Branch to deploy:** `main`
- **Build command:** `hugo --gc --minify`
- **Publish directory:** `public`

点击 **"Deploy site"** 开始部署。

### 3. 等待部署完成

第一次部署大约需要 1-2 分钟。部署成功后，你会获得一个 Netlify 子域名，例如：
`https://xxx-xxx-xxx.netlify.app`

### 4. (可选) 修改站点名称

1. 进入站点设置 → **"Site details"**
2. 点击 **"Change site name"**
3. 设置为: `zanbo-growth-lab`
4. 保存后站点地址变为: `https://zanbo-growth-lab.netlify.app`

---

## Decap CMS 配置 （pass）

### 1. 启用 Netlify Identity

1. 进入 Netlify 站点后台 → **"Integrations"**
2. 搜索 **"Identity"**
3. 点击 **"Enable"** 启用 Netlify Identity

### 2. 配置 Identity 设置

1. 进入 **"Site settings"** → **"Identity"**
   - **Registration:** 选择 **"Invite only"**（推荐，只允许邀请的用户注册）
   - **Email templates:** 可以自定义邀请邮件模板

### 3. 启用 Git Gateway

1. 在 Identity 设置页面找到 **"Services"** → **"Git Gateway"**
2. 点击 **"Enable Git Gateway"**
3. 这将允许 CMS 直接通过 GitHub API 读写内容

### 4. 邀请 CMS 用户

1. 进入 **"Identity"** 标签页
2. 点击 **"Invite users"**
3. 输入你的邮箱地址
4. 点击 **"Send"** 发送邀请邮件
5. 查收邮件，点击邀请链接设置密码

### 5. 测试 CMS 访问

1. 访问: `https://zanbo-growth-lab.netlify.app/admin`
2. 使用你设置的账号登录
3. 应该能看到 Decap CMS 的管理界面
4. 尝试编辑或创建一篇文章，保存后会自动触发部署

---

## Giscus 评论系统配置（pass）

### 1. 准备工作

Giscus 使用 GitHub Discussions 作为评论数据库，需要：

1. 仓库是 **Public** 的
2. 已安装 **Giscus App**
3. 已启用 **Discussions** 功能

### 2. 启用 GitHub Discussions

1. 进入仓库: https://github.com/datazhanbo/zanbo-growth-lab
2. 点击 **"Settings"**
3. 在 **"Features"** 部分找到 **"Discussions"**
4. 勾选启用 Discussions

### 3. 安装 Giscus App

1. 访问: https://github.com/apps/giscus
2. 点击 **"Install"**
3. 选择 `zanbo-growth-lab` 仓库
4. 完成安装

### 4. 获取配置参数

1. 访问: https://giscus.app/zh-CN
2. 填写以下信息：
   - **仓库:** `datazhanbo/zanbo-growth-lab`
   - **Discussion 分类:** `Announcements` (或其他你想使用的分类)
   - **页面 ↔️ Discussion 映射:** `pathname`
   - **Discussion 标题格式:** `Discussion title`

3. 点击 **"启用 giscus"** 后会生成配置代码，提取以下参数：
   - `data-repo-id` → 填入 `repoId`
   - `data-category-id` → 填入 `categoryId`

### 5. 更新站点配置

编辑 `config.toml` 文件中的 Giscus 配置：

```toml
[params.giscus]
  enable = true  # 设置为 true
  repo = "datazhanbo/zanbo-growth-lab"
  repoId = "R_xxxxx"           # 从 giscus.app 获取
  category = "Announcements"
  categoryId = "DIC_xxxxx"     # 从 giscus.app 获取
  mapping = "pathname"
  strict = "0"
  reactionsEnabled = "1"
  emitMetadata = "0"
  inputPosition = "bottom"
  theme = "light"
  lang = "zh-CN"
  loading = "lazy"
```

提交更改后 Netlify 会自动重新部署。

---

## 日常使用指南

### 发布新文章

**方式一：通过 CMS (弃用)**
1. 访问: `https://zanbo-growth-lab.netlify.app/admin`
2. 登录后点击 **"新建文章"**
3. 填写标题、内容、标签、分类等
4. 点击 **"保存"** → 自动触发部署

**方式二：本地编写**
```bash
# 创建新文章 （default header)
hugo new posts/my-new-post.md

# 编辑内容 - cursor或者obsidian
vim content/posts/my-new-post.md

# 创建新文章  tags - tools methodoloyg application solution product etc. 
hugo new posts/article-title.md
# 正确：生成 posts/文章名/index.md（自动创建文件夹 转载图片 使用相对路径引用） 
hugo new posts/2026-05-07-my-first-post/index.md

# 清理缓存
rm -rf public/ resources/ 
<<<<<<< HEAD
hugo

# 编辑内容后提交
=======
hugo  

# 本地预览效果， 周期性的发布到site即可（300credits尽量留给流量端）
hugo server

# 编辑内容后提交   周期性的发布即可
>>>>>>> 6757040 (test)
git add .
git commit -m "New post: article title"
git push

# 将 draft: true 改为 draft: false

# 提交并推送
git config --global --unset http.proxy 
git config --global --unset https.proxy 
git config --global --unset http.https://github.com.proxy
git config --global http.proxy socks5://127.0.0.1:7890
git config --global https.proxy socks5://127.0.0.1:7890


git add .
git commit -m "New post: my-new-post"
git push origin main
```

### 管理内容

在 CMS 后台可以：
- 创建/编辑/删除文章
- 上传图片
- 编辑独立页面（关于页等）
- 配置首页内容

### 查看部署状态

1. 登录 Netlify 后台
2. 进入 `zanbo-growth-lab` 站点 https://zanbo.netlify.app
3. 在 **"Deploys"** 标签页查看部署历史
4. 每次提交到 `main` 分支都会自动触发部署

---

## 故障排查

### CMS 无法登录

- 确认已启用 Netlify Identity
- 确认已启用 Git Gateway
- 确认用户已接受邀请

### 部署失败

- 检查构建日志中的错误信息
- 确认 `netlify.toml` 配置正确
- 确认主题已正确安装

### 评论不显示

- 确认 Giscus 配置参数正确
- 确认仓库是 Public 的
- 确认 Giscus App 已安装

---

## 下一步优化建议

- [ ] 配置自定义域名
- [ ] 配置 SSL 证书（Netlify 自动提供）
- [ ] 添加 Google Analytics
- [ ] 配置站点搜索功能
- [ ] 添加更多社交链接图标

---

**恭喜！你的个人站点已经搭建完成！** 🎉
