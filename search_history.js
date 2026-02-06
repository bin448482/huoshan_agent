const path = require('path');

// 使用 mcp-chrome 项目中的 AgentToolBridge
const mcpChromePath = 'C:\\Projects\\Com_Projects\\HuoShan\\mcp-chrome\\app\\native-server\\dist';
const { AgentToolBridge } = require(path.join(mcpChromePath, 'agent', 'tool-bridge.js'));

async function searchHistory() {
  try {
    console.log('正在连接到 Chrome MCP 服务器...\n');

    // 创建工具桥接器
    const bridge = new AgentToolBridge({
      mcpUrl: 'http://127.0.0.1:12306/mcp'
    });

    // 确保连接
    await bridge.ensureConnected();
    console.log('✓ 已连接到 MCP 服务器\n');

    // 搜索浏览历史
    console.log('正在搜索浏览历史...\n');

    // 获取最近的浏览历史（不指定搜索词，获取所有最近记录）
    const result = await bridge.callTool({
      tool: 'chrome_history',
      args: {
        text: '',  // 空字符串表示获取所有记录
        maxResults: 50  // 获取最近50条记录
      }
    });

    console.log('=== 浏览历史 ===\n');

    // 解析并格式化输出
    if (result.content && result.content.length > 0) {
      const content = result.content[0];
      if (content.type === 'text') {
        const data = JSON.parse(content.text);

        // 先输出原始数据结构以便调试
        console.log('原始数据结构:', JSON.stringify(data, null, 2).substring(0, 500));
        console.log('\n');

        // 检查数据是否是数组
        let historyItems = [];
        if (Array.isArray(data)) {
          historyItems = data;
        } else if (data.items && Array.isArray(data.items)) {
          historyItems = data.items;
        } else if (data.history && Array.isArray(data.history)) {
          historyItems = data.history;
        } else {
          console.log('无法识别的数据格式');
          console.log('完整数据:', JSON.stringify(data, null, 2));
          return;
        }

        if (historyItems.length === 0) {
          console.log('没有找到浏览历史记录');
          return;
        }

        console.log(`找到 ${historyItems.length} 条历史记录\n`);

        // 按日期分组
        const groupedByDate = {};
        historyItems.forEach(item => {
          const date = new Date(item.lastVisitTime);
          const dateKey = date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });

          if (!groupedByDate[dateKey]) {
            groupedByDate[dateKey] = [];
          }
          groupedByDate[dateKey].push(item);
        });

        // 输出分组后的历史记录
        Object.keys(groupedByDate).sort().reverse().forEach(dateKey => {
          console.log(`\n📅 ${dateKey}`);
          console.log('─'.repeat(80));

          groupedByDate[dateKey].forEach((item, index) => {
            const time = new Date(item.lastVisitTime).toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit'
            });

            console.log(`\n  [${index + 1}] ${item.title || '(无标题)'}`);
            console.log(`      URL: ${item.url}`);
            console.log(`      访问时间: ${time}`);
            console.log(`      访问次数: ${item.visitCount || 1} 次`);
          });
        });

      }
    } else {
      console.log('未获取到历史记录数据');
      console.log('原始结果:', JSON.stringify(result, null, 2));
    }

  } catch (error) {
    console.error('错误:', error.message);
    console.error(error.stack);
  }
}

// 如果提供了命令行参数，作为搜索关键词
const searchText = process.argv[2] || '';

if (searchText) {
  console.log(`搜索关键词: "${searchText}"\n`);
}

searchHistory();
