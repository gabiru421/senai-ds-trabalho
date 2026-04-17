# SENAI - DESENVOLVIMENTO DE SISTEMAS

## Sistema de Vendas 
 (NodeJS | Express | SQL Server | React)


## Criando a Tabela
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    age INT
);
