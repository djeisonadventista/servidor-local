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
`pais VARCHAR` (100) NOT NULL,
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

AlTER TABLE tbl_proposta
ADD CONSTRAINT fk_prestacao_servico_proposta
FOREIGN KEY (id_prestacao_servico)
REFERENCES tbl_prestacao_servico(id)
;

AlTER TABLE tbl_prestacao_servico
ADD CONSTRAINT fk_prestadores_prestacao_servico
FOREIGN KEY (id_prestador)
REFERENCES tbl_prestadores(id),
ADD CONSTRAINT fk_servico_prestacao_servico
FOREIGN KEY (id_servico)
REFERENCES tbl_servico(id)


