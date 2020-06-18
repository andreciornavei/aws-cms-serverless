executeSls() {
    pwd
    sls remove --stage $1
}

cd app/api/
executeSls $1
cd ../sqs/
executeSls $1

cd ../../terraform/environments/$1
pwd
terraform destroy --auto-approve