resource "aws_iam_policy_attachment" "update_post_policy_attachment" {
  name       = "${var.environment}-update-post-attachment"
  roles      = [aws_iam_role.update_post_iam_role.name]
  policy_arn = aws_iam_policy.update_post_policy.arn
}
