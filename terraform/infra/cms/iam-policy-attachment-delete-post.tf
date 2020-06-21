resource "aws_iam_policy_attachment" "delete_post_policy_attachment" {
  name       = "${var.environment}-delete-post-attachment"
  roles      = [aws_iam_role.delete_post_iam_role.name]
  policy_arn = aws_iam_policy.delete_post_policy.arn
}
