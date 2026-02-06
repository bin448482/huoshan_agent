# ✅ MCP Chrome 服务器 - 连接指南

## 🎉 服务器已启动！

Native Messaging 主机已在后台运行，等待 Chrome 扩展连接。

### 当前状态
- **Native Messaging 主机**: ✅ 运行中
- **进程数**: 2 个 Node.js 进程
- **内存使用**: ~414 MB
- **状态**: 等待 Chrome 扩展连接

---

## 🚀 连接步骤（必须执行）

### 第一步：打开 Chrome 扩展

1. **打开 Chrome 浏览器**
2. **点击** Chrome 工具栏中的 "Chrome MCP Server" 扩展图标
   - 如果看不到图标，可能需要点击扩展菜单（拼图图标）

### 第二步：点击 Connect 按钮

1. **在弹出的扩展窗口中**
2. **点击** "Connect" 按钮
3. **等待** 2-3 秒钟

### 第三步：验证连接

**成功连接的标志**:
- ✅ 看到 "Connected" 或 "Connected to MCP Server" 消息
- ✅ 扩展图标可能会改变外观
- ✅ 不再显示 "Service Not Connected"

---

## 🔍 如果连接失败

### 问题 1：仍然显示 "Service Not Connected"

**解决方案**:

1. **重新加载扩展**
   ```
   chrome://extensions/ → 找到 "Chrome MCP Server" → 点击 "刷新"
   ```

2. **重启 Chrome**
   - 完全关闭 Chrome（所有窗口）
   - 等待 5 秒钟
   - 重新打开 Chrome
   - 再次尝试连接

3. **检查 Chrome 控制台**
   - 打开 DevTools（F12）
   - 切换到 "Console" 标签
   - 查看是否有错误信息
   - 记录错误信息

### 问题 2：扩展图标不显示

**解决方案**:

1. **检查扩展是否已加载**
   ```
   chrome://extensions/ → 查找 "Chrome MCP Server"
   ```

2. **如果未加载，重新加载**
   - 点击 "加载已解压的扩展程序"
   - 选择: `C:\Projects\Com_Projects\HuoShan\mcp-chrome\app\chrome-extension\.output\chrome-mv3`

3. **如果已加载但图标不显示**
   - 点击扩展菜单（拼图图标）
   - 查找 "Chrome MCP Server"
   - 点击图标固定到工具栏

### 问题 3：Chrome 显示权限请求

**解决方案**:

1. **点击** "允许" 或 "Allow"
2. **等待** 连接建立
3. **应该看到** "Connected" 消息

---

## 📝 连接成功后

一旦看到 "Connected" 状态，你就可以：

### 在 Claude Code 中使用 Chrome 工具

打开 `huoshan_agent` 项目，然后尝试：

```
请帮我列出当前打开的所有浏览器标签页
```

Claude Code 会使用 `get_windows_and_tabs` 工具返回你的标签页列表。

### 其他可用命令

```
请帮我截取 https://www.volcengine.com 的首页
```

```
帮我查找过去一周内访问过的关于 Python 的网页
```

```
请提取当前标签页的所有文本内容
```

---

## 🔧 诊断命令

如果需要诊断问题，可以运行：

```bash
mcp-chrome-bridge doctor
```

这会显示：
- ✅ 安装状态
- ✅ 文件权限
- ✅ Node.js 配置
- ✅ Chrome 注册表
- ⚠️ 连接状态

---

## 📊 可用工具列表

连接成功后，你可以使用以下工具：

### 浏览器管理（6 个工具）
- `get_windows_and_tabs` - 列出所有窗口和标签页
- `chrome_navigate` - 导航到 URL
- `chrome_switch_tab` - 切换标签页
- `chrome_close_tabs` - 关闭标签页
- `chrome_go_back_or_forward` - 浏览器导航
- `chrome_inject_script` - 注入脚本

### 截图和视觉（1 个工具）
- `chrome_screenshot` - 截取网页或元素

### 网络监控（4 个工具）
- `chrome_network_capture_start/stop` - 捕获网络请求
- `chrome_network_debugger_start/stop` - 调试网络请求
- `chrome_network_request` - 发送自定义 HTTP 请求

### 内容分析（4 个工具）
- `search_tabs_content` - 语义搜索标签页内容
- `chrome_get_web_content` - 提取网页内容
- `chrome_get_interactive_elements` - 查找可点击元素
- `chrome_console` - 获取浏览器控制台输出

### 交互（3 个工具）
- `chrome_click_element` - 点击元素
- `chrome_fill_or_select` - 填充表单
- `chrome_keyboard` - 模拟键盘输入

### 数据管理（5 个工具）
- `chrome_history` - 搜索浏览历史
- `chrome_bookmark_search` - 搜索书签
- `chrome_bookmark_add` - 添加书签
- `chrome_bookmark_delete` - 删除书签

---

## 💡 快速检查清单

在尝试连接前，请确保：

- [ ] Chrome 浏览器已打开
- [ ] "Chrome MCP Server" 扩展已加载（在 `chrome://extensions/` 中可见）
- [ ] 扩展已启用（蓝色切换开关）
- [ ] Native Messaging 主机正在运行（应该是）
- [ ] 没有防火墙或安全软件阻止连接

---

## 🎯 下一步

1. **立即**: 在 Chrome 扩展中点击 "Connect"
2. **等待**: 连接建立（2-3 秒钟）
3. **验证**: 看到 "Connected" 状态
4. **测试**: 在 Claude Code 中使用一个工具
5. **享受**: 开始使用 Chrome 自动化功能！

---

**启动时间**: 2026-02-02
**MCP 版本**: 1.0.29
**状态**: ✅ 运行中，等待连接
