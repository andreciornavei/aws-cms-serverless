resource "aws_iam_role" "create_post_iam_role" {
  name = "${var.environment}-create-post-iam-role"
  description = "This is a role that allow create post lambda functions other services"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})
}

resource "aws_ssm_parameter" "create_post_iam_role" {
    name  = "${var.environment}-create-post-iam-role"
    type  = "String"
    value = aws_iam_role.create_post_iam_role.arn
}