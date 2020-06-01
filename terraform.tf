provider "aws" {
    region = "sa-east-1"
    shared_credentials_file = "~/.aws/credentials"
    profile = "default"
}

resource "aws_sqs_queue" "aws-cms-serverless-queue" {
  name                      = "aws-cms-serverless-queue"
  delay_seconds             = 0
  max_message_size          = 2048
  receive_wait_time_seconds = 10  
}

resource "aws_rds_cluster_instance" "cluster_instances" {
  identifier          = "aurora-cluster-aws-cms-serverless"
  cluster_identifier  = "${aws_rds_cluster.rds_cluster.id}"
  engine              = "${aws_rds_cluster.rds_cluster.engine}"
  engine_version      = "${aws_rds_cluster.rds_cluster.engine_version}"
  instance_class      = "db.t3.small"
  publicly_accessible = true
}

resource "aws_rds_cluster" "rds_cluster" {
  apply_immediately       = true
  cluster_identifier      = "aws-cms-serverless-aurora"
  engine                  = "aurora-mysql"
  engine_version          = "5.7.mysql_aurora.2.07.1"
  database_name           = "aws_cms_serverless_db"
  master_username         = "admin"
  master_password         = "aws_cms_serverless_admin"
  skip_final_snapshot     = true
}