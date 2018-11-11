`EnuGui` 是一款为ENU区块链设计的轻量级钱包的有限功能版本。此程序用于连接到远程ENU API节点来执行超级节点投票操作和一些基本钱包命令。

### 功能

- **超级节点投票**: 选择你支持的ENU超级节点并进行投票。请注意节点投票UI不是一个学术工具，它是一个简洁的界面，提供了一种安全的投票方式。
- **代币发送**: 将ENU或任何其他代币发送给其他用户或交易所。
- **CPU/带宽抵押**: 将你的ENU抵押作为带宽或CPU。这赋予了你使用网络资源的权利，同时也转换成了你给超级节点投票的权重。
- **本地钱包**: 为你导入私钥生成的钱包创建一个密码。你的私钥将使用此密码进行本地加密。每次解锁钱包时，都需要此密码。
- **临时使用**: 如果你不想讲私钥存储在该应用内，只要选择不设置密码就可以。当程序退出时，你的私钥将被忘记。

## 获取 EnuGui
最新的版本将在此REPO的发布页面中找到：

[https://github.com/enumivo/enugui/releases](https://github.com/enumivo/enugui/releases)

以下用来决定你需要下载哪一个版本, 如果你是...

- **MacOS 用户**: 下载 DMG (`enugui-***.dmg`) 或 ZIP (`enugui-***-mac.zip`) 文件。
- **Windows 用户**: 下载 EXE (`enugui-***.exe`) 文件。
- **Linux 用户**: 下载 SNAP (`enugui-***-_amd64.snap`) 或 DEB (`enugui-***-_amd64.deb`) 文件。

### 安全性: 私钥

当使用`enugui`时, 所有的交易都在程序内进行签名，你的私钥从来没有被发送。 如果你设置了本地钱包的密码, 该应用程序将使用AES-256对私钥进行加密保存以供将来使用。

### 节点

我们在程序中内置了以下REPO中提供的公共节点:

[https://github.com/enumivo/enugui/blob/master/nodes.md](https://github.com/enumivo/enugui/blob/master/nodes.md)

该节点列表将被实时更新，并在程序初始化时被调用。

### 亲自编译

如果你想自己编译该程序，请确保你本地已经安装了nodejs/npm/yarn。

**注意**: 如果你是在Windows环境下编译Electron应用，你还应做如下操作:

```
git clone git@github.com:enumivo/enugui.git enugui
cd enugui
yarn install
```

然后:

- MacOS: `yarn package-mac`
- Linux: `yarn package-linux`
- Windows: `yarn package-win`

编译的文件将在根项目目录下的`releases`文件夹中。

### 调试模式运行

```
git clone git@github.com:enumivo/enugui.git enugui
cd enugui
yarn install
yarn dev
```
