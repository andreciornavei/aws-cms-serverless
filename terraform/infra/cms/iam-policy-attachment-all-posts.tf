resource "aws_iam_policy_attachment" "all_posts_policy_attachment" {
  name       = "${var.environment}-all-posts-attachment"
  roles      = [aws_iam_role.all_posts_iam_role.name]
  policy_arn = aws_iam_policy.all_posts_policy.arn
}
