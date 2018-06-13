/*
 Navicat Premium Data Transfer

 Source Server         : laravel
 Source Server Type    : PostgreSQL
 Source Server Version : 90415
 Source Host           : 192.168.133.12:5432
 Source Catalog        : sistemas
 Source Schema         : siscec

 Target Server Type    : PostgreSQL
 Target Server Version : 90415
 File Encoding         : 65001

 Date: 31/01/2018 20:38:54
*/


-- ----------------------------
-- Sequence structure for Menus_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "siscec"."Menus_id_seq";
CREATE SEQUENCE "siscec"."Menus_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for Perfis_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "siscec"."Perfis_id_seq";
CREATE SEQUENCE "siscec"."Perfis_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for Permissoes_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "siscec"."Permissoes_id_seq";
CREATE SEQUENCE "siscec"."Permissoes_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for contratos_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "siscec"."contratos_id_seq";
CREATE SEQUENCE "siscec"."contratos_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for controles_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "siscec"."controles_id_seq";
CREATE SEQUENCE "siscec"."controles_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for empenhos_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "siscec"."empenhos_id_seq";
CREATE SEQUENCE "siscec"."empenhos_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for fiscais_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "siscec"."fiscais_id_seq";
CREATE SEQUENCE "siscec"."fiscais_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for medicoes_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "siscec"."medicoes_id_seq";
CREATE SEQUENCE "siscec"."medicoes_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for parcelas_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "siscec"."parcelas_id_seq";
CREATE SEQUENCE "siscec"."parcelas_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for usuarios_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "siscec"."usuarios_id_seq";
CREATE SEQUENCE "siscec"."usuarios_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Table structure for Contratos
-- ----------------------------
DROP TABLE IF EXISTS "siscec"."Contratos";
CREATE TABLE "siscec"."Contratos" (
  "id" int4 NOT NULL DEFAULT nextval('siscec.contratos_id_seq'::regclass),
  "idControle" int4 NOT NULL DEFAULT NULL,
  "numeroProcesso" int4 NOT NULL DEFAULT NULL,
  "anoProcesso" int4 NOT NULL DEFAULT NULL,
  "numeroContrato" int4 NOT NULL DEFAULT NULL,
  "anoContrato" int4 NOT NULL DEFAULT NULL,
  "dataInicio" date NOT NULL DEFAULT NULL,
  "dataFim" date NOT NULL DEFAULT NULL,
  "prazoLimiteAditivo" int4 NOT NULL DEFAULT NULL,
  "tipoContrato" int4 NOT NULL DEFAULT NULL,
  "tipoAditivo" int4 NOT NULL DEFAULT NULL,
  "situacao" int4 NOT NULL DEFAULT NULL,
  "valor" money DEFAULT NULL,
  "dataAditivo" date DEFAULT NULL,
  "justificativaAditivo" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "dataLimitAditivo" date DEFAULT NULL
)
WITH (OIDS=TRUE)
;

-- ----------------------------
-- Records of Contratos
-- ----------------------------
INSERT INTO "siscec"."Contratos" VALUES (62, 138, 20, 2017, 1, 2017, '2017-12-01', '2018-05-01', 30, 0, 2, 3, 'R$ 500,00', '2017-12-15', NULL, '2018-04-01');
INSERT INTO "siscec"."Contratos" VALUES (67, 145, 147, 2016, 1489, 2016, '2016-01-01', '2016-12-31', 30, 0, 2, 3, 'R$ 365.000,00', '2018-01-09', 'TESTE', '2018-04-01');
INSERT INTO "siscec"."Contratos" VALUES (66, 145, 149, 2019, 1200, 2019, '2019-01-14', '2019-09-14', 20, 1, 2, 3, 'R$ 250,00', NULL, NULL, '2019-08-25');
INSERT INTO "siscec"."Contratos" VALUES (72, 145, 1458, 2015, 136, 2015, '2015-09-14', '2015-12-14', 10, 1, 0, 3, 'R$ 600,00', NULL, NULL, '2015-12-04');
INSERT INTO "siscec"."Contratos" VALUES (73, 145, 2547, 2018, 21, 2018, '2018-01-14', '2018-09-14', 10, 1, 0, 0, 'R$ 650,00', NULL, NULL, '2018-09-04');
INSERT INTO "siscec"."Contratos" VALUES (64, 138, 21, 2018, 2, 2018, '2018-12-15', '2019-12-15', 30, 1, 2, 3, 'R$ 200,00', '2017-11-01', 'FOI DADA ENTRADA O PROCESSO X DE PARA ADITIVAR O CONTRATO', '2019-11-15');
INSERT INTO "siscec"."Contratos" VALUES (74, 146, 29329, 2017, 55, 2017, '2017-11-14', '2017-12-31', 3, 0, 0, 3, 'R$ 4.500,00', '2017-12-29', 'Justificativa

                Considerando que foi protocolado Projeto de Rede contra Incêndio e pânico com aprovação junto ao Corpo de Bombeiros do estado do Rio de Janeiro- CBMEJ em 27/12/2017 para análise (cópia em anexo).
              Considerando DECRETO Nº 897, DE 21 DE SETEMBRO DE 1976 REGULAMENTA o Decreto-lei nº 247, de 21-7-75, que dispõe sobre segurança contra incêndio e pânico.
             Com base Seção II,” da Tramitação de Expedientes, art. 4º - O expediente relativo à Segurança Contra Incêndio e Pânico deverá tramitar obedecendo às seguintes normas:
 I - Quando se tratar de projeto:
 a) apresentação ao Corpo de Bombeiros de requerimento solicitando a determinação de medidas de Segurança Contra Incêndio e Pânico, anexando jogo completo de plantas de arquitetura (situação, fachada, corte e planta baixa), assinado pelos responsáveis, de conformidade com o Capitulo II do presente Código.
 ⇒ Ver Resolução SEDEC 169/94.
 b) até 30 (trinta) dias após o cumprimento do disposto na alínea anterior, recebimento no
