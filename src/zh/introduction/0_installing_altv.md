# 安装服务器文件

## 前提条件

在开始之前, 请安装这些程序和实用程序.

-   [NodeJS 13+](https://nodejs.org/en/download/current/)
-   [Visual Studio Code](https://code.visualstudio.com/download)
-   [GIT](https://git-scm.com/downloads)
-   [alt:V 客户端](https://altv.mp/#/downloads)

## 一般假设

本指南假定您将在Windows开发环境中工作.

-   您应该知道如何使用命令提示符或Powershell
-   您应该知道如何打开命令提示符或Powershell
-   您应该知道可以在命令提示符或Powershell中运行.exe文件
-   您应该了解非常基本的JavaScript知识.

**重要**

所有带有`$`前缀的代码块均为在命令提示符或Powershell中运行.

**切记** 复制命令时, 不要多次复制`$`.

## 安装altv-pkg

[altv-pkg](https://github.com/stuyk/altv-pkg) 是一个实用程序, 可让您早Windows或Linux上的服务器快速启动二进制文件. 这还将为您提供基础资源.

您可以从命令提示符安装它.

```sh
$ npm install -g altv-pkg
```

如果您在安装全局文件时遇到麻烦。 使用**管理权限**打开**Powershell**并运行以下命令.

```sh
$ Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted -Force;
```

通过检查版本来验证安装.

```sh
$ altv-pkg --version
```

## 使用altv-pkg

安装后, 我们将下载服务器文件.

为您的服务器创建一个目录. 然后在该目录中打开命令提示符.

```sh
$ altv-pkg d release
```

这将提示您有关正在创建的游戏模式的信息.

默认情况下, 服务器文件和资源文件将自动在当前目录中生成.

按照屏幕上的说明进行操作.

-   **N** 语音
-   **Y** 示例资源

![](../../img/cmd_altvpkg.gif)

## 了解下载的文件

重要的是了解一些文件和下载服务器二进制文件后创建的一般结构. 这是您在运行`altv-pkg d release`之后应该下载的文件或一些常规文件.

```
|   altv-server.exe
|   libnode.dll
|   package-lock.json
|   package.json
|   server.cfg
|   update.json
|
+---data
|       vehmodels.bin
|       vehmods.bin
|
+---modules
|       js-module.dll
|
\node_modules
\---resources
    \---example
        |   resource.cfg
        |
        +---client
        |       startup.js
        |
        \---server
                startup.js
```

### altv-server.exe

这是用于运行服务器的主要二进制文件. 您可以从命令提示符运行.

```
$ altv-server.exe
```

使用 `Ctrl + C` 关闭服务器.

### package.json

这是定义您正在使用的`node_modules`的地方. 在此安装服务器端可能使用的依赖包. 请记住, 您不能在客户端使用`node_modules`.

```json
{
    "name": "altv-pkgserver",
    "version": "0.0.0",
    "description": "Don't worry we made this package.json for you.",
    "main": "index.js",
    "scripts": {
        "update": "altv-pkg d release"
    },
    "author": "stuyk",
    "type": "module",
    "prettier": {
        "printWidth": 120,
        "tabWidth": 4,
        "singleQuote": true,
        "bracketSpacing": true
    },
    "devDependencies": {
        "@altv/types-client": "^1.1.1",
        "@altv/types-natives": "^1.1.0",
        "@altv/types-server": "^1.4.2",
        "@altv/types-webview": "^1.0.2"
    }
}
```

此结构中定义的重要内容.

-   我们正在使用 [VSCode的漂亮扩展](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   我们正在使用`type`: `module`来支持 [ES6 Syntax](https://www.w3schools.com/js/js_es6.asp).
-   我们可以通过从主目录运行`$ npm run update`来更新服务器文件.

这主要是package.json的结构, 并且大多数功能类似于普通的NodeJS项目.

### server.cfg

这使用自定义解析器进行服务器的配置.

```sh
name: "测试服务器",
host: "0.0.0.0",
port: 7788,
players: 1024,
#password: "verysecurepassword",
announce: false,
#token: no-token,
gamemode: "自由模式",
website: "test.com",
language: "en",
description: "测试",
debug: false,
modules: [
  "js-module",
],
resources: [
    "example"
],
tags: [
  "customTag1",
  "customTag2",
  "customTag3",
  "customTag4"
]
```

#### password

密码是可选参数. 去掉`#`即可启用.

#### token

令牌是可选参数. 去掉`#`. 您可以通过向官方Discord频道列表中的机器人之一发送消息来从alt:V Discord中获得令牌.

#### debug

为了在开发模式下使用服务器, 建议设置为true. 如果您在自己的服务器上设置了`debug`, 这将允许重新连接到服务器. 可了解[客户端配置](https://wiki.altv.mp/Altv.cfg)

#### resources

您可以在此处列出要使用的`/resources`文件夹内的文件夹. 所有资源都必须在其各自的文件夹中具有`resource.cfg`才能作为资源加载.

这是`/resources/example`文件夹中的`resource.cfg`.

```sh
type: js,
main: server/startup.js,
client-main: client/startup.js,
client-files: [
	client/*
],
deps: []
```

服务器端的主要入口是`example`资源, 是`/resources/example/server/startup.js`

客户端方面相同, 只是使用`client`而不是`server`

### /data

该文件夹中有数据文件, 可帮助我们定义哪些车辆名称与哪些值对应. 这些应该下载并自动使用.

### /modules

在这里, 您可以为使用不同语言框架的模块加载特殊的`.dll`或`.so`文件. 也可以C# Lua等等. 这些通常是由为alt:V开发的用户生成的. 社区制作.

### /node_modules

这是您从NPM下载的依赖软件包的安装位置. 这是从NPM安装Stanford Javascript加密库的示例.

```sh
$ npm i sjcl
```

### /resources

资源是创建新资源的地方, 可以将其加载到`server.cfg`中. 强烈建议您创建一个非常大的项目, 出于性能和易用性的考虑，坚持使用单一资源.

## 打开工作区

打开在VS:Code中设置alt:V服务器的文件夹.

看起来应该像下面的图片.

![](../../img/vscode_entry.png)

您可以在`resources/example/startup.js`内部开始编写代码.

确保您的`server.cfg`的资源部分中有`example`.

```sh
resources: [
  "example"
],
```

从命令行运行服务器以确保所有内容均已正确加载.

![](../../img/cmd_loaded.png)

## 连接中

您可以通过打开alt:V 客户端并使用直接连接来进行连接.

```
127.0.0.1:7788
```

## 服务器端

服务器端代码应写在`server`文件夹中.

您还需要为alt:V服务器端导入`types`.

```js
/// <reference types="@altv/types-server" />
import alt from 'alt-server';

alt.log('测试');
```

您的服务器端现在应该具有自动完成功能.

![](../../img/vscode_server_test.png)

## 客户端

客户端代码应写在`client`文件夹中.

这是您可以主动使用`native`的唯一部分.

您还需要为alt:V客户端导入`types`.

```js
/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import alt from 'alt-client';
import * as native from 'natives';

alt.log(`您已连接! 太好了!`);
```

您的客户端现在应该具有自动完成功能.

![](../../img/vscode_client_test.png)
