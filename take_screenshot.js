const path = require('path');
const fs = require('fs');

// 使用 mcp-chrome 项目中的 AgentToolBridge
const mcpChromePath = 'C:\\Projects\\Com_Projects\\HuoShan\\mcp-chrome\\app\\native-server\\dist';
const { AgentToolBridge } = require(path.join(mcpChromePath, 'agent', 'tool-bridge.js'));

async function takeScreenshot() {
  try {
    console.log('正在连接到 Chrome MCP 服务器...\n');

    // 创建工具桥接器
    const bridge = new AgentToolBridge({
      mcpUrl: 'http://127.0.0.1:12306/mcp'
    });

    // 确保连接
    await bridge.ensureConnected();
    console.log('✓ 已连接到 MCP 服务器\n');

    // 截取当前页面
    console.log('正在截取页面截图...\n');
    const result = await bridge.callTool({
      tool: 'chrome_screenshot',
      args: {
        fullPage: true  // 截取整个页面
      }
    });

    console.log('=== 截图结果 ===\n');

    // 解析结果
    if (result.content && result.content.length > 0) {
      const content = result.content[0];

      if (content.type === 'image') {
        // 如果返回的是图片数据
        console.log('✓ 截图成功！');
        console.log('图片类型:', content.mimeType);

        // 保存截图
        const screenshotPath = path.join(__dirname, 'screenshot.png');
        const base64Data = content.data.replace(/^data:image\/\w+;base64,/, '');
        fs.writeFileSync(screenshotPath, Buffer.from(base64Data, 'base64'));
        console.log('截图已保存到:', screenshotPath);

      } else if (content.type === 'text') {
        // 如果返回的是文本（可能包含 base64 数据）
        const data = JSON.parse(content.text);
        console.log('截图数据:', data);

        if (data.screenshot || data.image || data.data) {
          const screenshotPath = path.join(__dirname, 'screenshot.png');
          const imageData = data.screenshot || data.image || data.data;
          const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
          fs.writeFileSync(screenshotPath, Buffer.from(base64Data, 'base64'));
          console.log('✓ 截图已保存到:', screenshotPath);
        }
      }
    } else {
      console.log('未获取到截图');
      console.log('原始结果:', JSON.stringify(result, null, 2));
    }

  } catch (error) {
    console.error('错误:', error.message);
    console.error(error.stack);
  }
}

takeScreenshot();
