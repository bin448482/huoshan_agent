# 接口爬取 TODO List

## 接口信息
- **接口地址**: http://192.168.2.163:18080/erp/depart/list
- **接口类型**: ERP 系统部门列表接口
- **重要发现**: ⚠️ 该接口需要登录认证（返回 302 重定向到登录页）

---

## 阶段一：准备工作

### 1. 环境准备
- [ ] 安装 Python 3.8+ 环境
- [ ] 创建虚拟环境
  ```bash
  python -m venv venv
  # Windows
  venv\Scripts\activate
  # Linux/Mac
  source venv/bin/activate
  ```

### 2. 依赖安装
- [ ] 安装必要的 Python 库
  ```bash
  pip install requests          # HTTP 请求库
  pip install beautifulsoup4    # 网页解析（如需要）
  pip install pandas            # 数据处理
  pip install python-dotenv     # 环境变量管理
  ```
- [ ] 创建 requirements.txt 文件
  ```txt
  requests==2.31.0
  beautifulsoup4==4.12.0
  pandas==2.1.0
  python-dotenv==1.0.0
  ```

### 3. 项目结构设置
- [ ] 创建项目目录结构
  ```
  huoshan_agent/
  ├── docs_pachon/              # 文档目录
  ├── src/                      # 源代码
  │   ├── __init__.py
  │   ├── crawler.py            # 爬虫主程序
  │   ├── auth.py               # 认证处理
  │   └── utils.py              # 工具函数
  ├── data/                     # 数据存储
  │   ├── raw/                  # 原始数据
  │   └── processed/            # 处理后的数据
  ├── logs/                     # 日志文件
  ├── .env                      # 环境变量（不提交到 git）
  ├── .gitignore
  └── requirements.txt
  ```

---

## 阶段二：认证分析

### 4. 登录认证调研
- [ ] **关键步骤**: 获取登录凭证
  - 接口返回 302 重定向到 /login，说明需要先登录
  - 需要获取有效的 Session Cookie (JSESSIONID)

- [ ] 分析登录流程
  - [ ] 访问登录页面: http://192.168.2.163:18080/login
  - [ ] 查看登录表单需要哪些参数（用户名、密码、验证码等）
  - [ ] 确定登录请求方式（POST/GET）
  - [ ] 检查是否有 CSRF Token 或其他安全机制

- [ ] 获取登录凭证（选择以下方式之一）
  - **方式 1**: 从管理员获取有效的账号密码
  - **方式 2**: 从浏览器复制已登录的 Cookie
  - **方式 3**: 获取 API Token（如果系统支持）

### 5. Cookie 管理策略
- [ ] 决定 Session 管理方式
  - 使用 requests.Session() 自动管理 Cookie
  - 或手动设置 Cookie 值

---

## 阶段三：爬虫开发

### 6. 基础爬虫编写
- [ ] 创建 `src/auth.py` - 处理登录认证
  ```python
  import requests

  def login(base_url, username, password):
      """
      登录系统获取 Session
      """
      session = requests.Session()
      # TODO: 实现登录逻辑
      return session
  ```

- [ ] 创建 `src/crawler.py` - 核心爬虫逻辑
  ```python
  import requests
  import json
  from datetime import datetime

  def fetch_department_list(session, base_url):
      """
      获取部门列表数据
      """
      url = f"{base_url}/erp/depart/list"
      response = session.get(url)

      if response.status_code == 200:
          return response.json()
      else:
          raise Exception(f"请求失败: {response.status_code}")
  ```

### 7. 错误处理与重试机制
- [ ] 添加异常处理
  - 网络错误处理
  - 超时处理
  - 认证失效处理

- [ ] 实现重试机制
  - 请求失败自动重试（最多 3 次）
  - 指数退避策略

### 8. 日志记录
- [ ] 配置日志系统
  ```python
  import logging

  logging.basicConfig(
      level=logging.INFO,
      format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
      handlers=[
          logging.FileHandler('logs/crawler.log'),
          logging.StreamHandler()
      ]
  )
  ```

