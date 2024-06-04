# CLI Web Cloner

CLI Web Cloner is a command-line application to clone websites and add domains automatically.

## Table of Contents

- [Installation](#installation)
    - [Installing Node.js](#installing-nodejs)
        - [Windows](#windows)
        - [macOS](#macos)
        - [Linux](#linux)
- [Usage](#usage)
- [Commands](#commands)
    - [clone](#clone)
    - [add-domain](#add-domain)
    - [list-domains](#list-domains)
    - [remove-domain](#remove-domain)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Installing Node.js

To run CLI Web Cloner, you need to have Node.js installed. Here are instructions for installing Node.js on various
operating systems.

#### Windows

1. Go to the [Node.js download page](https://nodejs.org/).
2. Download the Windows installer.
3. Run the installer. Follow the prompts to complete the installation.
4. Open a command prompt (CMD) and verify the installation by running:
    ```sh
    node -v
    npm -v
    ```

#### macOS

1. Go to the [Node.js download page](https://nodejs.org/).
2. Download the macOS installer.
3. Run the installer. Follow the prompts to complete the installation.
4. Open a terminal and verify the installation by running:
    ```sh
    node -v
    npm -v
    ```

Alternatively, you can use Homebrew:

```sh
brew install node
```

#### Linux

For most Linux distributions, you can install Node.js via the package manager.

Ubuntu/Debian:

```sh
sudo apt update
sudo apt install nodejs npm
```

#### CentOS/RHEL:

```sh
sudo yum install nodejs npm
```

For other distributions, refer to their respective package managers or follow the instructions on the Node.js download
page.

### Installing CLI Web Cloner

After installing Node.js, run the following command to install CLI Web Cloner:

```sh
npm install -g cli-web-cloner
```

## Usage

After installation, you can use the **cloner** command followed by any of the available commands and options.

## Commands

### **clone**

Clones a website.

**Usage**

```sh
cloner clone <url> [options]
```

### **Options**

- **-o, --output <path>**: Specify the output directory for the cloned website.
- **-d, --depth <number>**: Set the depth of cloning (default is 1).
- **-i, --include <pattern>**: Include only files matching the pattern.
- **-e, --exclude <pattern>**: Exclude files matching the pattern.
- **-h, --help**: Display help for the clone command.

### **add-domain**

Adds a domain to the configuration.

**Usage**

```shell
cloner add-domain <domain> [options]
```

### **Options**

- **-h, --help**: Display help for the add-domain command.

### **list-domains**

Lists all domains in the configuration.

**Usage**

```shell
cloner list-domains [options]
```

### **Options**

- **-t, --transip**: List domains in your TransIP account.
- **-v, --vercel**: List domains in your Vercel account.
- **-a, --all**: List all domains.
- **-h, --help**: Display help for the list-domains command.

### **remove-domain**

Removes a domain from the configuration.

**Usage**

```shell
cloner remove-domain <domain> [options]
```

### **Options**

- **-h, --help**: Display help for the remove-domain command.

## Configuration

CLI Web Cloner uses a configuration file named .clonerConfig in the user's home directory. The configuration file stores
information about the added domains.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to reach out to me at [info@joeri.net](mailto:info@joeri.net) if you have any questions or suggestions.