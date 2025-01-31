# sing-box-node-merger

[中文文档](./README_zh-cn.md)

A simple tool for merging and managing sing-box subscription nodes, supporting multiple subscription links.

## Functions

📥 Multiple Subscriptions Support: Extract nodes from multiple sing-box format subscription links.

🛠️ Nodes Filter：Filter nodes with regex.

🔄 Auto Update：Supports periodic automatic updates of subscription nodes.

📄 Config File：Auto generate sing-box format config files.

🧩 Modular Design：Easy to extend and customize.

## Installation

### Preparation

Node.js

npm

### Installation Procedure

```bash
git clone https://github.com/your-username/SingBox-SubMerger.git
cd sing-box-node-merger
```

## Usage

### 1. compelete config.json

Add your subscription links in `config.json` , sing-box format supported.

Fill out ``config_directory`` and ``output_directory``

Customize ``outbounds`` as you need.

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

### 2. Start

```bash
npm start
```

### 3. Use the output config file

Copy the output file to sing-box working directory and restart sing-box service.

## Configuration

`config.json` explanation

- subscriptions: An array of subscription links. You can ignore the JSON Array [] tag when the content is only one item both local and remote url are supported.
- config_directory: The url link of config file. Both local and remote url are supported).
- output_directory: The directory to place the output file.
- outbounds: [Outbounds in sing-box configuration](https://sing-box.sagernet.org/configuration/outbound). Regular expressions are supported for filtering nodes, and the **complete** configuration from the original configuration file must be included. For details, refer to[Sample](#sample)。

> You can manually specify nodes using the outbounds field as in the original sing-box configuration, or use the regex field to filter nodes. **If both outbounds and regex fields are used simultaneously, the outbounds field will be ignored.**

## License

This project is open-sourced under the ISC License.

## Sample

Here is an example of a subscription node format:

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

Here is an example of the outbounds field format:

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
            "regex": "hongkong",
            "type": "selector"
        },
        {
            "tag": "Japan",
            "regex": "japan",
            "type": "selector"
        },
        {
            "tag": "Singapore",
            "regex": "singapore",
            "type": "selector"
        },
        {
            "tag": "US",
            "regex": "us",
            "type": "selector"
        },
        {
            "tag": "Others",
            "regex": "^(?!.*(hongkong|japan|us|singapore)).*$",
            "type": "selector"
        }
    ]
```
