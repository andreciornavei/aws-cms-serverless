resource "aws_rds_cluster" "rds_cluster" {
  apply_immediately       = true
  cluster_identifier      = "${var.environment}-auroradb-cluster"
  engine                  = "aurora"
  database_name           = var.auroradb_name
  master_username         = var.auroradb_username
  master_password         = var.auroradb_password
  skip_final_snapshot     = true
}

resource "aws_rds_cluster_instance" "rds_cluster_instance" {
  identifier          = "${var.environment}-auroradb-instance"
  cluster_identifier  = aws_rds_cluster.rds_cluster.id
  engine              = aws_rds_cluster.rds_cluster.engine
  engine_version      = aws_rds_cluster.rds_cluster.engine_version
  instance_class      = "db.t2.small"
  publicly_accessible = true
}

resource "aws_ssm_parameter" "ssm_rds_cluster_instance_endpoint" {
  name    = "${var.environment}-ssm-rds-cluster-instance-endpoint"
  type    = "String"
  value   = aws_rds_cluster_instance.rds_cluster_instance.endpoint
}