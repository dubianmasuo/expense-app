
# 报销合规助手 Expense Compliance Assistant

一个基于 Next.js、React 和 TypeScript 构建的前端业务应用，用于帮助用户整理报销票据、配置报销规则、自动识别不合规票据，并在预算限制下生成推荐提交结果。

## 在线体验

Live Demo：https://expense-app-phi-orpin.vercel.app/ 
Source Code：https://github.com/dubianmasuo/expense-app

---

## 项目简介

在实际报销场景中，用户经常需要面对多张零散票据、不同报销类别、单张金额上限、日期范围限制以及总预算额度等规则。

本项目模拟了一个轻量级的报销合规系统，用户可以录入、编辑和删除票据，并通过可配置的报销规则实时查看：

- 哪些票据符合报销规则
- 哪些票据不合规以及具体原因
- 在当前预算限制下，系统推荐提交哪些票据
- 规则变化后，票据状态和推荐结果如何动态联动

项目重点不在于简单展示静态页面，而是实现一个具有真实业务逻辑的前端应用原型。

---

## 核心功能

### 票据管理

- 新增票据
- 编辑票据
- 删除票据
- 查看全部票据
- 显示每张票据的当前状态

票据字段包括：

- 发票编号
- 日期
- 金额
- 类别
- 商家
- 说明

---

### 报销规则配置

用户可以在工作台页面配置：

- 报销总限额
- 单张票据金额上限
- 可报销开始日期
- 可报销结束日期
- 允许报销类别

规则修改后，系统会自动重新计算所有票据状态和推荐结果。

---

### 自动合规校验

系统会根据当前规则判断每张票据是否合规，并给出原因。

当前支持的校验规则包括：

- 缺少发票编号
- 缺少日期
- 金额无效
- 类别不允许报销
- 超过单张报销上限
- 不在可报销日期范围内
- 发票编号重复

---

### 推荐提交结果

系统会基于当前合规票据和预算上限，生成推荐提交组合。

结果页会展示：

- 推荐提交票据
- 合规但未纳入本次推荐的票据
- 不合规票据及原因
- 推荐金额
- 剩余额度
- 合规票据数
- 不合规票据数

---

### 本地持久化

项目使用 `localStorage` 保存票据数据和规则配置。

刷新页面后，用户之前录入和修改的数据仍会保留。

---

## 页面结构

项目包含 4 个主要页面：

```txt
/
首页，展示产品介绍和功能入口

/dashboard
工作台，配置报销规则并查看统计数据

/invoices
票据录入页，支持新增、编辑、删除和查看票据

/results
推荐结果页，展示推荐提交、不合规票据和结果统计
````

---

## 技术栈

* Next.js
* React
* TypeScript
* Tailwind CSS
* Context API
* localStorage
* Vercel

---

## 技术亮点

### 1. 使用 Next.js App Router 构建多页面应用

项目使用 Next.js 的文件系统路由组织页面结构，实现首页、工作台、票据录入页和推荐结果页。

---

### 2. 使用 TypeScript 定义业务数据模型

项目通过 TypeScript 定义了票据和报销规则的数据结构，包括：

* `Invoice`
* `RuleConfig`
* `InvoiceCategory`

这提高了代码的可维护性，并减少了字段传递错误。

---

### 3. 使用 Context API 管理跨页面共享状态

票据数据、报销规则、校验结果和推荐结果统一由 `ExpenseProvider` 管理。

多个页面通过同一个 Context 读取共享状态，从而实现跨页面联动。

---

### 4. 使用受控表单实现票据 CRUD

票据表单使用 React state 管理输入值，支持：

* 新增模式
* 编辑模式
* 表单回填
* 保存修改
* 取消编辑

---

### 5. 实现动态合规校验逻辑

项目将校验逻辑封装为独立函数 `validateInvoices`，根据当前规则动态判断票据状态，并返回对应的不合规原因。

---

### 6. 实现预算限制下的推荐逻辑

项目将推荐逻辑封装为独立函数 `recommendInvoices`，在合规票据中生成不超过预算上限的推荐提交组合。

---

### 7. 使用 localStorage 实现前端持久化

项目通过浏览器 `localStorage` 保存票据数据和规则配置，并处理了 Next.js 中服务端渲染与客户端存储可能导致的 hydration mismatch 问题。

---

## 项目结构

```txt
expense-app/
├─ app/
│  ├─ page.tsx
│  ├─ dashboard/
│  │  └─ page.tsx
│  ├─ invoices/
│  │  └─ page.tsx
│  ├─ results/
│  │  └─ page.tsx
│  ├─ layout.tsx
│  └─ globals.css
│
├─ components/
│  ├─ invoice-form.tsx
│  ├─ invoice-table.tsx
│  ├─ result-section.tsx
│  ├─ rule-panel.tsx
│  └─ summary-cards.tsx
│
├─ context/
│  └─ expense-context.tsx
│
├─ lib/
│  ├─ mock-data.ts
│  ├─ recommend.ts
│  └─ validate.ts
│
├─ types/
│  └─ index.ts
│
├─ package.json
└─ README.md
```

---

## 本地运行

### 1. 克隆项目

```bash
git clone 你的 GitHub 仓库链接
```

### 2. 进入项目目录

```bash
cd expense-app
```

### 3. 安装依赖

```bash
npm install
```

### 4. 启动开发服务器

```bash
npm run dev
```

### 5. 打开浏览器

```txt
http://localhost:3000
```

---

## 主要业务逻辑说明

### 合规校验

校验函数接收票据列表和规则配置：

```ts
validateInvoices(invoices, rules)
```

返回每张票据的校验结果：

```ts
{
  invoiceId: string;
  isValid: boolean;
  reasons: string[];
}
```

系统根据这些结果在页面中展示合规状态和不合规原因。

---

### 推荐逻辑

推荐函数接收合规票据和预算上限：

```ts
recommendInvoices(validInvoices, budgetLimit)
```

返回：

```ts
{
  selected: Invoice[];
  validButUnselected: Invoice[];
  totalSelectedAmount: number;
  remainingBudget: number;
}
```

当前版本使用 0/1 背包算法，在合规票据中寻找不超过预算且尽量接近预算上限的推荐组合。

---

## 数据存储说明

本项目目前没有接入后端数据库，数据存储在浏览器的 `localStorage` 中。

这意味着：

* 每个用户的数据保存在自己的浏览器里
* 刷新页面后数据仍会保留
* 更换浏览器或设备后不会自动同步数据
* 清除浏览器缓存可能会删除本地数据

---

## 当前限制

* 当前推荐算法使用贪心策略，不保证全局最优组合
* 暂未接入后端数据库
* 暂未支持用户登录
* 暂未支持发票图片上传和 OCR 识别
* 暂未支持导出报销清单

---

## 未来优化方向

* 将推荐算法升级为 0/1 背包算法
* 支持 CSV / Excel 导入和导出
* 支持发票图片上传和 OCR 识别
* 接入数据库，实现多设备数据同步
* 增加用户登录和权限管理
* 增加操作日志和审计记录
* 增加 Toast 提示和更完善的表单校验
* 优化移动端适配
* 增加暗色模式

---

## 项目总结

这个项目模拟了一个真实业务场景下的前端应用，从需求拆解、页面设计、状态管理、业务规则校验到在线部署，覆盖了现代前端开发中的多个核心能力。

项目重点体现了：

* React 状态驱动 UI 的开发方式
* TypeScript 在业务建模中的作用
* 前端组件化和页面分层设计
* 多页面共享状态管理
* 规则驱动的动态业务计算
* 本地持久化和部署上线流程

````
