# cli-web-cloner

A simple CLI tool to make your local web development project deployment a breeze.

## Table of Contents

#### [prerequisites](#prerequisites)

- [Terminal](#terminal)
- [Node.js](#nodejs)
- [NPM](#npm)
- [Vercel](#vercel)
- [TransIp](#transip)
    - [How to create a personal API token](#how-to-create-a-personal-api-token)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
    - [`test`](#1-test)
    - [`init`](#2-init)
    - [`link`](#3-link)
    - [`list`](#4-list)
    - [`build`](#5-build)
    - [`pull`](#6-pull)
    - [`auth`](#7-auth)
        - [`login`](#login)
        - [`logout`](#logout)
        - [`whoami`](#whoami)
        - [`status`](#status)
    - [`clone`](#8-clone)
    - [`transip`](#9-transip)
        - [`set-token`](#set-token)
        - [`get-token`](#get-token)
        - [`update-token`](#update-token)
        - [`delete-token`](#delete-token)
    - [`domain`](#10-domain)
        - [`check`](#check)
        - [`list`](#list)
        - [`buy`](#buy)
    - [Vercel Domain Subcommands](#vercel-domain-subcommands)
        - [`add`](#add)
        - [`buy`](#buy)
        - [`inspect`](#inspect)
        - [`list`](#list)
        - [`move`](#move)
        - [`remove`](#remove)
        - [`transfer`](#transfer)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Prerequisites

A few things you need to have installed and set up before you can use this tool.

### Terminal

The tool is a command-line tool, so you need to have a terminal to run it. You can use the terminal that comes with your
operating system, or you can use a third-party terminal like [Hyper](https://hyper.is/).
For more information on how to use the terminal, you can check out
this [tutorial](https://www.codecademy.com/articles/command-line-commands).

### Node.js

This tool is built with Node.js, so you need to have it installed on your system. You can download it from
the [official website](https://nodejs.org/).
Follow the instructions on the [official website](https://nodejs.org/) to install it on your system.

### NPM

npm is the package manager for Node.js. It comes with Node.js, so you don't need to install it separately.

### Vercel

To use this tool the user needs to have a Vercel account. You can sign up for a free account on
the [Vercel website](https://vercel.com/).
This tool uses Vercel to deploy the project to the web.

### TransIp

To use this tool the user needs to have a TransIp account. You can sign up for a free account on
the [TransIp website](https://www.transip.nl/). For domain purchase and configuration for TransIp domains a user needs
to create a personal API token.

#### How to create a personal API token

To create this token log in to the TransIp dashboard and navigate to the **control panel** > **settings** > **API**.
There the user needs to enable the API status, after enabling the API status the user can create a personal API token.
This can be done by going to the **Access tokens** section and creating a new 1 month valid token.
<br />
<br />
⚠️ **Warning**: This token is only valid for 1 month, after that the user needs to create a new token. And set the new
token.

## Installation

To install this tool, you can use the following command:

```bash
npm install -g cli-web-cloner
```

This will install the tool globally on your system, so you can use it from anywhere.

## Usage

To use this tool, you can run the following command:

```bash
cloner
```

This will start the tool, and you will be asked to enter the URL of the website you want to clone.

## Commands

The `cloner` CLI tool provides several commands to help you manage your web projects and domains. Below is a detailed
guide on how to use each command.

### 1. `test`

This command checks if the CLI tool is working correctly.

- **How to Use:**
    1. Open your terminal.
    2. Type the following command and press Enter:
  ```sh
  cloner test
  ```
    3. You should see a message saying "Test successful".

### 2. `init`

This command sets up a new project for you.

- **How to Use:**
    1. Decide on a name for your project.
    2. Open your terminal.
    3. Type the following command, replacing `<projectName>` with your project name, and press Enter:
  ```sh
  cloner init <projectName>
  ```
    4. If you want to use a specific framework (like React or Vue), add `-f <frameworkName>` to the command.

### 3. `link`

This command links an existing project.

- **How to Use:**
    1. Open your terminal.
    2. Type the following command and press Enter:
  ```sh
  cloner link
  ```
    3. If you want to skip confirmation, add `-y` to the command.

### 4. `list`

This command lists all your projects.

- **How to Use:**
    1. Open your terminal.
    2. Type the following command and press Enter:
  ```sh
  cloner list
  ```
    3. If you want to update the list, add `-u` to the command.

### 5. `build`

This command builds your project, making it ready for deployment.

- **How to Use:**
    1. Open your terminal.
    2. Type the following command and press Enter:
  ```sh
  cloner build
  ```
    3. If you want to build for production, add `-p` to the command.

### 6. `pull`

This command pulls the latest version of your project.

- **How to Use:**
    1. Open your terminal.
    2. Type the following command and press Enter:
  ```sh
  cloner pull
  ```

### 7. `auth`

This command helps you manage your Vercel account authentication.

#### Subcommands:

- **login**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command, replacing `<email>` with your email address, and press Enter:
      ```sh
      cloner auth login <email>
      ```

- **logout**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command and press Enter:
      ```sh
      cloner auth logout
      ```

- **whoami**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command and press Enter:
      ```sh
      cloner auth whoami
      ```

- **status**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command and press Enter:
      ```sh
      cloner auth status
      ```

### 8. `clone`

This command clones a website project.

- **How to Use:**
    1. Open your terminal.
    2. Type the following command, replacing `<projectName>` with your project name, and press Enter:
  ```sh
  cloner clone <projectName>
  ```

### 9. `transip`

This command group helps you manage your Transip API token.

#### Subcommands:

- **set-token**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command, replacing `<token>` with your Transip API token, and press Enter:
      ```sh
      cloner transip set-token <token>
      ```

- **get-token**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command and press Enter:
      ```sh
      cloner transip get-token
      ```

- **update-token**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command, replacing `<token>` with your Transip API token, and press Enter:
      ```sh
      cloner transip update-token <token>
      ```

- **delete-token**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command and press Enter:
      ```sh
      cloner transip delete-token
      ```

### 10. `domain`

This command group helps you manage domains.

#### Subcommands:

- **check**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command, replacing `<domain>` with the domain name, and press Enter:
      ```sh
      cloner domain check <domain>
      ```

- **list**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command and press Enter:
      ```sh
      cloner domain list
      ```

- **buy**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command, replacing `<domain>` with the domain name, and press Enter:
      ```sh
      cloner domain buy <domain>
      ```

#### Vercel Domain Subcommands:

- **add**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command, replacing `<domain>` and `<project>` with the domain and project names, and press
           Enter:
      ```sh
      cloner domain vercel add <domain> <project>
      ```

- **buy**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command, replacing `<domain>` with the domain name, and press Enter:
      ```sh
      cloner domain vercel buy <domain>
      ```

- **inspect**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command, replacing `<domain>` with the domain name, and press Enter:
      ```sh
      cloner domain vercel inspect <domain>
      ```

- **list**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command and press Enter:
      ```sh
      cloner domain vercel list
      ```

- **move**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command, replacing `<domain>` and `<scopeName>` with the domain name and scope name, and
           press Enter:
      ```sh
      cloner domain vercel move <domain> <scopeName>
      ```

- **remove**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command, replacing `<domain>` with the domain name, and press Enter:
      ```sh
      cloner domain vercel remove <domain>
      ```

- **transfer**
    - **How to Use:**
        1. Open your terminal.
        2. Type the following command, replacing `<domain>` with the domain name, and press Enter:
      ```sh
      cloner domain vercel transfer <domain>
      ```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [Vercel](https://vercel.com/)
- [TransIp](https://www.transip.nl/)
- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)

## Author

- Joeri Schenk
- [GitHub](https://github.com/Joeri5)