# sing-box-sub-merger

[中文文档](./README_zh-cn.md)

A [Sub-Store](https://github.com/sub-store-org/Sub-Store) script for merging subscription nodes to the remote hosted Sing-Box config file.

## Functions

🛠️ Nodes Filter：Filter nodes with regex.

🔄 Auto Update：Supports periodic automatic updates of subscription nodes.

📄 Config File：Auto generate sing-box format config files.

🧩 Modular Design：Easy to extend and customize.

## Installation

### Preparation

Sub-Store

## Usage

Create a new file in Sub-Store File

  ![image1.png](./assets/image1.png)

Fill in the link to the remotely hosted file at `URL`

  ![image2.png](./assets/image2.png)

Copy the content of `merge.js` to `Script`. Press save.
  
  ![image3.png](./assets/image3.png)
  
## Configuration

- outbounds: [Outbounds in Sing-Box configuration](https://sing-box.sagernet.org/configuration/outbound). Regular expressions are supported for filtering nodes, and the **complete** configuration from the original configuration file must be included.

> You can manually specify nodes using the outbounds field as in the original sing-box configuration, or use the regex field to filter nodes. **If both outbounds and regex fields are used simultaneously, the outbounds field will be ignored.**

## License

This project is open-sourced under the ISC License.
