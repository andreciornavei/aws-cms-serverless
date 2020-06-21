resource "aws_iam_role" "delete_post_iam_role" {
  name = "${var.environment}-delete-post-iam-role"
  description = "This is a role that allow lambda function to access other services"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})
}

resource "aws_ssm_parameter" "delete_post_iam_role" {
    name  = "${var.environment}-delete-post-iam-role"
    type  = "String"
    value = aws_iam_role.delete_post_iam_role.arn
}