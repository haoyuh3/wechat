# weChat

【代码随想录知识星球】项目二次开发-基于go+vue实现的聊天室+仿微信项目

# 项目概述
1. 简介：weChat 是一个前后端分离的即时通讯项目，具备后台管理、单聊群聊、联系人管理、多种消息（文本 / 文件 / 视频）处理、离线消息处理以及音视频通话等功能，旨在打造类似微信的聊天体验。
### 核心特性
- 实时消息推送（WebSocket）
- 单聊和群聊功能
- 音视频通话（WebRTC）
- 文件传输
- 离线消息处理
- 后台管理系统
- SMS 短信验证登录
- SSL/TLS 加密通信

---

## 技术架构

### 后端技术栈
- **语言**: Go 1.20
- **Web框架**: Gin
- **数据库**:
   - MySQL (主数据库，使用 GORM ORM)
   - Redis (缓存和会话管理)
- **消息队列**: Kafka (可选，支持 channel 模式)
- **WebSocket**: gorilla/websocket
- **日志**: Zap + Lumberjack (日志轮转)
- **短信服务**: 阿里云短信服务 (暂时本地模拟)
- **音视频**: WebRTC

### 前端技术栈
- **框架**: Vue 3
- **UI库**: Element Plus
- **路由**: Vue Router 4
- **状态管理**: Vuex 4
- **HTTP客户端**: Axios
- **实时通信**: WebSocket
- **音视频**: WebRTC
---

# 功能特性
1. 即时通讯功能
   + 单聊与群聊：支持一对一私密聊天和群组聊天，消息实时推送。
   + 联系人管理：可添加、删除、拉黑联系人，处理好友申请等。
   + 消息类型：支持文本、文件、音视频等多种类型消息的发送与接收。
   + 离线消息处理：确保用户离线时消息不丢失，上线后可正常接收。
2. 音视频通话：基于 WebRTC 实现 1 对 1 音视频通话，包括发起、拒绝、接收、挂断通话等功能。
3. 后台管理：具备后台管理界面，靓号用户可进行人员管控等维护操作。
4. 安全与验证：登录注册采用 SMS 短信验证方式，并支持 SSL 加密，保障用户信息安全。
5. 后台mysql数据库：使用 GORM 进行数据库操作，确保数据持久化存储。
6. 日志记录：使用 Zap 日志库记录系统运行日志，便于问题排查与性能监控。
7. 消息队列：使用 Kafka 处理消息队列，确保消息的高效传输与处理。
8. redis缓存：使用 GoRedis 进行缓存操作，提高系统性能。
9. WebSocket：使用 WebSocket 实现实时消息推送，保证消息的实时性。


# 项目结构

## 后端

```
kama-chat-server/
├── api/
│   └── v1/
│       └── chatroom_controller.go
│       └── controller.go
│       └── group_info_controller.go
│       └── message_controller.go
│       └── session_controller.go
│       └── user_contact_controller.go
│       └── user_info_controller.go
│       └── ws_controller.go
├── cmd/
│   └── kama-chat-server/
│       └── main.go
├── internal/
│   ├── config/
│   │   └── config.go
│   ├── dao/
│   │   └── gorm.go
│   ├── dto/
│   │   ├── request/
│   │   │   └── ......
│   │   └── respond/
│   │   │   └── ......
│   ├── https_server/
│   │   └── https_server.go
│   ├── model/
│   │   ├── contact_apply.go
│   │   ├── group_info.go
│   │   ├── message.go
│   │   ├── session.go
│   │   ├── user_contact.go
│   │   └── user_info.go
│   └── service/
│       ├── chat/
│       │   ├── client.go
│       │   ├── kafka_server.go
│       │   └── server.go
│       ├── gorm/
│       │   ├── chatroom_service.go
│       │   ├── group_info_service.go
│       │   ├── message_service.go
│       │   ├── session_service.go
│       │   ├── user_contact_service.go
│       │   └── user_info_service.go
│       ├── kafka/
│       │   └── kafka_service.go
│       ├── redis/
│       │   └── redis_service.go
│       └── sms/
│           ├── local/
│           │   └── user_info_service_local.go
│           └── auth_code_service.go
├── logs/
│   └── test.log
├── pkg/
│   ├── constants/
│   │   └── constants.go
│   ├── enum/
│   │   ├── contact/
│   │   ├── contact_apply/
│   │   ├── group_info/
│   │   ├── message/
│   │   ├── session/
│   │   └── user_info/
│   ├── ssl/
│   │   ├── xxx.pem
│   │   ├── xxx-key.pem
│   │   └── tls_handler.go
│   ├── util/
│   │   └── random/
│   │       └── random_int.go
│   └── zlog/
│       └── logger.go
├── configs/
│   ├── config.toml
│   └── config_local.toml
├── static/
│   ├── avatars/
│   │   └── ......
│   └── files/
│   │   └── ......
├── web/
│   └── (前端项目结构)
├── .gitignore
├── go.mod
├── go.sum
└── README.md

```

