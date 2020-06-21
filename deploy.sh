cd terraform/environments/$1

terraform init && terraform apply --auto-approve

cd ../../../
pwd

executeSls() {
    pwd
    sls deploy --stage $1
}

cd app/
executeSls $1