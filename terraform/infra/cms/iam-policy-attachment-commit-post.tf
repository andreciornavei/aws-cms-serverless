resource "aws_iam_policy_attachment" "commit_post_policy_attachment" {
  name       = "${var.environment}-commit-post-attachment"
  roles      = [aws_iam_role.commit_post_iam_role.name]
  policy_arn = aws_iam_policy.commit_post_policy.arn
}
