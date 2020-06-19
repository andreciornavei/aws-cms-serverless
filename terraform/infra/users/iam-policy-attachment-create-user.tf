resource "aws_iam_policy_attachment" "create_user_policy_attachment" {
  name       = "${var.environment}-create-user-attachment"
  roles      = [aws_iam_role.create_user_iam_role.name]
  policy_arn = aws_iam_policy.create_user_policy.arn
}
