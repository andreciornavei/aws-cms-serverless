resource "aws_iam_policy_attachment" "create_post_policy_attachment" {
  name       = "${var.environment}-create-post-attachment"
  roles      = [aws_iam_role.create_post_iam_role.name]
  policy_arn = aws_iam_policy.create_post_policy.arn
}
