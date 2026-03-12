INSERT INTO tbl_utilizadores (id, nome, numero_identidade, data_nascimento, email, `password`, telefone, pais, localidade, enebled, created_at, update_at)
VALUES (
"a2e25ed1-e1e7-45d6-92cb-d2d8fb342ec0",
"Djeison Santos",
"M001X",
"1996-02-18",
"djeison.adventista@gmail.com",
"$2a$12$j.pn.Zt9gCsh8cT8J.QIxO8N99SZnqG/PVDzPVGrkpK.t5MU4HcBK",
"9580703",
"Cabo Verde",
"Monte Grande",
true,
NOW(),
NOW()
);

INSERT INTO tbl_orcamento
VALUES (
NULL,
500,
"a2e25ed1-e1e7-45d6-92cb-d2d8fb342ec0",
true,
NOW(),
NOW()
);

INSERT INTO tbl_servicos
VALUES (
NULL,
"Gestao comercial e marketing",
"Marketing operacional",
"Negocio",
true,
NOW(),
NOW()
);

INSERT INTO tbl_prestadores
VALUES (
"4d7777fb-5db8-4654-a60a-ed0f2b576838",
34465132,
"Gestor",
0.2,
1000,
0.1,
true,
true,
NOW(),
NOW()
);

INSERT INTO tbl_prestacao_servico
VALUES (
NULL,
"Formação superior em Contabilidade",
2000,
8,
"4d7777fb-5db8-4654-a60a-ed0f2b576838",
1,
20,
"pendente",
1,
true,
NOW(),
NOW()
);