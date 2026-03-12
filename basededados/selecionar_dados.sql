SELECT * FROM tbl_utilizadores;

SELECT id, nome FROM tbl_utilizadores;

SELECT tbl_utilizadores.id FROM tbl_utilizadores, tbl_pretadores;

SELECT tbl_utilizadores.id, tbl_prestadores FROM tbl_utilizadores, tbl_pretadores;

SELECT 
tbl_orcamento.id,
total,
tbl_utilizadores.id,
nome
FROM
tbl_orcamento,
tbl_utilizadores
WHERE
tbl_orcamento.id_utilizadores = "a2e25ed1-e1e7-45d6-92cb-d2d8fb342ec0";

SELECT * FROM tbl_utilizadores WHERE tbl_utilizadores.id = "a2e25ed1-e1e7-45d6-92cb-d2d8fb342ec0";

SELECT * FROM tbl_prestadores WHERE tbl_prestadores.nif = "34465132"