# ✅ MCP Chrome 服务器 - 完整启动指南

## 🎉 启动成功！

MCP Chrome 服务器已成功启动并在后台运行。

### 服务器信息
- **状态**: ✅ 运行中
- **进程 ID**: b54c365
- **服务器地址**: `http://127.0.0.1:12306/mcp`
- **版本**: 1.0.29
- **启动时间**: 2026-02-02

---

## 📋 完整配置清单

### ✅ 已完成的步骤

1. **mcp-chrome 项目安装**
   - ✅ 克隆仓库
   - ✅ 安装依赖
   - ✅ 构建 Chrome 扩展
   - ✅ 构建 Native Server
   - ✅ 全局安装 mcp-chrome-bridge

2. **Native Messaging 注册**
   - ✅ 注册 Chrome Native Messaging host
   - ✅ 创建注册表项
   - ✅ 验证文件权限

3. **Claude Code 配置**
   - ✅ 创建 `.mcp.json` 配置文件
   - ✅ 配置 Streamable HTTP 连接
   - ✅ 设置服务器地址和端口

4. **MCP 服务器启动**
   - ✅ 启动 Node.js 服务器
   - ✅ 监听端口 12306
   - ✅ 等待 Chrome 扩展连接

---

## 🚀 后续步骤

### 第一步：加载 Chrome 扩展（必须）

1. **打开 Chrome 浏览器**
2. **访问** `chrome://extensions/`
3. **启用** "开发者模式"（右上角的切换开关）
4. **点击** "加载已解压的扩展程序"
5. **选择目录**:
   ```
   C:\Projects\Com_Projects\HuoShan\mcp-chrome\app\chrome-extension\.output\chrome-mv3
   ```

**预期结果**:
- 在 `chrome://extensions/` 中看到 "Chrome MCP Server" 扩展
- 扩展图标出现在 Chrome 工具栏中

### 第二步：连接扩展到 MCP 服务器（必须）

1. **点击** Chrome 工具栏中的扩展图标
2. **查看** 弹窗中的连接状态
3. **点击** "Connect" 按钮（如果显示）
4. **等待** 连接成功提示

**预期结果**:
- 看到 "Connected" 或类似的成功消息
- 扩展图标可能会改变外观表示已连接

### 第三步：在 Claude Code 中使用（可选）

1. **打开** `huoshan_agent` 项目
2. **Claude Code** 会自动检测 `.mcp.json` 文件
3. **首次使用** 时会提示批准 MCP 服务器
4. **点击** "Approve" 或 "Allow"
5. **现在** 可以使用所有 Chrome 工具了

---

## 🎯 验证连接

### 方法 1：使用 Chrome 扩展弹窗

- 点击扩展图标，查看连接状态
- 应该显示 "Connected to MCP Server" 或类似信息

### 方法 2：在 Claude Code 中测试

在 Claude Code 中输入：

```
请帮我列出当前打开的所有浏览器标签页
```

如果连接成功，Claude Code 会：
1. 使用 `get_windows_and_tabs` 工具
2. 返回你当前打开的所有标签页列表
3. 显示每个标签页的标题和 URL

---

## 📚 可用工具

一旦连接成功，你可以在 Claude Code 中使用以下工具：

### 🌐 浏览器管理（6 个工具）
- `get_windows_and_tabs` - 列出所有窗口和标签页
- `chrome_navigate` - 导航到 URL
- `chrome_switch_tab` - 切换标签页
- `chrome_close_tabs` - 关闭标签页
- `chrome_go_back_or_forward` - 浏览器导航
- `chrome_inject_script` - 注入脚本

### 📸 截图和视觉（1 个工具）
- `chrome_screenshot` - 截取网页或元素

### 🌐 网络监控（4 个工具）
- `chrome_network_capture_start/stop` - 捕获网络请求
- `chrome_network_debugger_start/stop` - 调试网络请求
- `chrome_network_request` - 发送自定义 HTTP 请求

### 🔍 内容分析（4 个工具）
- `search_tabs_content` - 语义搜索标签页内容
- `chrome_get_web_content` - 提取网页内容
- `chrome_get_interactive_elements` - 查找可点击元素
- `chrome_console` - 获取浏览器控制台输出