Corpo de Bombeiros do Laudo de Exigências, juntamente com as plantas apresentadas. O Laudo de Exigências é documento indispensável na concessão de licença para início de obra;
 Considerando os trâmites processuais dos órgãos envolvidos: CBMEJ – Município do Rio de Janeiro, Prefeitura de Rio Ostras e a empresa contratada SAFETY TRAINNING COMÉRCIO, INSTALAÇÕES E TREINAMENTOS EIRELI – EPP em Campos dos Goytacazes, solicitamos prorrogação de 60 dias de vigência do contrato acima referenciado que hoje tem término previsto para 31/12/2017.', '2017-12-28');

-- ----------------------------
-- Table structure for Controles
-- ----------------------------
DROP TABLE IF EXISTS "siscec"."Controles";
CREATE TABLE "siscec"."Controles" (
  "id" int4 NOT NULL DEFAULT nextval('siscec.controles_id_seq'::regclass),
  "idSetor" int4 NOT NULL DEFAULT NULL,
  "objeto" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "concluido" bool NOT NULL DEFAULT NULL,
  "modalidade" varchar(80) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "previsaoGasto" money DEFAULT NULL,
  "idPessoa" int4 DEFAULT NULL,
  "numeroControle" int4 DEFAULT NULL,
  "dataCadastro" date DEFAULT NULL
)
WITH (OIDS=TRUE)
;

-- ----------------------------
-- Records of Controles
-- ----------------------------
INSERT INTO "siscec"."Controles" VALUES (138, 1, 'teste contrato de 500', 'f', '0', 'R$ 400,00', 12, 12, '2017-12-29');
INSERT INTO "siscec"."Controles" VALUES (145, 37, 'teste planilha excel com acento (á) e cedilha (ç)', 'f', '1', 'R$ 365.000,00', 12, 51, '2018-01-03');
INSERT INTO "siscec"."Controles" VALUES (146, 1, 'ELABORAÇÃO DE PROJETO DE REDE CONTRA INCÊNDIO E PÂNICO COM APROVAÇÃO JUNTO AO CORPO DE BOMBEIROS MILITAR DO ESTADO DO RIO DE JANEIRO.', 'f', '2', 'R$ 4.500,00', 17, 56, '2018-01-10');

-- ----------------------------
-- Table structure for Empenhos
-- ----------------------------
DROP TABLE IF EXISTS "siscec"."Empenhos";
CREATE TABLE "siscec"."Empenhos" (
  "id" int4 NOT NULL DEFAULT nextval('siscec.empenhos_id_seq'::regclass),
  "idContrato" int4 NOT NULL DEFAULT NULL,
  "numero" varchar(80) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "ano" int4 NOT NULL DEFAULT NULL,
  "data" date NOT NULL DEFAULT NULL,
  "idFonteRecurso" int4 NOT NULL DEFAULT NULL,
  "cancelado" bool NOT NULL DEFAULT NULL,
  "justificativa" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "valor" money DEFAULT NULL
)
WITH (OIDS=TRUE)
;

-- ----------------------------
-- Records of Empenhos
-- ----------------------------
INSERT INTO "siscec"."Empenhos" VALUES (24, 62, '678', 2017, '2017-12-14', 4, 'f', 'dgdf', 'R$ 300,00');
INSERT INTO "siscec"."Empenhos" VALUES (25, 62, '715', 2017, '2017-12-15', 2, 'f', NULL, 'R$ 200,00');
INSERT INTO "siscec"."Empenhos" VALUES (26, 64, '1', 2018, '2018-09-14', 1, 'f', 'dfg', 'R$ 1.000,00');
INSERT INTO "siscec"."Empenhos" VALUES (27, 66, '3', 2018, '2018-09-14', 4, 'f', NULL, 'R$ 200,00');
INSERT INTO "siscec"."Empenhos" VALUES (28, 67, '4569', 2016, '2016-01-01', 4, 'f', 'dfgdfg', 'R$ 365.000,00');
INSERT INTO "siscec"."Empenhos" VALUES (29, 74, '3118', 2017, '2017-11-09', 2, 'f', NULL, 'R$ 4.500,00');

