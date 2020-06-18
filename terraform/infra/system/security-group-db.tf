resource "aws_security_group" "allow_database_traffic" {
  name        = "${var.environment}-allow-database-traffic"
  description = "Allow Inbound and Outbound traffic from everywhere origin to allow database connections"
  
  ingress {
    description = "Any traffic inbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Any traffic outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

}