data "aws_caller_identity" "current" {}

module "system" {
    source                  = "../../infra/system"
    environment             = var.environment
    db_name           = var.db_name
    db_user       = var.db_user
    db_pass       = var.db_pass
    db_instance_key   = var.db_instance_key
}

module "users" {
    source            = "../../infra/users"
    region            = var.region
    environment       = var.environment
    jwt_secret        = var.jwt_secret
    account_id        = data.aws_caller_identity.current.account_id
    db_instance_key   = var.db_instance_key
}

# module "cms" {
#     source          = "../../infra/cms"
#     region          = var.region
#     environment     = var.environment
#     account_id      = data.aws_caller_identity.current.account_id
# }
