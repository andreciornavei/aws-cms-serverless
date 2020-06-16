resource "aws_sqs_queue" "post_users" {
    name    = "${var.environment}-post-users-queue"
    redrive_policy = jsonencode({
        deadLetterTargetArn = aws_sqs_queue.post_users_dlq.arn
        maxReceiveCount     = 3
    })
    policy = templatefile("${path.module}/templates/sqs-sns-policy.tpl", {
        resource    = "arn:aws:sqs:${var.region}:${var.account_id}:${var.environment}-post-users-queue"
        source_arn  = aws_sns_topic.notifications.arn
    })
}

resource "aws_ssm_parameter" "ssm_post_users_sqs" {
    name    = "${var.environment}-post-users-sqs"
    type    = "String"
    value   = aws_sqs_queue.post_users.arn
}

resource "aws_sqs_queue" "post_users_dlq" {
    name    = "${var.environment}-post-users-queue-dlq"
}

