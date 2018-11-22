# EnuGui - Enumivo Block Producer Voting & Wallet

`EnuGui` is a limited-functionality release of a light wallet being designed for the Enumivo blockchain. This application can be used to connect to a remote Enumivo API endpoint to perform producer voting actions and a few basic wallet commands.

## Get EnuGui

The latest release will always be available on the releases page of this repository:

[https://github.com/enumivo/enugui/releases](https://github.com/enumivo/enugui/releases)

To determine which file you need, if you are a...

- **MacOS User**: Download either the DMG (`EnuGui-***.dmg`) or ZIP (`EnuGui-***-mac.zip`) file.
- **Windows User**: Download the EXE (`EnuGui-***.exe`) file.
- **Linux User**: Download either the SNAP (`EnuGui-***-_amd64.snap`) or DEB (`EnuGui-***-_amd64.deb`) file

### Endpoints

We offer a public list of nodes within this repository for use with this application:

[https://github.com/enumivo/enugui/blob/master/nodes.md](https://github.com/enumivo/enugui/blob/master/nodes.md)

This list will be updated over time and can be referenced from within the initial connection screen in the app.

### Build it yourself

If you'd rather build the application yourself, please ensure you have nodejs/npm/yarn already installed locally.

**Note**: If you are configuring this Electron application within a Windows development environment, it will involve additional steps.

```
git clone https://github.com/enumivo/enugui.git EnuGui
cd EnuGui
npm install
cd app
npm install
cd ..
```

Then, depending on what OS you use, either:

- MacOS: `npm run package-mac`
- Linux: `npm run package-linux`
- Windows: `npm run package-win`

If you are building a binary, it must be compiled from the target OS. Windows builds need to be built on Windows, etc.

The files built will be located in the `releases` folder within the root project folder.

### Running development mode

```
git clone https://github.com/enumivo/enugui.git EnuGui
cd EnuGui
npm install
cd app
npm install
cd ..
npm run dev
```