### ⌨️ 交互（3 个工具）
- `chrome_click_element` - 点击元素
- `chrome_fill_or_select` - 填充表单
- `chrome_keyboard` - 模拟键盘输入

### 📚 数据管理（5 个工具）
- `chrome_history` - 搜索浏览历史
- `chrome_bookmark_search` - 搜索书签
- `chrome_bookmark_add` - 添加书签
- `chrome_bookmark_delete` - 删除书签

---

## 💡 使用示例

### 示例 1：截取网页

```
请帮我截取 https://www.volcengine.com 的首页
```

### 示例 2：搜索浏览历史

```
帮我查找过去一周内访问过的关于 Python 的网页
```

### 示例 3：提取网页内容

```
请提取当前标签页的所有文本内容
```

### 示例 4：自动填充表单

```
请帮我在搜索框中输入 "Claude Code" 并按 Enter
```

### 示例 5：点击按钮

```
请帮我点击页面上的 "提交" 按钮
```

---

## 🔧 故障排除

### 问题 1：Chrome 扩展无法加载

**症状**: 在 `chrome://extensions/` 中看不到扩展

**解决方案**:
1. 确保开发者模式已启用
2. 检查扩展路径是否正确
3. 查看是否有错误信息
4. 尝试重新加载扩展

### 问题 2：扩展无法连接到 MCP 服务器

**症状**: 扩展显示 "Disconnected" 或连接失败

**解决方案**:
1. 确保 MCP 服务器正在运行（应该是）
2. 检查端口 12306 是否被占用
3. 尝试重新加载扩展
4. 重启 Chrome 浏览器

### 问题 3：Claude Code 无法识别 MCP 服务器

**症状**: Claude Code 中没有看到 MCP 服务器选项

**解决方案**:
1. 确保 `.mcp.json` 文件存在于项目根目录
2. 检查文件内容是否正确
3. 重新打开 Claude Code
4. 确保在 `huoshan_agent` 项目中打开

### 问题 4：工具调用失败

**症状**: 工具返回错误或无响应

**解决方案**:
1. 检查 Chrome 浏览器是否仍在运行
2. 检查扩展是否仍然连接
3. 查看 Chrome 控制台是否有错误
4. 尝试重新连接扩展

---

## 📝 重要文件位置

| 文件/目录 | 位置 |
|---------|------|
| **MCP 服务器** | `C:\Projects\Com_Projects\HuoShan\mcp-chrome\app\native-server\dist\index.js` |
| **Chrome 扩展** | `C:\Projects\Com_Projects\HuoShan\mcp-chrome\app\chrome-extension\.output\chrome-mv3` |
| **配置文件** | `C:\Projects\Com_Projects\HuoShan\huoshan_agent\.mcp.json` |
| **配置指南** | `C:\Projects\Com_Projects\HuoShan\huoshan_agent\MCP_CONFIGURATION.md` |
| **项目根目录** | `C:\Projects\Com_Projects\HuoShan\huoshan_agent` |

---

## 🔐 安全注意事项

1. **本地连接**: MCP 服务器仅在本地运行，不会将数据发送到外部服务器
2. **浏览器访问**: 扩展可以访问你的浏览器数据（历史、书签等），请确保信任
3. **网络请求**: 使用 `chrome_network_request` 工具时要小心，避免发送敏感信息
4. **脚本注入**: 使用 `chrome_inject_script` 时要谨慎，只在信任的网站上使用

---

## 📞 需要帮助？

如果遇到问题，请检查：

1. ✅ MCP 服务器是否在运行？
2. ✅ Chrome 扩展是否已加载？
3. ✅ 扩展是否已连接到 MCP 服务器？
4. ✅ `.mcp.json` 文件是否存在且内容正确？
5. ✅ Claude Code 是否在 `huoshan_agent` 项目中打开？

---

## 🎓 下一步建议

1. **立即**: 加载 Chrome 扩展并连接到 MCP 服务器
2. **然后**: 在 Claude Code 中测试一个简单的工具
3. **接着**: 尝试更复杂的自动化任务
4. **最后**: 根据需要自定义和扩展功能

---

**配置完成时间**: 2026-02-02
**MCP 服务器版本**: 1.0.29
**状态**: ✅ 运行中
**下一步**: 加载 Chrome 扩展
