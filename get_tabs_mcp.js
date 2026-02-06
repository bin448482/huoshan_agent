const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { SSEClientTransport } = require('@modelcontextprotocol/sdk/client/sse.js');

async function getTabs() {
  try {
    console.log('正在连接到 MCP 服务器...\n');

    // 创建 SSE 传输
    const transport = new SSEClientTransport(
      new URL('http://127.0.0.1:12306/mcp')
    );

    // 创建 MCP 客户端
    const client = new Client({
      name: 'get_tabs_client',
      version: '1.0.0'
    }, {
      capabilities: {}
    });

    // 连接到服务器
    await client.connect(transport);
    console.log('✓ 已连接到 MCP 服务器\n');

    // 列出可用工具
    console.log('正在列出可用工具...');
    const tools = await client.listTools();
    console.log('可用工具:', tools.tools.map(t => t.name).join(', '));
    console.log('');

    // 调用 get_windows_and_tabs 工具
    console.log('正在获取浏览器标签页...\n');
    const result = await client.callTool({
      name: 'get_windows_and_tabs',
      arguments: {}
    });

    console.log('=== 浏览器标签页列表 ===');
    console.log(JSON.stringify(result, null, 2));

    // 关闭连接
    await client.close();
  } catch (error) {
    console.error('错误:', error.message);
    console.error(error.stack);
  }
}

getTabs();
