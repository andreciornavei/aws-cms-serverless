data "aws_caller_identity" "current" {}

module "system" {
    source                  = "../../infra/system"
    environment             = var.environment
    auroradb_name           = var.auroradb_name
    auroradb_username       = var.auroradb_username
    auroradb_password       = var.auroradb_password
    auroradb_instance_key   = var.auroradb_instance_key
}

module "users" {
    source                  = "../../infra/users"
    region                  = var.region
    environment             = var.environment
    jwt_secret              = var.jwt_secret
    account_id              = data.aws_caller_identity.current.account_id
    auroradb_instance_key   = var.auroradb_instance_key
}

# module "cms" {
#     source          = "../../infra/cms"
#     region          = var.region
#     environment     = var.environment
#     account_id      = data.aws_caller_identity.current.account_id
# }
