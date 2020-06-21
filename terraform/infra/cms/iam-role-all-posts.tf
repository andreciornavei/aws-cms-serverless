resource "aws_iam_role" "all_posts_iam_role" {
  name = "${var.environment}-all-posts-iam-role"
  description = "This is a role that allow lambda function to access other services"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})
}

resource "aws_ssm_parameter" "all_posts_iam_role" {
    name  = "${var.environment}-all-posts-iam-role"
    type  = "String"
    value = aws_iam_role.all_posts_iam_role.arn
}