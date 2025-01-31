# sing-box-node-merger

[English](./README.md)

一个用于合并和管理 Sing-Box 订阅节点的工具，支持从多个订阅链接中提取节点并生成统一的配置文件。

## 功能特性

📥 多订阅链接支持：支持从多个`sing-box`格式订阅链接中提取节点。

🛠️ 节点过滤：支持正则表达式过滤节点，创建策略组。

🔄 自动更新：支持定期自动更新订阅节点。

📄 配置文件生成：生成符合 Sing-Box 格式的配置文件。

🧩 模块化设计：易于扩展和自定义。

## 安装

### 前提条件

Node.js

npm

### 安装步骤

```bash
git clone https://github.com/your-username/SingBox-SubMerger.git
cd sing-box-node-merger
```

## 使用方法

### 1. 配置订阅链接

在 `config.json` 文件中添加你的订阅链接，填写sing-box配置文件的路径：

```json
{
  "subscriptions": [
    "https://example.com/sub1",
    "https://example.com/sub2"
  ],
  "config_directory":"./sing-box-config.json",
  "output_directory": "./sing-box-config.json",
  "outbounds":[]
}
```

### 2. 使用

```bash
npm start
```

### 3. 使用生成的配置文件

将生成的配置文件复制到你的 Sing-Box 配置目录中，并重启 Sing-Box 服务。

## 配置选项

`config.json` 说明

- subscriptions: 订阅链接列表，当内容只有一项时，可以忽略 JSON 数组 [] 标签（支持本地路径或远程链接）。
- config_directory: sing-box配置文件地址（支持本地路径或远程链接）。
- output_directory: 生成的配置文件路径。
- outbounds: [sing-box配置的outbounds项](https://sing-box.sagernet.org/zh/configuration/outbound)，此处支持使用正则表达式筛选节点，需要包含原配置文件中的**完整配置**。详见[示例](#示例)。

> 可遵循原版sing-box手动使用outbounds项指定节点，也可使用regex项筛选节点。**若同时使用outbounds和regex项，则outbounds项无效。**

## 许可证

本项目基于 ISC 许可证开源。

## 示例

以下是一个订阅节点的格式示例：

``` json
{
  "outbounds": [
    {
      "type": "vmess",
      "tag": "node-1",
      "server": "example.com",
      "port": 443,
      "uuid": "your-uuid",
      "alterId": 0,
      "security": "auto"
    },
    {
      "type": "trojan",
      "tag": "node-2",
      "server": "example.org",
      "port": 443,
      "password": "your-password"
    }
  ]
}
```

以下是outbounds的格式示例：

```json
"outbounds": [
        {
            "tag": "Proxy",
            "outbounds": [
                "HK",
                "Japan",
                "Singapore",
                "US",
                "Others",
                "direct"
            ],
            "type": "selector"
        },
        {
            "tag": "direct",
            "type": "direct"
        },
        {
            "tag": "HK",
            "regex": "香港",
            "type": "selector"
        },
        {
            "tag": "Japan",
            "regex": "日本",
            "type": "selector"
        },
        {
            "tag": "Singapore",
            "regex": "新加坡",
            "type": "selector"
        },
        {
            "tag": "US",
            "regex": "美国",
            "type": "selector"
        },
        {
            "tag": "Others",
            "regex": "^(?!.*(香港|日本|美国|新加坡)).*$",
            "type": "selector"
        }
    ]
```
