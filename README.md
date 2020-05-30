# Aws-Cms-Serverless

## Overview

This project was created with the purpose to deploy a servless infrastructure using the most performatic aws technologies currencly, like lambda functions, SQS , AuroraDB, and others to provide a hight scalabilyty and 100% uptime project in any scenary.

In time, to provider all this structure in a simple way, this project uses Terraform to manage the infrastructure as a code and Serverless Framework to manage lambda functions, that is, simplify the deployment of all these technologies for you.

---

## How it works

This project is intended to guide you step by step to deploy this serverless application on your AWS server, so follow all the steps below to get it done.

---

## 1 - Setup your environment

### 1.1 - Setup NodeJS and NPM

In the first of all, this project was developed using node.js and npm (node package manager), so you have to make sure to have this installed and configured in your environment.

For more documentation about npm, see [this link](https://www.npmjs.com/get-npm.).

---

### 1.2 - Setup your AWS access

You will need to generate IAM credentials at AWS Panel to access it programmatically and allow Serverless and Terraform access.

_Make sure to allow `Programmatic access` and provide `AdministratorAccess` to this user for Serverless and Terraform be able to manage this infrastructure_

For more documentation about IAM, see [this link](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html).

--- 

### 1.3 - Install Serverless cli

We going to use the Serverless Framework to deploy our lambda functions, so, for that, run this code in your terminal to install it globally:  

```bash
$ npm install -g serverless
```
Installing it globally you will get access to serverless cli.

After install serverless make sure to setup your aws credentials with command:

```bash
$ serverless config credentials -o --provider aws -key=<YOUR_AWS_ACCESS_KEY> --secret=<YOUR_AWS_SECRET_ACCESS_KEY>
```

For more knowledge about serverless, see the docs at [serverless](https://www.serverless.com/framework/docs/).

--- 

### 1.4 - Install Terraform cli

Now, you will need to install terraform executable to manage your infrastructure as a code, so follow these steps:

* Access [this link](https://www.terraform.io/downloads.html)
* Download the appropriate package
* Unzip it
* Add terraform executable to yout path

_When you're done, you will be able to run `terraform` cli command._
```bash
$ terraform
Usage: terraform [--version] [--help] <command> [args]
```

For more knowledge about terraform, check the [TERRAFORM.md](./TERRAFORM.md) as a fast documentation.

For this project we going to use the [AWS](https://www.terraform.io/docs/providers/aws/index.html) provider.

--- 

## 2 - Deploying everything

### 2.1 - Deploy lambda functions with Serverless

To deploy all the lambda functions located at `src` folder, you just need to run the command below, and you're done.

```bash
$ serverless deploy -v
```
_With it, all the source code that will represents our API will be online to be consumed._

---

### 2.2 - Deploy the infrastructure to AWS with Terraform
_1 - initialize the terraform in his project to download all aws plugins needed to work:_
```bash
terraform init
```
_2 - To see what going to be modified in yours aws, just run:_
```bash
terraform plan
```
_3 - Now, if everithing is ok on the plan, lets apply it:_
```bash
terraform apply
```

---
