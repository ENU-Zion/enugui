[![version](https://img.shields.io/github/release/enumivo/enu-voter/all.svg)](https://github.com/enumivo/enu-voter/releases)
[![issues](https://img.shields.io/github/issues/enumivo/enu-voter.svg)](https://github.com/enumivo/enu-voter/issues)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/enumivo/enu-voter/master/LICENSE)
![downloads](https://img.shields.io/github/downloads/enumivo/enu-voter/total.svg)

# enu-voter - ENU Block Producer Voting & Wallet

`enu-voter` is a limited-functionality release of a light wallet being designed for the ENU blockchain. This application can be used to connect to a remote ENU API endpoint to perform producer voting actions and a few basic wallet commands.

[![enu-voter screenshot](https://raw.githubusercontent.com/enumivo/enu-voter/master/enu-voter.png)](https://raw.githubusercontent.com/enumivo/enu-voter/master/enu-voter.png)

### Features

- **Block Producer Voting**: Select which block producers to support and cast your vote. Please note that the block producer voting UI is not a research tool; it is a simple interface that provides a secure way to vote.
- **Token Transfers**: Transfer ENU or any other token you may have a balance for to another user or exchanges.
- **CPU/Bandwidth Staking**: Stake your ENU as either Bandwidth or CPU. This grants rights to resource usage on the network, in addition to conveying weight while voting for block producers.
- **Local Wallet**: Set a password while importing your private key to create a local wallet. Your key will be encrypted locally using this password. This password will be required each time you need to unlock the wallet.
- **Temporary Usage**: If you prefer not to store your keys within the application, simply choose not to set a password. When the application quits, your key will be forgotten.

## Get enu-voter

### Releases

Current 0.1.2 release downloads:

- [Windows Installer](https://github.com/enumivo/enu-voter/releases/download/v0.1.2/enu-voter-setup-0.1.2.exe)
- [macOS Package](https://github.com/enumivo/enu-voter/releases/download/v0.1.2/enu-voter-0.1.2.dmg)
- [Linux (deb)](https://github.com/enumivo/enu-voter/releases/download/v0.1.2/enu-voter_0.1.2_amd64.deb)
- [Linux (snap)](https://github.com/enumivo/enu-voter/releases/download/v0.1.2/enu-voter_0.1.2_amd64.snap)

The latest release will always be available on the releases page of this repository:

[https://github.com/enumivo/enu-voter/releases](https://github.com/enumivo/enu-voter/releases)

To determine which file you need, if you are a...

- **MacOS User**: Download either the DMG (`enu-voter-***.dmg`) or ZIP (`enu-voter-***-mac.zip`) file.
- **Windows User**: Download the EXE (`enu-voter-***.exe`) file.
- **Linux User**: Download either the SNAP (`enu-voter-***-_amd64.snap`) or DEB (`enu-voter-***-_amd64.deb`) file

### Security: Private Keys

When using `enu-voter`, all transactions are signed within the application and your key is never transmitted. If a local wallet password is specified, the application will also save and encrypt your key for future use, using AES-256 encryption. The current password/key encryption scheme can [currently be found here](https://github.com/aaroncox/enu-voter/blob/master/app/shared/actions/wallet.js#L71-L86).

### Build it yourself

If you'd rather build the application yourself, please ensure you have nodejs/npm/yarn already installed locally.

**Note**: If you are configuring this Electron application within a Windows development environment, it will involve additional steps.

```
git clone git@github.com:enumivo/enu-voter.git enu-voter
cd enu-voter
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
git clone git@github.com:enumivo/enu-voter.git enu-voter
cd enu-voter
yarn install
yarn dev
```

### Credits

The development of this application is being led by members of the [Enumivo](https://enumivo.org) team in an effort to let stakeholders participate in ENU’ governance.
