resource "aws_iam_policy" "commit_post_policy" {
  name        = "${var.environment}-commit-post-policy"
  description = "This policy allows create commit lambda function to access rds table"
  policy = templatefile("${path.module}/templates/lambda-allow-commit-post.tpl",{
    "sqs_arn"    = aws_sqs_queue.sqs_crete_post.arn,
    "sqs_action" = join("\",\"", ["sqs:ReceiveMessage", "sqs:DeleteMessage", "sqs:GetQueueAttributes"]),
    "rds_arn"    = "arn:aws:rds:${var.region}:${var.account_id}:db:${var.environment}-${var.db_instance_key}",
    "rds_action" = "rds-db:connect",    
  })
}