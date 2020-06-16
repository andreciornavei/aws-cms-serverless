resource "aws_rds_cluster" "rds_cluster" {
  apply_immediately       = true
  cluster_identifier      = "${var.environment}-auroradb-cluster"
  engine                  = "aurora-mysql"
  engine_version          = "5.7.mysql_aurora.2.07.1"
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
  instance_class      = "db.t3.small"
  publicly_accessible = true
}