## 前端

```
web/chat-server/
├── src/
│   ├── assets/
│   │   ├── cert/
│   │   │   ├── xxx.pem
│   │   │   ├── xxx-key.pem
│   │   │   └── mkcert.exe
│   │   ├── css/
│   │   │   └── chat.css
│   │   ├── img/
│   │   │   └── chat_server_background.jpg
│   │   ├── js/
│   │   │   ├── random.js
│   │   │   └── valid.js
│   ├── components/
│   │   ├── ContactListModal.vue
│   │   ├── DeleteGroupModal.vue
│   │   ├── DeleteUserModal.vue
│   │   ├── DisableGroupModal.vue
│   │   ├── DisableUserModal.vue
│   │   ├── Modal.vue
│   │   ├── NavigationModal.vue
│   │   ├── SetAdminModal.vue
│   │   ├── SmallModal.vue
│   │   └── VideoModal.vue
│   ├── router/
│   │   └── index.js
│   ├── store/
│   │   └── index.js
│   ├── views/
│   │   ├── access/
│   │   │   ├── Login.vue
│   │   │   ├── Register.vue
│   │   │   └── SmsLogin.vue
│   │   ├── chat/
│   │   │   ├── contact/
│   │   │   │   ├── ContactChat.vue
│   │   │   │   └── ContactList.vue
│   │   │   ├── session/
│   │   │   │   └── SessionList.vue
│   │   │   └── user/
│   │   │       └── OwnInfo.vue
│   │   ├── manager/
│   │       └── Manager.vue
│   ├── App.vue
│   └── main.js
├── .gitignore
├── package.json
├── README.md
└── vue.config.js
```


## 启动项目

### 前置要求

1. **后端环境**
   - Go 1.20+
   - MySQL 5.7+ / 8.0+
   - Redis 6.0+
   - (可选) Kafka 2.8+ (如果使用 kafka 消息模式)

2. **前端环境**
   - Node.js 16.x+
   - npm 或 yarn

### 本地开发环境启动步骤

#### 一、准备数据库

1. 启动 MySQL 服务
```bash
# Linux/Mac
sudo systemctl start mysql

# Windows
net start mysql
```

2. 创建数据库
```sql
CREATE DATABASE kama_chat_server CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. 启动 Redis 服务
```bash
# Linux/Mac
sudo systemctl start redis

# Windows
redis-server
```

#### 二、配置后端

1. 修改配置文件 `configs/config.toml`

2. 创建必要的目录
```bash
mkdir -p static/avatars static/files logs
```

3. 安装依赖并启动后端
```bash
cd code_project\goProject\wechat
go mod download
go run cmd/kama_chat_server/main.go
```

后端将在 `https://127.0.0.1:8000` 启动

#### 三、配置并启动前端

1. 进入前端目录
```bash
cd web/chat-server
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 配置后端 API 地址
- 检查前端代码中的 API 配置
- 确保指向 `https://127.0.0.1:8000`

4. 配置 WebRTC (可选，本地开发可跳过)
- 如需音视频功能，在 `src/views/chat/contact/ContactChat.vue` 中配置 ICE 服务器
- 本地开发可将 `iceServers` 设为空数组

5. 启动前端开发服务器
```bash
npm run serve
# 或
yarn serve
```

前端开发服务器将在 `http://localhost:8080` 启动

#### 四、访问应用

1. 打开浏览器访问前端地址（如 `http://localhost:8080`）
2. 注册新用户或登录
3. 开始使用聊天功能


# todoList

-  多对多群聊

-  nginx分布式部署

  
