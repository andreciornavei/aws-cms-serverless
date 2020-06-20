resource "aws_sqs_queue" "sqs_crete_post" {
    name    = "${var.environment}-sqs-create-post"
    redrive_policy = jsonencode({
        deadLetterTargetArn = aws_sqs_queue.sqs_create_post_dql.arn
        maxReceiveCount     = 3
    })
}

resource "aws_sqs_queue" "sqs_create_post_dql" {
    name    = "${var.environment}-sqs-create-post-dlq"
}

resource "aws_ssm_parameter" "sqs_create_post_url" {
    name    = "${var.environment}-sqs-create-post-url"
    type    = "String"
    value   = aws_sqs_queue.sqs_crete_post.id
}