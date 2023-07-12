<!-- omit in toc -->
# TypeScript

This module was established to learn `TypeScript` and Test-Driven Development (TDD). It contains `Task Manager` app written in TypeScript and unit tests. Major part of app code was written with TDD methodology, howevere test folder contains also some posterior tests.

<br>

<!-- omit in toc -->
## Table of Contents
- [Description](#description)
- [Usage](#usage)

<br>



## Description
The `Task Manager` is a small CLI application which helps to manage everyday tasks. You can provide a task name and dedline. Task manager will sort task according to their priority. Finished task you can mark as accomplished. 
<br>

## Usage
The `Task Manager` uses a `MongoDB` database started on the localhost. Thus, you need to [download](https://www.mongodb.com/try/download/community) and install `MongoDB`. All necessary configurations for transpilation and testing you will find in `tsconfig.json` and `package.json`, respectively.

Tu use the library you can clone the repository and install all dependencies with command
```console
npm install
```

To start using `Task Manager` you have transpile `TypeScript` to `JavaScript`. You can do it with TSC TypescriptCompiletr. To install it globaly run:
```console
npm install -g typescript
```
Now you can simply start `Task Manager` by typing in the console:
```console
npm run manager
```
To run all tests type in the console:
```console
npm test
```




