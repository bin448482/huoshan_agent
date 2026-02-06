const path = require('path');

// 使用 mcp-chrome 项目中的 AgentToolBridge
const mcpChromePath = 'C:\\Projects\\Com_Projects\\HuoShan\\mcp-chrome\\app\\native-server\\dist';
const { AgentToolBridge } = require(path.join(mcpChromePath, 'agent', 'tool-bridge.js'));

async function getInteractiveElements() {
  try {
    console.log('正在连接到 Chrome MCP 服务器...\n');

    // 创建工具桥接器
    const bridge = new AgentToolBridge({
      mcpUrl: 'http://127.0.0.1:12306/mcp'
    });

    // 确保连接
    await bridge.ensureConnected();
    console.log('✓ 已连接到 MCP 服务器\n');

    // 获取页面的交互元素
    console.log('正在获取页面交互元素...\n');
    const result = await bridge.callTool({
      tool: 'chrome_get_interactive_elements',
      args: {
        selector: 'nav, aside, .menu, .sidebar, [role="navigation"]'  // 查找导航和侧边栏元素
      }
    });

    console.log('=== 页面交互元素 ===\n');

    // 解析并格式化输出
    if (result.content && result.content.length > 0) {
      const content = result.content[0];
      if (content.type === 'text') {
        console.log('原始结果:');
        console.log(content.text);
      }
    } else {
      console.log('未获取到交互元素');
      console.log('原始结果:', JSON.stringify(result, null, 2));
    }

  } catch (error) {
    console.error('错误:', error.message);
    console.error(error.stack);
  }
}

getInteractiveElements();
