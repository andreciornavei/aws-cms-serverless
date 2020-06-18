resource "aws_db_instance" "db_instance" {
  identifier              = "${var.environment}-${var.db_instance_key}"
  allocated_storage       = 20
  storage_type            = "gp2"
  engine                  = "mysql"
  engine_version          = "5.7"
  instance_class          = "db.t2.micro"
  name                    = var.db_name
  username                = var.db_user
  password                = var.db_pass
  parameter_group_name    = "default.mysql5.7"
  publicly_accessible     = true
  vpc_security_group_ids  = [aws_security_group.allow_database_traffic.id]
}

resource "aws_ssm_parameter" "ssm_db_instance_host" {
  name    = "${var.environment}-rds-db-instance-host"
  type    = "String"
  value   = aws_db_instance.db_instance.endpoint
}

resource "aws_ssm_parameter" "ssm_db_instance_name" {
  name    = "${var.environment}-rds-db-instance-name"
  type    = "String"
  value   = aws_db_instance.db_instance.name
}

resource "aws_ssm_parameter" "ssm_db_instance_user" {
  name    = "${var.environment}-rds-db-instance-user"
  type    = "String"
  value   = aws_db_instance.db_instance.username
}

resource "aws_ssm_parameter" "ssm_db_instance_pass" {
  name    = "${var.environment}-rds-db-instance-pass"
  type    = "String"
  value   = aws_db_instance.db_instance.password
}