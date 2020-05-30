# Hot to use terraform

For knowledgement purpose, this Markdown is used to explain the most used commands to deploy your infrastructure.

In the first of all, to be clearly about why you need to use terraform, infrastrucutre as a code, is the setup of all technologies you pretend to use of some service like (AWS, GCP, Digital Oceam, Azure etc), so, using that, you do not need to configure all that things on the hand, just write what you want to happen inside a config file, and terraform will make all the work for you.

---

## Step 1 - Create configuration

_All commands you need to write ull be inside a text file with extension .tf. So Terraform will find theses files and execute it._

```bash
$ vim main.tf
```

## Step 2 - Initialize terraform

It will initialize the terraform in your project and download all the plugins needed for the provider you choose.

```bash
$ terraform init
```

## Step 3 - Check the execution plan

_This command will read all .tf files of your project and show you an execution plan about what going to happen when you deploy your intrastructure, so you can preview this plan to modify something or just go ahead._

```bash
$ terraform plan
```

## Step 4 - Build the Infrastructure

_This is the moment that terraform will make his magic, it will follow all the plan showed before and deploy your infrastrucutre_

_Pay attention, in this moment maybe could happen something wrong with your deploy, like conflict resources, so dont worry, what you need to do is understand what resources or versions is conflicting to solve it, and everything will be ok._

```bash
$ terraform apply
```

## Step 5 - Show what was builded

_This command is used to proof for you that all was planed, was executed and created on server._

```bash
$ terraform show
```

## Step X - Destroy the Infrastructure

_If your do not pretend to use it infrastructure anymore, you can destroy it, and like apply, every service configured in your server will be removed._

_To do that, you can execute a plan too using the flag `--destroy`, this will show you a destroy plan to you understand what going to happen when you destroy your infrastrucutre._

_after run your plan, just run `terraform destroy` to down all your services deployed._

```bash
$ terraform plan --destroy
$ terraform destroy #It will ask you, unless --force
```

---

## Example

This example will show you how your .TF file should look like with a simple instance on aws service.

### 1 - A simple infrasctruture
#### 1.1 Build a simple infrastrucutre

- _`resource` is the service you want to use in your configuration, in this case, we will use aws like `aws_instance`._

- _`ami` is the machine ISO you want to use on `AWS` like `Unix`, `Linux`, `Windows` and others._

- _`instance_type` is the type isntance you want to use, in this case `t2.micro` is one of the most weak processing resource but is part of `AWS` free tier in the first year and is perfect for tests._

- _`tags` is used to name your instance to find it on `AWS` panel._

```tf
resource "aws_instance" "example" {
    ami             = "ami-6edd3078"
    instance_type   = "t2.micro"

    tags {
        Name = "Test Machine"
    }
}
```

This is a simple file to work, but you can to use much more commands to improve your infrastrucutre and you can find it on [this terraform documentation](https://www.terraform.io/docs/providers).

#### 1.2 Improve it

For this example, we create a security group with some roles to be used in the first example.

_So, in the first of all, we reacte a resource `aws_security_group` with key `ssh`, then we can used the security_group created in our first instance passing it reference inside on `${aws_security_group.ssh.id}` with this generated id._

_Pay attention in just one thing, once it already has created an `aws_instance.example` on server, it will not create again, but will modify if necessary, in this case, will add the `vpc_security_group_ids` generated on the first command._

```tf
resource "aws_security_group" "ssh" {
    name            = "allow_ssh"
    description     = "Allow SSH connections"

    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_instance" "example" {
    ...
    vpc_security_group_ids = ["${aws_security_group.ssh.id}"]
}
```

#### 1.3 Destroy it

In the end, when you execute `plan --destroy` it will show you all the services will be removed from server based in yours `.tf` files.

```bash
$ terraform plan --destroy
...

- aws_instance.example
- aws_security_group.ssh

Plan: 0 to add, 0 to change, 2 to destroy
```

---

### 2 - Isolating parts

_You can separate your configurations in multiple files to turn it easy to manage and prevent huge files, it is possible because terraform load all files in memory to execute everithing together._

#### -security_group.tf:
```tf
resource "aws_security_group" "ssh" {
    name            = "allow_ssh"
    description     = "Allow SSH connections"

    ingress {
        ...
    }
}
```

#### -main.tf:
```tf
resource "aws_instance" "example" {
    ...
    vpc_security_group_ids = ["${aws_security_group.ssh.id}"]
}
```

---

### 3 Isolating components (A.K.A. Modules)

_Isolating it as modules you lost references between files, so to fix this issue, you can generate outputs to be imported in the file you are configurating._

```bash
.
|---- main.tf
|---- security_group
      |---- main.rf
      |---- outputs.tf
```

#### 3.1 Example

_For this example we going to describe all file contents and chang the main.tf file to import modules.

##### security_group/main.tf:
```tf
resource "aws_security_group" "ssh" {
    name            = "allow_ssh"
    description     = "Allow SSH connections"

    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
}
```

##### security_group/output.tf:
```tf
output "group_id" {
    value = "${aws_security_group.ssg.id}"
}
```

_And for -main.tf file we can import this module creating an alias name for it like `module "sec_group"`, define it location with `source` and use it output values:_ 

```tf
module "sec_group" {
    source = "./security_group"
}
resource "aws_instance" "example" {
    ami             = "ami-6edd3078"
    instance_type   = "t2.micro"
    vpc_security_group_ids = [${module.sec_group.group_id}]

    tags {
        Name = "Test Machine"
    }
}
```

#### 3.2 Getting modules

_Modules can be imported by `source` option from local path or github repository, but to use it, you need to use `terraform get` before use `terraform plan` and `terraform apply` because terraform needs to configure it internally, so will need to copy or clone it and organize the module repository on project as a hidden structure._ 

##### Before planning and applying:

```bash
$ terraform get
```

#### 3.3 To destroy it use the `--target`

_Separating the files in  modules, you can manage it isolated too, so if you want to destroy only `target`  modules, you can use:_

```bash
$ terraform plan --destroy --target module.security_group
$ terraform destroy --target module.security_group
```

#### 3.4 Using variables

_For best performances, automations and `reutilization` of modules, you can use variables and pass it variables as parameters to your module._

Defining variables:
##### security_group/variables.tf
```tf
variable "sg_nametag" {
    default = "Security Group Tag"
}
```
_Defining variables you can set `default values` to use it if you do not pass it variable value as parameter when import module._

##### Using variable on module:
```tf
resource "aws_security_group" "ssh" {
    ...
    tags {
        Name = "${var.sg_nametag}"
    }
}
```

##### Passing variable value to module from -main.tf:
_It uses the variable name defined on module to pass value as parameter on import module:_
```tf
module "sec_group" {
    source      = "./security_group"
    sg_nametag  = "A new tag"
}
resource "aws_instance" "example" {
    ...
}
```

---

# The end

With this file, i hope that should be simple to understand how terraform works, and should be a source of research for furute questions with fast answers about it.

This tutorial was learned over youtube videos at [this link](https://www.youtube.com/watch?v=tE1WZg9ib8k&t) and [this link](https://www.youtube.com/watch?v=lrAycU7_XnQ).