-- ----------------------------
-- Table structure for Fiscais
-- ----------------------------
DROP TABLE IF EXISTS "siscec"."Fiscais";
CREATE TABLE "siscec"."Fiscais" (
  "id" int4 NOT NULL DEFAULT nextval('siscec.fiscais_id_seq'::regclass),
  "idControle" int4 NOT NULL DEFAULT NULL,
  "matricula" varchar(8) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "numeroPortaria" int4 DEFAULT NULL,
  "anoPortaria" int4 DEFAULT NULL,
  "dataPortaria" date DEFAULT NULL,
  "idPessoa" int4 DEFAULT NULL
)
WITH (OIDS=TRUE)
;

-- ----------------------------
-- Records of Fiscais
-- ----------------------------
INSERT INTO "siscec"."Fiscais" VALUES (39, 137, '454546', 1231, 2017, '2017-09-14', 9);
INSERT INTO "siscec"."Fiscais" VALUES (41, 145, '45', 456, 2017, '2017-09-14', 9);
INSERT INTO "siscec"."Fiscais" VALUES (42, 145, '147', 159, 2016, '2016-09-14', 10);
INSERT INTO "siscec"."Fiscais" VALUES (43, 145, '258', 357, 2015, '2015-09-14', 11);
INSERT INTO "siscec"."Fiscais" VALUES (40, 138, '5465', 123, 2017, '2017-09-14', 11);
INSERT INTO "siscec"."Fiscais" VALUES (45, 146, '111791', 1238, 2017, '2017-11-29', 15);

-- ----------------------------
-- Table structure for FonteRecursos
-- ----------------------------
DROP TABLE IF EXISTS "siscec"."FonteRecursos";
CREATE TABLE "siscec"."FonteRecursos" (
  "id" int4 NOT NULL DEFAULT NULL,
  "codigo" varchar(80) COLLATE "pg_catalog"."default" DEFAULT NULL,
  "descricao" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "sigla" varchar(255) COLLATE "pg_catalog"."default" DEFAULT NULL
)
WITH (OIDS=TRUE)
;

-- ----------------------------
-- Records of FonteRecursos
-- ----------------------------
INSERT INTO "siscec"."FonteRecursos" VALUES (1, '0.1.00', 'Ordinário', 'Ordinário');
INSERT INTO "siscec"."FonteRecursos" VALUES (27, '0.2.55', 'Serviço Único de Saúde/Gestão em Saúde - SUS/GS', 'SUS/GS');
INSERT INTO "siscec"."FonteRecursos" VALUES (26, '0.2.54', 'Serviço Único de Saúde/Assistência Farmacêutica Básica - SUS/AFB', 'SUS/AFB');
INSERT INTO "siscec"."FonteRecursos" VALUES (25, '0.2.53', 'Serviço Único de Saúde/Vigilância em Saúde - SUS/VGS', 'SUS/VGS');
INSERT INTO "siscec"."FonteRecursos" VALUES (24, '0.2.52', 'Serviço Único de Saúde/Atenção de Média e Alta Complex. Ambul. e Hospitalar - SUS/MAC', 'SUS/MAC');
INSERT INTO "siscec"."FonteRecursos" VALUES (23, '0.2.51', 'Serviço Único de Saúde/Atenção Básica - SUS/ATB', 'SUS/ATB');
INSERT INTO "siscec"."FonteRecursos" VALUES (22, '0.2.46', 'Fundo Municipal de Proteção e Defesa do Consumidor - FMDC', 'FMDC');
INSERT INTO "siscec"."FonteRecursos" VALUES (21, '0.2.45', 'Fundo Municipal de Meio Ambiente - FMMA', 'FMMA');
INSERT INTO "siscec"."FonteRecursos" VALUES (20, '0.2.44', 'Fundo Municipal da Infância e Adolescência - FMIA', 'FMIA');
INSERT INTO "siscec"."FonteRecursos" VALUES (19, '0.2.43', 'Fundo Nacional de Assistência Social - FNAS', 'FNAS');
INSERT INTO "siscec"."FonteRecursos" VALUES (18, '0.2.42', 'Serviço Único de Saúde Investimento - SUS/INVEST', 'SUS/INVEST');
INSERT INTO "siscec"."FonteRecursos" VALUES (17, '0.2.41', 'Fundação Rio das Ostras de Cultura - FROC', 'FROC');
INSERT INTO "siscec"."FonteRecursos" VALUES (16, '0.2.40', 'Rio das Ostras Previdência - OSTRASPREV', 'OSTRASPREV');
INSERT INTO "siscec"."FonteRecursos" VALUES (15, '0.2.33', 'Fundo Estadual de Assistência Social - FEAS', 'FEAS');
INSERT INTO "siscec"."FonteRecursos" VALUES (14, '0.2.32', 'Serviço Único de Saúde Estadual - SUS/Estado', 'SUS/Estado');
INSERT INTO "siscec"."FonteRecursos" VALUES (13, '0.2.28', 'Fundo Municipal de Habitação de Interesse Social - FHIS', 'FHIS');
INSERT INTO "siscec"."FonteRecursos" VALUES (12, '0.2.12', 'Convênio FUNDOS', 'FUNDOS');
INSERT INTO "siscec"."FonteRecursos" VALUES (3, '0.1.05', 'Quota Salário-Educação - QSE', 'QSE');
INSERT INTO "siscec"."FonteRecursos" VALUES (5, '0.1.15', 'Fundo de Manut. e Desenv. da Educação Básica e de Valorização de Profissionais da Educação - FUNDEB', 'FUNDEB');
INSERT INTO "siscec"."FonteRecursos" VALUES (6, '0.1.20', 'Programa Nacional de Alimentação Escolar - PNAE', 'PNAE');
INSERT INTO "siscec"."FonteRecursos" VALUES (7, '0.1.21', 'Programa Nacional de Apoio ao Transporte Escolar - PNATE', 'PNATE');
INSERT INTO "siscec"."FonteRecursos" VALUES (9, '0.1.26', 'Contribuição para Custeio dos Serviços de Iluminação Pública - COSIP', 'COSIP');
INSERT INTO "siscec"."FonteRecursos" VALUES (10, '0.1.27', 'Cota-Parte da Contrib. de Intervenção no Domínio Econômico - CIDE', 'CIDE');
INSERT INTO "siscec"."FonteRecursos" VALUES (8, '0.1.25', 'Multas de Trânsito', 'Multas');
INSERT INTO "siscec"."FonteRecursos" VALUES (4, '0.1.12', 'Convênio PMRO', 'Convênio');
INSERT INTO "siscec"."FonteRecursos" VALUES (2, '0.1.04', 'Royalties - Lei 7990/89', 'Roy/7990/89');
INSERT INTO "siscec"."FonteRecursos" VALUES (11, '0.1.50', 'Royalties - Lei 9478/97', 'Roy/9478/97');

