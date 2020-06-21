{
  "Version": "2012-10-17",
  "Statement": [
    %{ for resource of resources } 
        ,
        {
            "Action": [
                "${resource.action}"
            ],
            "Effect": "Allow",
            "Resource": "${resource.name}"
        }
    %{ endfor }
    ,{
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