---

## 阶段四：数据处理

### 9. 数据存储
- [ ] 选择数据存储方式
  - JSON 文件（简单场景）
  - CSV 文件（表格数据）
  - SQLite 数据库（结构化查询）
  - MySQL/PostgreSQL（生产环境）

- [ ] 实现数据保存函数
  ```python
  def save_to_json(data, filename):
      with open(f'data/raw/{filename}', 'w', encoding='utf-8') as f:
          json.dump(data, f, ensure_ascii=False, indent=2)
  ```

### 10. 数据清洗与处理
- [ ] 分析返回的数据结构
- [ ] 提取需要的字段
- [ ] 数据格式转换（如需要）
- [ ] 保存处理后的数据

---

## 阶段五：自动化与监控

### 11. 定时任务设置
- [ ] 选择定时方案
  - Windows: 任务计划程序
  - Linux: cron
  - Python: APScheduler 库

### 12. 监控与告警
- [ ] 添加运行状态监控
- [ ] 设置失败告警（邮件/钉钉/企业微信）
- [ ] 记录爬取统计信息

---

## 阶段六：安全与合规

### 13. 安全措施
- [ ] ⚠️ **敏感信息管理**
  - 不要在代码中硬编码账号密码
  - 使用 .env 文件存储凭证
  - 将 .env 添加到 .gitignore

- [ ] 创建 .env 文件
  ```env
  ERP_BASE_URL=http://192.168.2.163:18080
  ERP_USERNAME=your_username
  ERP_PASSWORD=your_password
  ```

### 14. 访问频率控制
- [ ] 设置请求间隔（避免对服务器造成压力）
  ```python
  import time
  time.sleep(1)  # 每次请求间隔 1 秒
  ```

### 15. 合规性检查
- [ ] ⚠️ **重要**: 确认是否有权限爬取该接口
  - 确认是否为内部系统
  - 是否需要申请数据访问权限
  - 是否符合公司数据安全政策

---

## 快速开始示例代码

### 方式一：使用账号密码登录
```python
import requests
from dotenv import load_dotenv
import os

# 加载环境变量
load_dotenv()

# 创建 Session
session = requests.Session()

# 登录（需要根据实际登录接口调整）
login_url = "http://192.168.2.163:18080/login"
login_data = {
    "username": os.getenv("ERP_USERNAME"),
    "password": os.getenv("ERP_PASSWORD")
}
session.post(login_url, data=login_data)

# 获取部门列表
response = session.get("http://192.168.2.163:18080/erp/depart/list")
print(response.json())
```

### 方式二：使用已有的 Cookie
```python
import requests

session = requests.Session()

# 从浏览器复制的 Cookie
cookies = {
    'JSESSIONID': 'your-session-id-here'
}

response = session.get(
    "http://192.168.2.163:18080/erp/depart/list",
    cookies=cookies
)
print(response.json())
```

---

## 注意事项

1. **网络环境**: 确保能够访问 192.168.2.163 这个内网地址
2. **认证有效期**: Session 可能有过期时间，需要定期重新登录
3. **数据备份**: 定期备份爬取的数据
4. **错误处理**: 充分考虑各种异常情况
5. **性能优化**: 如需爬取大量数据，考虑并发/异步请求
6. **法律合规**: 确保爬取行为符合相关规定

---

## 下一步行动

### 立即执行
1. 先确认是否能访问该内网地址
2. 获取有效的登录凭证
3. 手动测试一次完整的登录 → 访问接口流程
4. 根据实际情况编写爬虫代码

### 需要的信息
- [ ] ERP 系统的登录账号和密码
- [ ] 登录接口的具体参数要求
- [ ] 接口返回数据的格式示例
- [ ] 预期的数据更新频率（决定爬取频率）
- [ ] 数据使用目的（决定存储和处理方式）
