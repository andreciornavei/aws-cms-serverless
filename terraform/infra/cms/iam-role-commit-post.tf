resource "aws_iam_role" "commit_post_iam_role" {
  name = "${var.environment}-commit-post-iam-role"
  description = "This is a role that allow commit post lambda functions other services"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})
}

resource "aws_ssm_parameter" "commit_post_iam_role" {
    name  = "${var.environment}-commit-post-iam-role"
    type  = "String"
    value = aws_iam_role.commit_post_iam_role.arn
}