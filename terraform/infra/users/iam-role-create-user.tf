resource "aws_iam_role" "create_user_iam_role" {
  name = "${var.environment}-create-user-iam-role"
  description = "This is a role that allow create user lambda functions other services"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})
}

resource "aws_ssm_parameter" "create_user_iam_role" {
    name  = "${var.environment}-create-user-iam-role"
    type  = "String"
    value = aws_iam_role.create_user_iam_role.arn
}