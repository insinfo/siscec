SELECT *
FROM "controles"
WHERE ("idSetor" ILIKE '%%' AND "modalidade" ILIKE '%%' AND "objeto" ILIKE '%%')
      AND exists(SELECT *
                 FROM "contratos"
                 WHERE "controles"."id" = "contratos"."idControle" AND "situacao" ILIKE '%%') AND exists(SELECT *
                                                                                                         FROM "pessoas"
                                                                                                         WHERE
                                                                                                           "controles"."idPessoa"
                                                                                                           =
                                                                                                           "pessoas"."id");


SELECT *
FROM "HistoricoSetores"
WHERE "HistoricoSetores"."idSetor" IN ('%%', '%%')
ORDER BY "dataInicio" DESC;


SELECT *
FROM "contratos"
WHERE "contratos"."idControle" IN ('%%', '%%', '%%');


SELECT *
FROM "pessoas"
WHERE "pessoas"."id" IN ('%%', '%%', '%%');


/*trazer controles com e sem contratos*/
SELECT
  "contratos"."situacao",
  "controles".*,
  "HistoricoSetores".*
FROM "controles"

  LEFT OUTER JOIN "contratos" ON "controles"."id" = "contratos"."idControle"

  LEFT OUTER JOIN "pmro_padrao"."HistoricoSetores" ON "controles"."idSetor" = "HistoricoSetores"."idSetor"

                                                      AND "HistoricoSetores"."dataInicio" =

                                                          (SELECT max("HistoricoSetores"."dataInicio")
                                                           FROM "pmro_padrao"."HistoricoSetores"
                                                           WHERE
                                                             "controles"."idSetor" = "HistoricoSetores"."idSetor" AND
                                                             "HistoricoSetores"."dataInicio" <=
                                                             "controles"."dataCadastro")

  LEFT OUTER JOIN "pmro_padrao"."pessoas" ON "controles"."idPessoa" = "pessoas"."id"

WHERE ("controles"."idSetor" ILIKE '%%' AND "controles"."modalidade" ILIKE '%%')

      AND ("contratos"."situacao" ILIKE '%%' OR "contratos"."situacao" ISNULL)

      AND (
        "controles"."numeroControle" ILIKE '%%' OR "controles"."objeto" ILIKE '%%'
        OR "HistoricoSetores"."nome" ILIKE '%%' OR "pessoas"."nome" ILIKE '%%'
      );

/*
SELECT * FROM "pmro_padrao"."Setores" s, "pmro_padrao"."HistoricoSetores" sh
       WHERE s."id" = sh."idSetor"
       AND sh."dataInicio" = (SELECT max("dataInicio") FROM "pmro_padrao"."HistoricoSetores" WHERE "idSetor" = s."id" AND "dataInicio" <= '2018-09-01')

SELECT max("dataInicio") FROM "pmro_padrao"."HistoricoSetores" WHERE "dataInicio" <= '2018-09-01'

*/
