const http = require('http');

function makeRequest(data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: 12306,
      path: '/mcp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream'
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk.toString();
      });

      res.on('end', () => {
        resolve(responseData);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(JSON.stringify(data));
    req.end();
  });
}

async function getTabs() {
  try {
    console.log('1. 初始化 MCP 会话...\n');

    // 先初始化会话
    const initResponse = await makeRequest({
      jsonrpc: '2.0',
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: {
          name: 'get_tabs_script',
          version: '1.0.0'
        }
      },
      id: 1
    });

    console.log('初始化响应:', initResponse);

    console.log('\n2. 列出可用工具...\n');

    // 列出可用工具
    const toolsResponse = await makeRequest({
      jsonrpc: '2.0',
      method: 'tools/list',
      params: {},
      id: 2
    });

    console.log('工具列表响应:', toolsResponse);

    console.log('\n3. 调用 get_windows_and_tabs 工具...\n');

    // 调用 get_windows_and_tabs 工具
    const response = await makeRequest({
      jsonrpc: '2.0',
      method: 'tools/call',
      params: {
        name: 'get_windows_and_tabs',
        arguments: {}
      },
      id: 3
    });

    console.log('标签页响应:', response);

    // 解析 SSE 格式
    const lines = response.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = JSON.parse(line.substring(6));
        if (data.result) {
          console.log('\n=== 浏览器标签页列表 ===');
          console.log(JSON.stringify(data.result, null, 2));
        } else if (data.error) {
          console.error('\n错误:', data.error);
        }
      }
    }
  } catch (error) {
    console.error('错误:', error.message);
  }
}

getTabs();
