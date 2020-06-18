cd terraform/environments/$1

terraform init && terraform apply --auto-approve

cd ../../../
pwd

executeSls() {
    pwd
    sls deploy --stage $1
}

cd app/api/
executeSls $1
cd ../sqs/
executeSls $1
