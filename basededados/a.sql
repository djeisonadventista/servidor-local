USE servidor_local;

CREATE TABLE TBL_PRESTADOR(
id VARCHAR (255) PRIMARY KEY NOT NULL,
nif INT NOT NULL,
precoHora DECIMAL (10, 2) NOT NULL,
profissao VARCHAR(180) NOT NULL,
minimoDesconto DECIMAL (10,2),
taxaUrgencia DECIMAL (10,3),
percentagemDesconto DECIMAL (10, 3),
disponivel BOOLEAN NOT NULL,
enabled BOOLEAN NOT NULL,
create_at DATETIME NOT NULL,
updated_at DATETIME NOT NULL
);

AlTER TABLE tbl_prestadores
DROP COLUMN taxaUrgencia,
ADD COLUMN taxa_urgencia DECIMAL(10, 3) AFTER profissao,
DROP COLUMN minimoDesconto,
ADD COLUMN minimo_desconto DECIMAL(10, 3) AFTER taxa_urgencia,
DROP COLUMN percentagemDesconto,
ADD COLUMN percentagem_desconto DECIMAL(10, 3) AFTER minimo_desconto,
DROP COLUMN precoHora
;

CREATE TABLE tbl_utilizadores(
id VARCHAR(255) PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
nome VARCHAR(50) NOT NULL,
`numero_identidade` VARCHAR (100) NOT NULL UNIQUE,
`data_nascimento` DATE NOT NULL,
`email` VARCHAR (100) NOT NULL,
`password` VARCHAR (255) NOT NULL,
`telefone` VARCHAR (13),
`pais` VARCHAR (100) NOT NULL,
`localidade` VARCHAR (100) NOT NULL,
`enebled` BOOLEAN NOT NULL,
`created_at` DATETIME NOT NULL,
`update_at` DATETIME NOT NULL
);

CREATE TABLE tbl_servicos (
`id` INTEGER NOT NULL,
`nome` VARCHAR(50) NOT NULL,
`descricao` VARCHAR(255),
`categoria` VARCHAR(20) NOT NULL,
`enabled_at` BOOLEAN NOT NULL,
`created_at` DATETIME NOT NULL,
`updated_at` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `tbl_orcamento` (
	`id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	`total` DOUBLE NOT NULL,
	`id_utilizadores` VARCHAR(255) NOT NULL,
	`enabled` DOUBLE NOT NULL,
	`created_at` DATETIME NOT NULL,
	`updated_at` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `tbl_prestacao_servico` (
	`id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	`designacao` VARCHAR(100) NOT NULL,
	`subtotal` DOUBLE NOT NULL,
	`horas_estimadas` INTEGER,
	`id_prestador` VARCHAR(255) NOT NULL,
	`id_servico` INTEGER NOT NULL,
	`preco_hora` DOUBLE,
	`estado` ENUM('pendente', 'em_progresso', 'finalizado', 'canalizado') NOT NULL,
	`id_orcamento` INTEGER,
	`enabled` BOOLEAN NOT NULL,
	`created_at` DATETIME NOT NULL,
	`updated` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `tbl_proposta` (
	`id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	`id_prestacao_servico` INTEGER NOT NULL,
	`preco_hora` DOUBLE NOT NULL,
	`horas_estimadas` INTEGER NOT NULL,
	`estado` ENUM('pendente', 'aceito', 'recusado') NOT NULL,
	`enabled` BOOLEAN NOT NULL,
	`created_at` DATETIME NOT NULL,
	`updated_at` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `tbl_empresa` (
id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
designacao VARCHAR(255) NOT NULL,
descricao VARCHAR(255),
localizacao VARCHAR(255) NOT NULL,
nif DOUBLE NOT NULL UNIQUE,
icone VARCHAR(255),
id_utilizador VARCHAR(255) NOT NULL,
enabled BOOLEAN NOT NULL,
created_at DATETIME NOT NULL,
updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `tbl_categoria` (
id INTEGER NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
designacao VARCHAR(255) NOT NULL,
icone VARCHAR(255),
created_at DATETIME NOT NULL,
updated_at DATETIME NOT NULL
);

ALTER TABLE  tbl_prestadores
ADD COLUMN id_utilizador VARCHAR(255) NOT NULL DEFAULT "4d540255-0d28-4a45-af49-5b089daefc47" AFTER id_empresa,
ADD CONSTRAINT fk_utilizadores_prestadores
FOREIGN KEY (id_utilizador)
REFERENCES tbl_utilizadores(id)
;

ALTER TABLE tbl_empresa
ADD CONSTRAINT fk_utilizador_empresa
FOREIGN KEY (id_utilizador)
REFERENCES tbl_utilizadores(id)
;

ALTER TABLE tbl_servicos
DROP COLUMN categoria,
ADD COLUMN id_categoria INTEGER AFTER descricao,
ADD CONSTRAINT fk_categoria_servico
FOREIGN KEY (id_categoria)
REFERENCES tbl_categoria(id)
;

ALTER TABLE tbl_prestacao_servico
ADD COLUMN urgente BOOLEAN AFTER id_orcamento
;

AlTER TABLE tbl_proposta
ADD CONSTRAINT fk_prestacao_servico_proposta
FOREIGN KEY (id_prestacao_servico)
REFERENCES tbl_prestacao_servico(id)
;

ALTER TABLE tbl_prestadores
ADD COLUMN id_empresa INTEGER,
ADD CONSTRAINT fk_empresa_prestadores
FOREIGN KEY (id_empresa)
REFERENCES tbl_empresa(id)
;

 

AlTER TABLE tbl_prestacao_servico
ADD CONSTRAINT fk_prestadores_prestacao_servico
FOREIGN KEY (id_prestador)
REFERENCES tbl_prestadores(id),
ADD CONSTRAINT fk_servico_prestacao_servico
FOREIGN KEY (id_servico)
REFERENCES tbl_servico(id)
;

DROP TABLE tbl_servicos;

CREATE TABLE tbl_servicos (
`id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
`nome` VARCHAR(50) NOT NULL,
`descricao` VARCHAR(255),
`categoria` VARCHAR(20) NOT NULL,
`enabled_at` BOOLEAN NOT NULL,
`created_at` DATETIME NOT NULL,
`updated_at` DATETIME NOT NULL
);

ALTER TABLE tbl_utilizadores
ADD COLUMN `role` ENUM("cliente", "admin", "prestador", "empresa") default "cliente"
;