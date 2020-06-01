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

_After install `node.js` and `npm`, run the code below to initialize the package and install all dependencies for this project:_

```bash
$ npm install
```

For more documentation about npm, see [this link](https://www.npmjs.com/get-npm.).

---

### 1.2 - Setup your AWS access

You will need to generate IAM credentials at AWS Panel to access it programmatically and allow Serverless and Terraform access.

_Make sure to allow `Programmatic access` and provide `AdministratorAccess` to this user for Serverless and Terraform be able to manage this infrastructure_

For more documentation about IAM creation, see [this link](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html).

Now, this project uses shared credentials file to get access of your IAM credentials. Where you keep the shared credentials file depends on your operating system:

* The shared credentials file on Linux, Unix, and macOS: `~/.aws/credentials`
* The shared credentials file on Windows: `C:\Users\USER_NAME\.aws\credentials`

_So, after generate your credential file, put it inside your aws shared credentials file_

Once you follow those instructions, you should see text similar to the following in the credentials file, where `<YOUR_ACCESS_KEY_ID>` is your access key ID and `<YOUR_SECRET_ACCESS_KEY>` is your secret access key:

```txt
[default]
aws_access_key_id = <YOUR_ACCESS_KEY_ID>
aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
```

---

### 1.3 - Install Serverless cli

We going to use the Serverless Framework to deploy our lambda functions, so, for that, run this code in your terminal to install it globally:

```bash
$ npm install -g serverless
```

Installing it globally you will get access to serverless cli.

After install serverless make sure to setup your aws credentials with command below (_just for security_):

```bash
$ serverless config credentials -o --provider aws -key=<YOUR_AWS_ACCESS_KEY> --secret=<YOUR_AWS_SECRET_ACCESS_KEY>
```

For more knowledge about serverless, see the docs at [serverless](https://www.serverless.com/framework/docs/).

---

### 1.4 - Install Terraform cli

Now, you will need to install terraform executable to manage your infrastructure as a code, so follow these steps:

- Access [this link](https://www.terraform.io/downloads.html)
- Download the appropriate package
- Unzip it
- Add terraform executable to yout path

_When you're done, you will be able to run `terraform` cli command._

```bash
$ terraform
Usage: terraform [--version] [--help] <command> [args]
```

For more knowledge about terraform, check the [TERRAFORM.md](./TERRAFORM.md) as a fast documentation.

For this project we going to use the [AWS](https://www.terraform.io/docs/providers/aws/index.html) provider.

On the final step, access the terraform.tf file and make sure that the value of provider `aws.shared_credentials_file` is the same of yours OS system, this is setted for _Linux, Unix, and macOS_ by default.

---

## 2 - Deploying everything

---

### 2.1 - Deploy the infrastructure to AWS with Terraform

To start deploy, the first service we need to release is `terraform`, it will able us to enable SQS and RDS resources for execute the next steps.

_1 - initialize the terraform in this project to download all aws plugins needed to work:_

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

### 2.2 - Deploying our database structure with Sequelize

Now, we should have the RDS online, so we can run sequelize commands to initialize our database and records on server.

_2.2.1 Run this command to create the database on server._

```bash
$ npx sequelize db:create
```

_2.2.2 Run this command to create all tables in database._

```bash
$ npx sequelize db:migrate
```

_2.2.3 Run this command to create default records on database tables._

```bash
$ npx sequelize db:seed:all
```

---

### 2.3 - Deploy lambda functions with Serverless

As the last serve to release, we going to deploy serverless that will upload all ours lambda functions and integrate with others services deployed before.

To deploy all the lambda functions located at `src/lambda` folder, you just need to run the command below, and you're done.

```bash
$ serverless deploy -v
```

_With it, all the source code that will represents our API will be online to be consumed._

---

## 3 - Testing

### 3.1 - Invoke your functions locally

For test your lambda functions without an endpoint API, you can invoke it functions using `serverless invoke local`, like code below where `status` is yours function name:

```bash
$ serverless invoke local -f status -l
```

---

### 3.2 - serverless-offline

For this section we going to test the serverless lambda functions offline as a endpoint API, it should be a good pratice to test the project during development. I prepared a script at package.json scripts to deploy a local server and test it during development, so run the command below to start the serverless offline if you want:

```bash
$ npm run dev
```