-- ----------------------------
-- Table structure for Medicoes
-- ----------------------------
DROP TABLE IF EXISTS "siscec"."Medicoes";
CREATE TABLE "siscec"."Medicoes" (
  "id" int4 NOT NULL DEFAULT nextval('siscec.medicoes_id_seq'::regclass),
  "idContrato" int4 NOT NULL DEFAULT NULL,
  "dataInicio" date NOT NULL DEFAULT NULL,
  "dataFim" date NOT NULL DEFAULT NULL,
  "pago" bool NOT NULL DEFAULT NULL
)
WITH (OIDS=TRUE)
;

-- ----------------------------
-- Records of Medicoes
-- ----------------------------
INSERT INTO "siscec"."Medicoes" VALUES (30, 67, '2017-07-01', '2017-07-31', 't');
INSERT INTO "siscec"."Medicoes" VALUES (29, 67, '2016-06-01', '2016-06-15', 't');
INSERT INTO "siscec"."Medicoes" VALUES (28, 67, '2016-05-01', '2016-05-31', 't');
INSERT INTO "siscec"."Medicoes" VALUES (27, 67, '2016-04-01', '2016-04-30', 't');
INSERT INTO "siscec"."Medicoes" VALUES (26, 67, '2016-03-16', '2016-03-31', 't');
INSERT INTO "siscec"."Medicoes" VALUES (25, 67, '2016-03-01', '2016-03-15', 't');
INSERT INTO "siscec"."Medicoes" VALUES (24, 67, '2016-02-01', '2016-02-29', 't');
INSERT INTO "siscec"."Medicoes" VALUES (23, 67, '2016-01-01', '2016-01-31', 't');
INSERT INTO "siscec"."Medicoes" VALUES (22, 64, '2017-09-14', '2018-09-14', 't');
INSERT INTO "siscec"."Medicoes" VALUES (21, 62, '2018-04-01', '2018-04-30', 't');
INSERT INTO "siscec"."Medicoes" VALUES (20, 62, '2018-03-01', '2018-03-31', 't');
INSERT INTO "siscec"."Medicoes" VALUES (19, 62, '2018-02-01', '2018-02-28', 't');
INSERT INTO "siscec"."Medicoes" VALUES (18, 62, '2018-01-01', '2018-01-31', 't');
INSERT INTO "siscec"."Medicoes" VALUES (17, 62, '2017-12-01', '2017-12-31', 't');
INSERT INTO "siscec"."Medicoes" VALUES (31, 74, '2017-11-14', '2017-12-31', 'f');

-- ----------------------------
-- Table structure for Menus
-- ----------------------------
DROP TABLE IF EXISTS "siscec"."Menus";
CREATE TABLE "siscec"."Menus" (
  "id" int4 NOT NULL DEFAULT nextval('siscec."Menus_id_seq"'::regclass),
  "idPai" int4 DEFAULT NULL,
  "idSistema" int4 DEFAULT NULL,
  "icone" varchar(32) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "label" varchar(32) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "rota" varchar(32) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "cor" varchar(7) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "ordem" int4 DEFAULT NULL,
  "ativo" bool DEFAULT NULL
)
WITH (OIDS=TRUE)
;

