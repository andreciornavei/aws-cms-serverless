resource "aws_iam_policy" "login_policy" {
  name        = "${var.environment}-login-policy"
  description = "This policy allows login lambda function to access rds table"

  policy = templatefile("${path.module}/templates/lambda-allow-policy.tpl",{
    action    = "rds-db:connect"
    resource  = "arn:aws:rds:${var.region}:${var.account_id}:db:${var.environment}-${var.auroradb_instance_key}"
  })
}