# ⚡ MCP Chrome 服务器 - 快速启动指南

## 🚀 一键启动

### 方法 1：使用批处理文件（最简单）

双击运行：
```
C:\Projects\Com_Projects\HuoShan\mcp-chrome\app\native-server\dist\start-mcp-server.bat
```

### 方法 2：使用 CMD 命令

在 CMD 窗口中运行：
```cmd
cd /d C:\Projects\Com_Projects\HuoShan\mcp-chrome\app\native-server\dist
node start-http-server.js
```

### 方法 3：使用 start 命令

```cmd
start "MCP HTTP Server" cmd /k "cd /d C:\Projects\Com_Projects\HuoShan\mcp-chrome\app\native-server\dist && node start-http-server.js"
```

## ✅ 验证服务器启动

在另一个 CMD 窗口中运行：

```cmd
curl http://127.0.0.1:12306/ping
```

**成功响应**:
```json
{
  "status": "ok",
  "message": "pong"
}
```

## 🔗 连接 Chrome 扩展

1. **打开 Chrome 浏览器**
2. **点击** Chrome 工具栏中的 "Chrome MCP Server" 扩展图标
3. **点击** "Connect" 按钮
4. **等待** 2-3 秒钟
5. **应该看到** "Connected" 状态

## 🎯 在 Claude Code 中使用

打开 `huoshan_agent` 项目，然后尝试：

```
请帮我列出当前打开的所有浏览器标签页
```

## 📝 常见问题

### Q: 服务器启动失败怎么办？

**A**:
1. 确保 Node.js 已安装：`node --version`
2. 确保在正确的目录中
3. 查看错误信息并参考 `HTTP_SERVER_SOLUTION.md`

### Q: Chrome 扩展仍然显示 "Service Not Started"？

**A**:
1. 重新加载 Chrome 扩展（`chrome://extensions/` → 刷新）
2. 重启 Chrome 浏览器
3. 再次点击 "Connect" 按钮

### Q: 如何停止服务器？

**A**: 在服务器窗口中按 `Ctrl+C`

## 📂 相关文件

- **启动脚本**: `C:\Projects\Com_Projects\HuoShan\mcp-chrome\app\native-server\dist\start-http-server.js`
- **批处理文件**: `C:\Projects\Com_Projects\HuoShan\mcp-chrome\app\native-server\dist\start-mcp-server.bat`
- **详细指南**: `C:\Projects\Com_Projects\HuoShan\huoshan_agent\HTTP_SERVER_SOLUTION.md`
- **MCP 配置**: `C:\Projects\Com_Projects\HuoShan\huoshan_agent\.mcp.json`

## 🎉 现在就开始

1. 启动 HTTP 服务器
2. 在 Chrome 中连接
3. 在 Claude Code 中使用 Chrome 工具

**祝你使用愉快！** 🚀

---

**最后更新**: 2026-02-02
**MCP 版本**: 1.0.29
