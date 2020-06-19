resource "aws_iam_policy" "create_user_policy" {
  name        = "${var.environment}-create-user-policy"
  description = "This policy allows create user lambda function to access rds table"

  policy = templatefile("${path.module}/templates/lambda-allow-policy.tpl",{
    action    = "rds-db:connect"
    resource  = "arn:aws:rds:${var.region}:${var.account_id}:db:${var.environment}-${var.db_instance_key}"
  })
}