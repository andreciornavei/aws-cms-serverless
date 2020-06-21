resource "aws_iam_policy_attachment" "get_post_policy_attachment" {
  name       = "${var.environment}-get-post-attachment"
  roles      = [aws_iam_role.get_post_iam_role.name]
  policy_arn = aws_iam_policy.get_post_policy.arn
}
