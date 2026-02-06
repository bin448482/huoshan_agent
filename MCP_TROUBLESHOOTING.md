# MCP Chrome 服务器连接问题诊断

## 问题分析

Chrome 扩展显示 "Service Not Connected"，这意味着扩展无法与 MCP 服务器建立连接。

## 🔍 根本原因

MCP Chrome 服务器使用 **Native Messaging** 与 Chrome 扩展通信，而不是 HTTP。这是一个特殊的 Chrome 扩展通信机制。

## ✅ 解决方案

### 方案 1：使用 Native Messaging（推荐）

MCP 服务器应该通过 Native Messaging 运行。这已经注册在 Chrome 中。

**步骤**:

1. **确保 Chrome 扩展已加载**
   - 访问 `chrome://extensions/`
   - 确保 "Chrome MCP Server" 扩展已启用

2. **在 Chrome 扩展中点击 "Connect"**
   - 点击 Chrome 工具栏中的扩展图标
   - 点击 "Connect" 按钮
   - Chrome 会自动启动 Native Messaging 主机

3. **等待连接建立**
   - 第一次连接可能需要几秒钟
   - 应该看到 "Connected" 状态

### 方案 2：使用 HTTP 连接（备选）

如果 Native Messaging 不工作，可以使用 HTTP 连接。

**步骤**:

1. **启动 HTTP 服务器**
   ```bash
   node "C:\Projects\Com_Projects\HuoShan\mcp-chrome\app\native-server\dist\index.js"
   ```

2. **在 Chrome 扩展中配置 HTTP 连接**
   - 点击扩展图标
   - 查看是否有设置选项
   - 配置服务器地址：`http://127.0.0.1:12306`

## 🔧 故障排除步骤

### 步骤 1：验证 Native Messaging 注册

运行诊断命令：
```bash
mcp-chrome-bridge doctor
```

应该看到所有项目都是 [OK]，除了可能的 Connectivity 警告。

### 步骤 2：检查 Chrome 扩展

1. 访问 `chrome://extensions/`
2. 查找 "Chrome MCP Server" 扩展
3. 确保它已启用（蓝色切换开关）
4. 检查是否有错误信息

### 步骤 3：重新加载扩展

1. 在 `chrome://extensions/` 中找到扩展
2. 点击 **"刷新"** 按钮
3. 等待扩展重新加载
4. 点击扩展图标，尝试连接

### 步骤 4：检查 Chrome 控制台

1. 打开 Chrome DevTools（F12）
2. 切换到 "Console" 标签
3. 查看是否有错误信息
4. 记录错误信息以便诊断

### 步骤 5：重启 Chrome

1. 完全关闭 Chrome 浏览器
2. 等待 5 秒钟
3. 重新打开 Chrome
4. 重新加载扩展
5. 尝试连接

## 📝 常见问题

### Q: 为什么显示 "Service Not Connected"？

**A**: 这通常意味着：
1. Native Messaging 主机未正确启动
2. Chrome 扩展与主机之间的通信失败
3. 防火墙或安全软件阻止了连接

### Q: 如何知道 Native Messaging 是否工作？

**A**: 运行以下命令：
```bash
mcp-chrome-bridge doctor
```

如果所有项目都是 [OK]，说明 Native Messaging 已正确配置。

### Q: 如何手动启动 Native Messaging 主机？

**A**: 运行以下命令：
```bash
node "C:\Projects\Com_Projects\HuoShan\mcp-chrome\app\native-server\dist\index.js"
```

然后在 Chrome 扩展中点击 "Connect"。

## 🚀 快速修复步骤

如果上述步骤都不工作，请按照以下顺序尝试：

1. **重新注册 Native Messaging**
   ```bash
   mcp-chrome-bridge register
   ```

2. **修复权限**
   ```bash
   mcp-chrome-bridge fix-permissions
   ```

3. **重新加载扩展**
   - 访问 `chrome://extensions/`
   - 点击扩展的 "刷新" 按钮

4. **重启 Chrome**
   - 完全关闭 Chrome
   - 重新打开 Chrome

5. **重启计算机**
   - 如果上述步骤都不工作，尝试重启计算机

## 📞 需要帮助？

如果问题仍未解决，请提供以下信息：

1. `mcp-chrome-bridge doctor` 的输出
2. Chrome 控制台中的错误信息
3. Chrome 扩展的状态（已启用/已禁用）
4. 最近的系统更改或安全软件更新

---

**诊断时间**: 2026-02-02
**MCP 版本**: 1.0.29
