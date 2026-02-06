# Claude Code MCP 服务器配置指南

## ✅ 配置完成

已为 `huoshan_agent` 项目配置了 Chrome MCP 服务器。

## 📁 配置文件

**文件位置**: `.mcp.json`

```json
{
  "mcpServers": {
    "chrome-mcp-server": {
      "type": "streamableHttp",
      "url": "http://127.0.0.1:12306/mcp"
    }
  }
}
```

## 🚀 使用步骤

### 1. 启动 Chrome 扩展

首先，确保 Chrome 扩展已加载：

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 启用 **"开发者模式"**（右上角）
4. 点击 **"加载已解压的扩展程序"**
5. 选择目录：
   ```
   C:\Projects\Com_Projects\HuoShan\mcp-chrome\app\chrome-extension\.output\chrome-mv3
   ```

### 2. 启动 MCP 服务器

在终端中运行：

```bash
mcp-chrome-bridge
```

你应该看到类似的输出：
```
MCP Server listening on http://127.0.0.1:12306/mcp
```

### 3. 在 Claude Code 中使用

当你在 `huoshan_agent` 项目中使用 Claude Code 时：

1. Claude Code 会自动检测 `.mcp.json` 文件
2. 首次使用时，会提示你批准 MCP 服务器
3. 批准后，你就可以使用 Chrome 扩展的所有功能了

## 🎯 可用的工具

一旦连接成功，你可以使用以下工具：

### 浏览器管理
- `get_windows_and_tabs` - 列出所有浏览器窗口和标签页
- `chrome_navigate` - 导航到 URL
- `chrome_switch_tab` - 切换标签页
- `chrome_close_tabs` - 关闭标签页
- `chrome_go_back_or_forward` - 浏览器导航

### 截图和视觉
- `chrome_screenshot` - 截取网页或元素

### 网络监控
- `chrome_network_capture_start/stop` - 捕获网络请求
- `chrome_network_debugger_start/stop` - 调试网络请求
- `chrome_network_request` - 发送自定义 HTTP 请求

### 内容分析
- `search_tabs_content` - 语义搜索浏览器标签页内容
- `chrome_get_web_content` - 提取网页内容
- `chrome_get_interactive_elements` - 查找可点击元素
- `chrome_console` - 获取浏览器控制台输出

### 交互
- `chrome_click_element` - 点击元素
- `chrome_fill_or_select` - 填充表单
- `chrome_keyboard` - 模拟键盘输入

### 数据管理
- `chrome_history` - 搜索浏览历史
- `chrome_bookmark_search` - 搜索书签
- `chrome_bookmark_add` - 添加书签
- `chrome_bookmark_delete` - 删除书签

## 📝 示例用法

### 示例 1：截取网页

```
请帮我截取 https://www.volcengine.com 的首页
```

Claude Code 会使用 `chrome_screenshot` 工具来完成这个任务。

### 示例 2：搜索浏览历史

```
帮我查找过去一周内访问过的关于 Python 的网页
```

Claude Code 会使用 `chrome_history` 工具来搜索。

### 示例 3：提取网页内容

```
请提取当前标签页的所有文本内容
```

Claude Code 会使用 `chrome_get_web_content` 工具。

## 🔧 故障排除

### 问题 1：MCP 服务器连接失败

**症状**: 看到错误 "Failed to connect to MCP server"

**解决方案**:
1. 确保 `mcp-chrome-bridge` 正在运行
2. 确保 Chrome 扩展已加载
3. 检查端口 12306 是否被占用
4. 尝试重启 MCP 服务器

### 问题 2：Chrome 扩展未加载

**症状**: 在 `chrome://extensions/` 中看不到扩展

**解决方案**:
1. 确保开发者模式已启用
2. 检查扩展路径是否正确
3. 查看是否有错误信息
4. 尝试重新加载扩展

### 问题 3：工具调用失败

**症状**: 工具调用返回错误

**解决方案**:
1. 检查 Chrome 扩展是否仍在运行
2. 检查 MCP 服务器日志
3. 确保 Chrome 浏览器仍在运行
4. 尝试重新连接 MCP 服务器

## 📚 更多信息

- **MCP 文档**: 查看 `C:\Projects\Com_Projects\HuoShan\mcp-chrome\docs/`
- **工具列表**: `docs/TOOLS.md`
- **架构设计**: `docs/ARCHITECTURE.md`
- **故障排除**: `docs/TROUBLESHOOTING.md`

## 🔐 安全注意事项

1. **本地连接**: MCP 服务器仅在本地运行，不会将数据发送到外部服务器
2. **浏览器访问**: 扩展可以访问你的浏览器数据（历史、书签等），请确保信任
3. **网络请求**: 使用 `chrome_network_request` 工具时要小心，避免发送敏感信息

## 💡 最佳实践

1. **定期更新**: 保持 mcp-chrome 和 Claude Code 最新
2. **监控性能**: 如果 MCP 服务器响应缓慢，检查系统资源
3. **备份数据**: 定期备份重要的浏览历史和书签
4. **测试工具**: 在使用新工具前，先在简单的场景中测试

## 🎓 下一步

1. 启动 MCP 服务器
2. 在 Claude Code 中打开 `huoshan_agent` 项目
3. 尝试使用一个简单的工具，如 `get_windows_and_tabs`
4. 根据需要使用其他工具

---

**配置完成时间**: 2026-02-02
**项目**: huoshan_agent
**MCP 服务器**: chrome-mcp-server v1.0.29
