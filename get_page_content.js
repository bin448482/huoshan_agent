const path = require('path');

// 使用 mcp-chrome 项目中的 AgentToolBridge
const mcpChromePath = 'C:\\Projects\\Com_Projects\\HuoShan\\mcp-chrome\\app\\native-server\\dist';
const { AgentToolBridge } = require(path.join(mcpChromePath, 'agent', 'tool-bridge.js'));

async function getPageContent() {
  try {
    console.log('正在连接到 Chrome MCP 服务器...\n');

    // 创建工具桥接器
    const bridge = new AgentToolBridge({
      mcpUrl: 'http://127.0.0.1:12306/mcp'
    });

    // 确保连接
    await bridge.ensureConnected();
    console.log('✓ 已连接到 MCP 服务器\n');

    // 获取当前激活标签页的内容
    console.log('正在获取当前页面内容...\n');
    const result = await bridge.callTool({
      tool: 'chrome_get_web_content',
      args: {
        selector: 'body',  // 获取整个页面内容
        includeHtml: true  // 包含 HTML 结构
      }
    });

    console.log('=== 页面内容 ===\n');

    // 解析并格式化输出
    if (result.content && result.content.length > 0) {
      const content = result.content[0];
      if (content.type === 'text') {
        const data = JSON.parse(content.text);

        console.log('页面标题:', data.title || '未知');
        console.log('页面 URL:', data.url || '未知');
        console.log('\n--- 页面内容 ---\n');

        // 输出文本内容（前5000字符）
        if (data.text) {
          console.log(data.text.substring(0, 5000));
          if (data.text.length > 5000) {
            console.log('\n... (内容过长，已截断)');
          }
        }

        // 如果有 HTML，也输出一部分
        if (data.html) {
          console.log('\n\n--- HTML 结构（前2000字符）---\n');
          console.log(data.html.substring(0, 2000));
          if (data.html.length > 2000) {
            console.log('\n... (HTML 过长，已截断)');
          }
        }
      }
    } else {
      console.log('未获取到页面内容');
      console.log('原始结果:', JSON.stringify(result, null, 2));
    }

  } catch (error) {
    console.error('错误:', error.message);
    console.error(error.stack);
  }
}

getPageContent();
