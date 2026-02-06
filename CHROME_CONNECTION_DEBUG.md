# Chrome 扩展连接问题诊断

## 问题描述

Chrome 扩展显示 "Service Not Started"，即使 HTTP 服务器已经在运行。

## 原因分析

Chrome 扩展的架构：
```
Chrome 扩展 → Native Messaging Host → HTTP 服务器
```

问题：
1. Chrome 扩展通过 Native Messaging 与主机通信
2. Native Messaging Host 应该启动 HTTP 服务器
3. 但 Native Messaging Host 进程启动后立即退出
4. 导致 HTTP 服务器没有启动

## 当前状态

- ✅ HTTP 服务器手动启动成功（http://127.0.0.1:12306）
- ✅ MCP 连接测试成功
- ❌ Chrome 扩展无法连接到 Native Messaging Host
- ❌ Native Messaging Host 无法启动 HTTP 服务器

## 解决方案

### 方案 1：手动启动 HTTP 服务器 + 修改扩展配置（推荐）

由于 Native Messaging Host 有问题，我们可以：

1. **手动启动 HTTP 服务器**（已完成）
   ```cmd
   cd /d C:\Projects\Com_Projects\HuoShan\mcp-chrome\app\native-server\dist
   node start-http-server.js
   ```

2. **修改 Chrome 扩展配置**
   - 在扩展的设置中，将端口设置为 12306
   - 点击 "Connect" 按钮

3. **验证连接**
   - 扩展应该显示 "Connected"
   - 如果仍然显示 "Service Not Started"，说明扩展仍在检查 Native Messaging Host

### 方案 2：调试 Native Messaging Host

问题可能是：
1. Native Messaging Host 进程在启动时出错
2. 数据库初始化失败
3. 依赖加载问题

**调试步骤**：

1. **查看 Chrome 扩展的 Service Worker 日志**
   - 访问 `chrome://extensions/`
   - 找到 "Chrome MCP Server" 扩展
   - 点击 "Service Worker" 链接
   - 查看控制台输出

2. **查看 Native Messaging Host 日志**
   - 日志位置：`C:\Users\v-xuzhihao\AppData\Local\mcp-chrome-bridge\logs\`
   - 查看最新的日志文件

3. **手动测试 Native Messaging Host**
   ```cmd
   cd /d C:\Projects\Com_Projects\HuoShan\mcp-chrome\app\native-server\dist
   node index.js
   ```
   - 这会启动 Native Messaging Host
   - 它会等待来自 Chrome 的输入
   - 按 Ctrl+C 停止

### 方案 3：使用 Claude Code 直接连接（最简单）

由于 HTTP 服务器已经在运行，Claude Code 可以直接连接：

1. **确保 HTTP 服务器正在运行**
   ```cmd
   curl http://127.0.0.1:12306/ping
   ```
   应该返回：`{"status":"ok","message":"pong"}`

2. **在 Claude Code 中使用**
   - 打开 `huoshan_agent` 项目
   - Claude Code 会自动检测 `.mcp.json` 配置
   - 尝试使用 Chrome 工具

3. **测试连接**
   ```
   请帮我列出当前打开的所有浏览器标签页
   ```

## 关键问题

**Chrome 扩展为什么需要连接？**

Chrome 扩展的作用：
1. 提供浏览器 API 访问（标签页、历史、书签等）
2. 通过 Native Messaging 与 HTTP 服务器通信
3. 执行浏览器操作（截图、点击、填充表单等）

**如果 Chrome 扩展没有连接会怎样？**

- Claude Code 可以连接到 HTTP 服务器
- 但 HTTP 服务器无法访问浏览器 API
- 所有 Chrome 工具都无法工作

## 下一步

### 立即尝试

1. **在 Chrome 扩展中**
   - 点击扩展图标
   - 查看显示的状态
   - 记录任何错误信息

2. **在 Chrome DevTools 中**
   - 打开 `chrome://extensions/`
   - 点击 "Service Worker" 链接
   - 查看控制台输出
   - 截图或复制错误信息

3. **告诉我**
   - Chrome 扩展显示什么状态？
   - Service Worker 控制台有什么错误？
   - 是否有任何日志文件？

这样我可以更准确地诊断问题。

---

**诊断时间**: 2026-02-02
**HTTP 服务器状态**: ✅ 运行中
**Chrome 扩展状态**: ❌ 未连接
