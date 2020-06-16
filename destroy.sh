executeSls() {
    pwd
    sls remove --stage $1
}

cd services/api/
executeSls $1
cd ../users-consumer/
executeSls $1
cd ../users-publisher/
executeSls $1

cd ../../terraform/environments/$1
pwd
terraform destroy --auto-approve