# enugui - Enumivo GUI Wallet

`enugui` is a limited-functionality release of a light wallet being designed for the ENU blockchain. This application can be used to connect to a remote ENU API endpoint to perform producer voting actions and a few basic wallet commands.

### Features

- **Block Producer Voting**: Select which block producers to support and cast your vote. Please note that the block producer voting UI is not a research tool; it is a simple interface that provides a secure way to vote.
- **Token Transfers**: Transfer ENU or any other token you may have a balance for to another user or exchanges.
- **CPU/Bandwidth Staking**: Stake your ENU as either Bandwidth or CPU. This grants rights to resource usage on the network, in addition to conveying weight while voting for block producers.
- **Local Wallet**: Set a password while importing your private key to create a local wallet. Your key will be encrypted locally using this password. This password will be required each time you need to unlock the wallet.
- **Temporary Usage**: If you prefer not to store your keys within the application, simply choose not to set a password. When the application quits, your key will be forgotten.

## Get enugui

The latest release will always be available on the releases page of this repository:

[https://github.com/enumivo/enugui/releases](https://github.com/enumivo/enugui/releases)

To determine which file you need, if you are a...

- **MacOS User**: Download either the DMG (`enugui-***.dmg`) or ZIP (`enugui-***-mac.zip`) file.
- **Windows User**: Download the EXE (`enugui-***.exe`) file.
- **Linux User**: Download either the SNAP (`enugui-***-_amd64.snap`) or DEB (`enugui-***-_amd64.deb`) file

### Security: Private Keys

When using `enugui`, all transactions are signed within the application and your key is never transmitted. If a local wallet password is specified, the application will also save and encrypt your key for future use, using AES-256 encryption. The current password/key encryption scheme can [currently be found here](https://github.com/aaroncox/enugui/blob/master/app/shared/actions/wallet.js#L71-L86).

### Endpoints

We offer a public list of nodes within this repository for use with this application:

[https://github.com/enumivo/enugui/blob/master/nodes.md](https://github.com/enumivo/enugui/blob/master/nodes.md)

This list will be updated over time and can be referenced from within the initial connection screen in the app.

### Build it yourself

If you'd rather build the application yourself, please ensure you have nodejs/npm/yarn already installed locally.

**Note**: If you are configuring this Electron application within a Windows development environment, it will involve additional steps.

```
git clone git@github.com:enumivo/enugui.git enugui
cd enugui
yarn install
```

Then either:

- MacOS: `yarn package`
- Linux: `yarn package-linux`
- Windows: `yarn package-win`
- All: `yarn package-all`

The files built will be located in the `releases` folder within the root project folder.

### Running development mode

```
git clone git@github.com:enumivo/enugui.git enugui
cd enugui
yarn install
yarn dev
```

