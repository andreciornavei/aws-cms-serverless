{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "${rds_action}"
      ],
      "Effect": "Allow",
      "Resource": "${rds_arn}"
    },{
      "Action": [
        "${sqs_action}"
      ],
      "Effect": "Allow",
      "Resource": "${sqs_arn}"
    },{
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}