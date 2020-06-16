resource "aws_sns_topic_subscription" "post_user_subscription" {
    topic_arn   = aws_sns_topic.notifications.arn
    protocol    = "sqs"
    endpoint    = aws_sqs_queue.post_user.arn
}