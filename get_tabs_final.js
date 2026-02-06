const path = require('path');

// 使用 mcp-chrome 项目中的 AgentToolBridge
const mcpChromePath = 'C:\\Projects\\Com_Projects\\HuoShan\\mcp-chrome\\app\\native-server\\dist';
const { AgentToolBridge } = require(path.join(mcpChromePath, 'agent', 'tool-bridge.js'));

async function getTabs() {
  try {
    console.log('正在连接到 Chrome MCP 服务器...\n');

    // 创建工具桥接器
    const bridge = new AgentToolBridge({
      mcpUrl: 'http://127.0.0.1:12306/mcp'
    });

    // 确保连接
    await bridge.ensureConnected();
    console.log('✓ 已连接到 MCP 服务器\n');

    // 调用 get_windows_and_tabs 工具
    console.log('正在获取浏览器标签页...\n');
    const result = await bridge.callTool({
      tool: 'get_windows_and_tabs',
      args: {}
    });

    console.log('=== 浏览器标签页列表 ===\n');

    // 解析并格式化输出
    if (result.content && result.content.length > 0) {
      const content = result.content[0];
      if (content.type === 'text') {
        const data = JSON.parse(content.text);

        // 统计信息
        console.log(`总共 ${data.windows.length} 个窗口，${data.windows.reduce((sum, w) => sum + w.tabs.length, 0)} 个标签页\n`);

        // 遍历每个窗口
        data.windows.forEach((window, windowIndex) => {
          console.log(`窗口 ${windowIndex + 1} (ID: ${window.id}):`);
          console.log(`  状态: ${window.focused ? '当前窗口' : '后台窗口'}`);
          console.log(`  标签页数量: ${window.tabs.length}`);
          console.log('');

          // 遍历每个标签页
          window.tabs.forEach((tab, tabIndex) => {
            const activeMarker = tab.active ? '★ ' : '  ';
            console.log(`  ${activeMarker}[${tabIndex + 1}] ${tab.title}`);
            console.log(`      URL: ${tab.url}`);
            console.log(`      ID: ${tab.id}`);
            console.log('');
          });
        });
      }
    } else {
      console.log('未获取到标签页数据');
      console.log('原始结果:', JSON.stringify(result, null, 2));
    }

  } catch (error) {
    console.error('错误:', error.message);
    console.error(error.stack);
  }
}

getTabs();