-- ----------------------------
-- Records of Menus
-- ----------------------------
INSERT INTO "siscec"."Menus" VALUES (11, NULL, 3, NULL, 'Menu', NULL, NULL, 0, 't');
INSERT INTO "siscec"."Menus" VALUES (2, 11, 3, 'icon-folder-open', 'Gerencia Controle', '/siscec/listaControles', NULL, 2, 't');
INSERT INTO "siscec"."Menus" VALUES (3, 11, 3, 'icon-file-plus', 'Cadastra Controle', '/siscec/cadastraControle', NULL, 3, 't');
INSERT INTO "siscec"."Menus" VALUES (4, 11, 3, 'icon-file-text3', 'Gerencia Contrato', '/siscec/gerenciaContrato', NULL, 4, 't');
INSERT INTO "siscec"."Menus" VALUES (5, 11, 3, 'icon-coins', 'Gerencia Empenho', '/siscec/gerenciaEmpenho', NULL, 5, 't');
INSERT INTO "siscec"."Menus" VALUES (6, 11, 3, 'icon-design', 'Gerencia Medição', '/siscec/gerenciaMedicao', NULL, 6, 't');
INSERT INTO "siscec"."Menus" VALUES (7, 11, 3, 'icon-user-tie', 'Gerencia Fiscal', '/siscec/gerenciaFiscal', NULL, 7, 't');
INSERT INTO "siscec"."Menus" VALUES (8, 11, 3, 'icon-office', 'Gerencia Setor', '/siscec/gerenciaSetor', NULL, 8, 't');
INSERT INTO "siscec"."Menus" VALUES (9, 11, 3, 'icon-user', 'Gerencia Usuário', '/siscec/gerenciaUsuario', NULL, 9, 't');
INSERT INTO "siscec"."Menus" VALUES (10, 11, 3, 'icon-vcard', 'Gerencia Pessoa', '/siscec/gerenciaPessoa', NULL, 10, 't');
INSERT INTO "siscec"."Menus" VALUES (1, 11, 3, 'icon-graph', 'Dashboard', '/siscec/dashboard', NULL, 1, 't');

-- ----------------------------
-- Table structure for Parcelas
-- ----------------------------
DROP TABLE IF EXISTS "siscec"."Parcelas";
CREATE TABLE "siscec"."Parcelas" (
  "idMedicao" int4 NOT NULL DEFAULT NULL,
  "numeroParcela" int4 NOT NULL DEFAULT NULL,
  "idEmpenho" int4 NOT NULL DEFAULT NULL,
  "id" int4 DEFAULT nextval('siscec.parcelas_id_seq'::regclass),
  "valor" money DEFAULT NULL
)
WITH (OIDS=TRUE)
;

-- ----------------------------
-- Records of Parcelas
-- ----------------------------
INSERT INTO "siscec"."Parcelas" VALUES (17, 1, 24, 18, 'R$ 100,00');
INSERT INTO "siscec"."Parcelas" VALUES (17, 2, 25, 19, 'R$ 100,00');
INSERT INTO "siscec"."Parcelas" VALUES (18, 1, 24, 20, 'R$ 50,00');
INSERT INTO "siscec"."Parcelas" VALUES (18, 2, 25, 21, 'R$ 50,00');
INSERT INTO "siscec"."Parcelas" VALUES (19, 1, 24, 22, 'R$ 50,00');
INSERT INTO "siscec"."Parcelas" VALUES (20, 1, 24, 23, 'R$ 50,00');
INSERT INTO "siscec"."Parcelas" VALUES (20, 2, 25, 24, 'R$ 30,00');
INSERT INTO "siscec"."Parcelas" VALUES (21, 1, 24, 25, 'R$ 50,00');
INSERT INTO "siscec"."Parcelas" VALUES (21, 2, 25, 26, 'R$ 20,00');
INSERT INTO "siscec"."Parcelas" VALUES (22, 1, 26, 27, 'R$ 49,90');
INSERT INTO "siscec"."Parcelas" VALUES (23, 1, 28, 28, 'R$ 31.000,00');
INSERT INTO "siscec"."Parcelas" VALUES (24, 1, 28, 29, 'R$ 29.000,00');
INSERT INTO "siscec"."Parcelas" VALUES (25, 1, 28, 30, 'R$ 20.000,00');
INSERT INTO "siscec"."Parcelas" VALUES (26, 1, 28, 31, 'R$ 15.000,00');
INSERT INTO "siscec"."Parcelas" VALUES (27, 1, 28, 32, 'R$ 26.000,00');
INSERT INTO "siscec"."Parcelas" VALUES (28, 1, 28, 33, 'R$ 31.000,00');
INSERT INTO "siscec"."Parcelas" VALUES (29, 1, 28, 34, 'R$ 35.000,00');
INSERT INTO "siscec"."Parcelas" VALUES (30, 1, 28, 35, 'R$ 12.000,00');
INSERT INTO "siscec"."Parcelas" VALUES (31, 1, 29, 36, 'R$ 4.500,00');

