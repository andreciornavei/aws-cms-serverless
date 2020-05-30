# Aws-Cms-Serverless

This project was created with the purpose to deploy a servless infrastructure using the most performatic aws technologies currencly, like lambda functions, SQS , AuroraDB, and others to provide a hight scalabilyty and 100% uptime project in any scenary.

In time, to provider all this structure in a simple way, this project uses Terraform to manage the infrastructure as a code and Serverless Framework to manage lambda functions, that is, simplify the deployment of all these technologies for you.

---

## How to use it

In the first of all, you will need to install terraform executable to manage your infraestructure as a code. 

* Download the appropriate package
* Unzip it
* Add terraform executable to yout path

```bash
$ terraform
Usage: terraform [--version] [--help] <command> [args]
```

For more knowledge about terraform, check the [TERRAFORM.MD](./TERRAFORM.MD) as a fast documentation and examples.

For this project we going to use the [AWS](https://www.terraform.io/docs/providers/aws/index.html) provider.

--- 

## Setup yours AWS access

Generate yours IAM credentials at AWS Panel to access it programatically.

Then create a file inside this project on credentials/`aws` where `aws` is the file, with the following content:
#### credentials/aws
```txt
[aws-cms-serverless]
aws_access_key_id = "<YOUR_ACCESS_KEY_ID>"
aws_secret_access_key = "<YOUR_SECRET_ACCESS_KEY_ID>"
```
_This will allow the terraform access yours aws panel to manage all needed services._

--- 

## Deploy the infrastructure to AWS
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
