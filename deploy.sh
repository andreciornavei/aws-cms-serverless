cd terraform/environments/$1

terraform init && terraform apply --auto-approve

cd ../../../
pwd

executeSls() {
    pwd
    sls deploy --stage $1
}

cd services/api/
executeSls $1
cd ../users-consumer/
executeSls $1
cd ../users-publisher/
executeSls $1