-- ----------------------------
-- Table structure for Perfis
-- ----------------------------
DROP TABLE IF EXISTS "siscec"."Perfis";
CREATE TABLE "siscec"."Perfis" (
  "id" int4 NOT NULL DEFAULT nextval('siscec."Perfis_id_seq"'::regclass),
  "descricao" varchar(80) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "value" varchar(255) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "sigla" varchar(80) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "nome" varchar(255) COLLATE "pg_catalog"."default" DEFAULT NULL
)
WITH (OIDS=TRUE)
;

-- ----------------------------
-- Records of Perfis
-- ----------------------------
INSERT INTO "siscec"."Perfis" VALUES (0, 'só visualiza e edita da propria secretaria', '0', 'Usuário', 'Usuário');
INSERT INTO "siscec"."Perfis" VALUES (1, 'visualiza tudo e edita apenas da própria secretaria', '1', 'Usuário de Supervisão', 'Usuário de Supervisão');
INSERT INTO "siscec"."Perfis" VALUES (2, 've e editar tudo  ', '2', 'Administrador', 'Administrador');
INSERT INTO "siscec"."Perfis" VALUES (3, 'só visualiza da propria secretaria e não edita nada', '3', 'Usuário de Visualização', 'Usuário de Visualização');

-- ----------------------------
-- Table structure for Permissoes
-- ----------------------------
DROP TABLE IF EXISTS "siscec"."Permissoes";
CREATE TABLE "siscec"."Permissoes" (
  "id" int4 NOT NULL DEFAULT nextval('siscec."Permissoes_id_seq"'::regclass),
  "idPerfil" int4 DEFAULT NULL,
  "idMenu" int4 DEFAULT NULL
)
WITH (OIDS=TRUE)
;

-- ----------------------------
-- Records of Permissoes
-- ----------------------------
INSERT INTO "siscec"."Permissoes" VALUES (1, 2, 1);
INSERT INTO "siscec"."Permissoes" VALUES (2, 2, 2);
INSERT INTO "siscec"."Permissoes" VALUES (3, 2, 3);
INSERT INTO "siscec"."Permissoes" VALUES (4, 2, 4);
INSERT INTO "siscec"."Permissoes" VALUES (5, 2, 5);
INSERT INTO "siscec"."Permissoes" VALUES (6, 2, 6);
INSERT INTO "siscec"."Permissoes" VALUES (7, 2, 7);
INSERT INTO "siscec"."Permissoes" VALUES (8, 2, 8);
INSERT INTO "siscec"."Permissoes" VALUES (9, 2, 9);
INSERT INTO "siscec"."Permissoes" VALUES (10, 2, 10);
INSERT INTO "siscec"."Permissoes" VALUES (11, 2, 11);
INSERT INTO "siscec"."Permissoes" VALUES (12, 1, 1);
INSERT INTO "siscec"."Permissoes" VALUES (13, 1, 2);
INSERT INTO "siscec"."Permissoes" VALUES (14, 1, 3);
INSERT INTO "siscec"."Permissoes" VALUES (15, 1, 4);
INSERT INTO "siscec"."Permissoes" VALUES (16, 1, 5);
INSERT INTO "siscec"."Permissoes" VALUES (17, 1, 6);
INSERT INTO "siscec"."Permissoes" VALUES (18, 1, 7);
INSERT INTO "siscec"."Permissoes" VALUES (19, 1, 8);
INSERT INTO "siscec"."Permissoes" VALUES (20, 1, 9);
INSERT INTO "siscec"."Permissoes" VALUES (21, 1, 10);
INSERT INTO "siscec"."Permissoes" VALUES (22, 1, 11);
INSERT INTO "siscec"."Permissoes" VALUES (36, 3, 2);
INSERT INTO "siscec"."Permissoes" VALUES (37, 3, 3);
INSERT INTO "siscec"."Permissoes" VALUES (39, 3, 5);
INSERT INTO "siscec"."Permissoes" VALUES (40, 3, 6);
INSERT INTO "siscec"."Permissoes" VALUES (44, 3, 10);
INSERT INTO "siscec"."Permissoes" VALUES (45, 3, 11);
INSERT INTO "siscec"."Permissoes" VALUES (47, 0, 11);
INSERT INTO "siscec"."Permissoes" VALUES (48, 0, 2);
INSERT INTO "siscec"."Permissoes" VALUES (49, 0, 3);
INSERT INTO "siscec"."Permissoes" VALUES (51, 0, 5);
INSERT INTO "siscec"."Permissoes" VALUES (52, 0, 6);
INSERT INTO "siscec"."Permissoes" VALUES (56, 0, 10);

