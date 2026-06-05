# Zanbo Growth Lab

个人博客站点，使用 Hugo + Decap CMS + Netlify 构建。

## 技术栈

- **Hugo** - 静态站点生成器
- **PaperMod** - 博客主题
- **Decap CMS** - Git-based 内容管理后台
- **Netlify** - 托管与自动部署
- **Giscus** - 评论系统（基于 GitHub Discussions）

## 快速开始

### 本地开发

```bash
# 安装 Hugo
brew install hugo

# 克隆仓库并进入目录
git clone https://github.com/datazhanbo/zanbo-growth-lab.git
cd zanbo-growth-lab

# 安装主题（如果子模块未初始化）
git submodule update --init --recursive

# 启动本地服务器
hugo server -D
```

访问: http://localhost:1313

### 内容管理后台 开启identity 和 git gateway

部署后访问: `https://zanbo-growth-lab.netlify.app/admin`

## 项目结构

```
zanbo-growth-lab/
├── archetypes/          # 内容模板
├── content/             # 内容目录
│   ├── posts/           # 博客文章
│   ├── _index.md        # 首页
│   └── about.md         # 关于页面
├── static/              # 静态资源
│   ├── admin/           # Decap CMS
│   └── images/          # 图片资源
├── themes/              # Hugo 主题
├── config.toml          # Hugo 配置
├── netlify.toml         # Netlify 配置
└── SETUP.md             # 详细部署指南
```

## 部署

详细部署步骤请参考 [SETUP.md](./SETUP.md)。

## 功能特性

- ✅ 响应式设计，支持暗黑模式
- ✅ 可视化内容管理后台 (`/admin`)
- ✅ Git 驱动，版本控制完整记录
- ✅ GitHub 提交自动部署
- ✅ 文章分类、标签管理
- ✅ 目录导航、阅读时间统计
- ✅ 评论系统（Giscus）
- ✅ RSS 订阅

## 发布内容

### 通过 CMS

1. 访问 `/admin`
2. 登录账号
3. 创建或编辑文章
4. 保存后自动部署

### 通过 Git

```bash
# 创建新文章
hugo new posts/article-title.md
# 正确：生成 posts/文章名/index.md（自动创建文件夹 转载图片 使用相对路径引用） 
hugo new posts/2026-05-07-my-first-post/index.md

# 清理缓存
rm -rf public/ resources/ 
hugo

# 编辑内容后提交
git add .
git commit -m "New post: article title"
git push
```

## License

MIT
