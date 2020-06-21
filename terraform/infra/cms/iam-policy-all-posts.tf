resource "aws_iam_policy" "all_posts_policy" {
  name        = "${var.environment}-all-posts-policy"
  description = "This policy allows lambda function to access rds database"

  policy = templatefile("${path.module}/templates/lambda-allow-policy.tpl",{
    action    = "rds-db:connect"
    resource  = "arn:aws:rds:${var.region}:${var.account_id}:db:${var.environment}-${var.db_instance_key}"
  })
}  