-- ----------------------------
-- Table structure for Usuarios
-- ----------------------------
DROP TABLE IF EXISTS "siscec"."Usuarios";
CREATE TABLE "siscec"."Usuarios" (
  "id" int4 NOT NULL DEFAULT nextval('siscec.usuarios_id_seq'::regclass),
  "idSetor" int4 NOT NULL DEFAULT NULL,
  "login" varchar(80) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "perfil" int4 NOT NULL DEFAULT NULL,
  "ativo" bool NOT NULL DEFAULT NULL,
  "idPessoa" int4 DEFAULT NULL,
  "dataCadastro" date DEFAULT ('now'::text)::date
)
WITH (OIDS=TRUE)
;

-- ----------------------------
-- Records of Usuarios
-- ----------------------------
INSERT INTO "siscec"."Usuarios" VALUES (6, 19, 'alex.florindo', 2, 't', 11, '2017-12-13');
INSERT INTO "siscec"."Usuarios" VALUES (10, 1, 'emanuelle.hurtado', 0, 't', 15, '2018-01-15');
INSERT INTO "siscec"."Usuarios" VALUES (9, 1, 'fernando.santos', 0, 't', 14, '2018-01-15');
INSERT INTO "siscec"."Usuarios" VALUES (8, 19, 'leonardo.calheiros', 2, 't', 10, '2018-01-15');
INSERT INTO "siscec"."Usuarios" VALUES (11, 19, 'jose.neto', 2, 't', 18, '2018-01-15');
INSERT INTO "siscec"."Usuarios" VALUES (7, 1, 'isaque.neves', 3, 't', 9, '2017-12-13');

-- ----------------------------
-- Function structure for boolean_ilike
-- ----------------------------
DROP FUNCTION IF EXISTS "siscec"."boolean_ilike"("leftop" bool, "rightop" text);
CREATE OR REPLACE FUNCTION "siscec"."boolean_ilike"("leftop" bool, "rightop" text)
  RETURNS "pg_catalog"."bool" AS $BODY$ SELECT texticlike($1::text, $2);$BODY$
  LANGUAGE sql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for date_ilike
-- ----------------------------
DROP FUNCTION IF EXISTS "siscec"."date_ilike"("leftop" date, "rightop" text);
CREATE OR REPLACE FUNCTION "siscec"."date_ilike"("leftop" date, "rightop" text)
  RETURNS "pg_catalog"."bool" AS $BODY$ SELECT  texticlike(to_char($1,'DD/MM/YYYY'), $2) ;$BODY$
  LANGUAGE sql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for int_ilike
-- ----------------------------
DROP FUNCTION IF EXISTS "siscec"."int_ilike"("leftop" int4, "rightop" text);
CREATE OR REPLACE FUNCTION "siscec"."int_ilike"("leftop" int4, "rightop" text)
  RETURNS "pg_catalog"."bool" AS $BODY$ SELECT texticlike($1::text, $2);$BODY$
  LANGUAGE sql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for int_like
-- ----------------------------
DROP FUNCTION IF EXISTS "siscec"."int_like"("leftop" int4, "rightop" text);
CREATE OR REPLACE FUNCTION "siscec"."int_like"("leftop" int4, "rightop" text)
  RETURNS "pg_catalog"."bool" AS $BODY$ SELECT texticlike($1::text, $2);$BODY$
  LANGUAGE sql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for money_ilike
-- ----------------------------
DROP FUNCTION IF EXISTS "siscec"."money_ilike"("leftop" money, "rightop" text);
CREATE OR REPLACE FUNCTION "siscec"."money_ilike"("leftop" money, "rightop" text)
  RETURNS "pg_catalog"."bool" AS $BODY$SELECT texticlike($1::text, $2);$BODY$
  LANGUAGE sql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for remove_acentos
-- ----------------------------
DROP FUNCTION IF EXISTS "siscec"."remove_acentos"(varchar);
CREATE OR REPLACE FUNCTION "siscec"."remove_acentos"(varchar)
  RETURNS "pg_catalog"."varchar" AS $BODY$
SELECT TRANSLATE(($1),

'áéíóúàèìòùãõâêîôôäëïöüçÁÉÍÓÚÀÈÌÒÙÃÕÂÊÎÔÛÄËÏÖÜÇ',
'aeiouaeiouaoaeiooaeioucAEIOUAEIOUAOAEIOOAEIOUC')
$BODY$
  LANGUAGE sql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for text_ilike
-- ----------------------------
DROP FUNCTION IF EXISTS "siscec"."text_ilike"("leftop" text, "rightop" text);
CREATE OR REPLACE FUNCTION "siscec"."text_ilike"("leftop" text, "rightop" text)
  RETURNS "pg_catalog"."bool" AS $BODY$ SELECT texticlike(remove_acentos($1), remove_acentos($2)) ;$BODY$
  LANGUAGE sql VOLATILE
  COST 100;

