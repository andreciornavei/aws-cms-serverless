resource "aws_iam_policy" "create_post_policy" {
  name        = "${var.environment}-create-post-policy"
  description = "This policy allows create post lambda function to access sqs queue"

  policy = templatefile("${path.module}/templates/lambda-allow-policy.tpl",{
    action    = "sqs:SendMessage"
    resource  = aws_sqs_queue.sqs_crete_post.arn
  })
}