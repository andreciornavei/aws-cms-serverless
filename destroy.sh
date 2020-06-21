executeSls() {
    pwd
    sls remove --stage $1
}

cd app/
executeSls $1

cd ../terraform/environments/$1
pwd
terraform destroy --auto-approve