-- ----------------------------
-- View structure for ViewContratos
-- ----------------------------
DROP VIEW IF EXISTS "siscec"."ViewContratos";
CREATE VIEW "siscec"."ViewContratos" AS  SELECT c.id,
    c.valor,
    c."idControle",
    c."numeroProcesso",
    c."anoProcesso",
    c."numeroContrato",
    c."anoContrato",
    c."dataInicio",
    c."dataFim",
    c."prazoLimiteAditivo",
    c."tipoContrato",
    c."tipoAditivo",
    c.situacao,
    c."dataAditivo",
    c."justificativaAditivo",
        CASE
            WHEN (sum(e.valor) IS NULL) THEN (0)::money
            ELSE sum(e.valor)
        END AS empenhado,
        CASE
            WHEN (p.pago IS NULL) THEN (0)::money
            ELSE p.pago
        END AS pago,
    (((c.valor)::numeric - (
        CASE
            WHEN (p.pago IS NULL) THEN (0)::money
            ELSE p.pago
        END)::numeric))::money AS saldo
   FROM ((siscec."Contratos" c
     LEFT JOIN ( SELECT m."idContrato",
            sum(p_1.valor) AS pago
           FROM siscec."Parcelas" p_1,
            siscec."Medicoes" m
          WHERE (p_1."idMedicao" = m.id)
          GROUP BY m."idContrato") p ON ((p."idContrato" = c.id)))
     LEFT JOIN siscec."Empenhos" e ON ((e."idContrato" = c.id)))
  GROUP BY p.pago, c.id, c.valor, c."idControle", c."numeroProcesso", c."anoProcesso", c."numeroContrato", c."anoContrato", c."dataInicio", c."dataFim", c."prazoLimiteAditivo", c."tipoContrato", c."tipoAditivo", c.situacao, c."dataAditivo", c."justificativaAditivo";

-- ----------------------------
-- View structure for ViewControles
-- ----------------------------
DROP VIEW IF EXISTS "siscec"."ViewControles";
CREATE VIEW "siscec"."ViewControles" AS  SELECT "Controles".id,
    "Controles"."idSetor",
    "Controles".objeto,
    "Controles".concluido,
    "Controles".modalidade,
    "Controles"."previsaoGasto",
    "Controles"."idPessoa",
    "Controles"."numeroControle",
    "Controles"."dataCadastro",
    historico_setores."dataInicio" AS "setorDataInicio",
    historico_setores.sigla AS "setorSigla",
    historico_setores.nome AS "setorNome",
    historico_setores."numeroLei" AS "setorNumeroLei",
    historico_setores."isOficial" AS "setorIsOficial",
    historico_setores."anoLei" AS "setorAnoLei",
    historico_setores."dataDiario" AS "setorDataDiario",
    historico_setores."numeroDiario" AS "setorNumeroDiario",
    "Contratos".situacao AS "contratoSituacao",
    pessoas.nome AS "pessoaNome"
   FROM (((siscec."Controles"
     LEFT JOIN siscec."Contratos" ON (("Controles".id = "Contratos"."idControle")))
     LEFT JOIN pmro_padrao.historico_setores ON (((historico_setores."idSetor" = "Controles"."idSetor") AND (historico_setores."dataInicio" = ( SELECT max("HistoricoSetores_1"."dataInicio") AS max
           FROM pmro_padrao.historico_setores "HistoricoSetores_1"
          WHERE (("Controles"."idSetor" = "HistoricoSetores_1"."idSetor") AND ("HistoricoSetores_1"."dataInicio" <= "Controles"."dataCadastro")))))))
     LEFT JOIN pmro_padrao.pessoas ON (("Controles"."idPessoa" = pessoas.id)));

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "siscec"."Menus_id_seq"
OWNED BY "siscec"."Menus"."id";
SELECT setval('"siscec"."Menus_id_seq"', 2, false);
ALTER SEQUENCE "siscec"."Perfis_id_seq"
OWNED BY "siscec"."Perfis"."id";
SELECT setval('"siscec"."Perfis_id_seq"', 2, false);
ALTER SEQUENCE "siscec"."Permissoes_id_seq"
OWNED BY "siscec"."Permissoes"."id";
SELECT setval('"siscec"."Permissoes_id_seq"', 57, true);
SELECT setval('"siscec"."contratos_id_seq"', 75, true);
SELECT setval('"siscec"."controles_id_seq"', 147, true);
SELECT setval('"siscec"."empenhos_id_seq"', 30, true);
SELECT setval('"siscec"."fiscais_id_seq"', 46, true);
SELECT setval('"siscec"."medicoes_id_seq"', 32, true);
SELECT setval('"siscec"."parcelas_id_seq"', 37, true);
SELECT setval('"siscec"."usuarios_id_seq"', 13, true);

-- ----------------------------
-- Primary Key structure for table FonteRecursos
-- ----------------------------
ALTER TABLE "siscec"."FonteRecursos" ADD CONSTRAINT "FonteRecursos_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table Menus
-- ----------------------------
ALTER TABLE "siscec"."Menus" ADD CONSTRAINT "Menus_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table Perfis
-- ----------------------------
ALTER TABLE "siscec"."Perfis" ADD CONSTRAINT "Perfis_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table Permissoes
-- ----------------------------
ALTER TABLE "siscec"."Permissoes" ADD CONSTRAINT "Permissoes_pkey" PRIMARY KEY ("id");
