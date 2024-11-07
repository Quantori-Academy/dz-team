DROP VIEW IF EXISTS "CombinedList";

CREATE OR REPLACE VIEW "CombinedList" AS
SELECT
    "Reagent"."id",
    'reagent' AS category,
    "Reagent"."name",
    "Reagent"."structure",
    "Reagent"."description",
    "Reagent"."quantity",
    "Reagent"."unit",
    "Reagent"."quantityInit",
    "Reagent"."expirationDate",
    "Reagent"."cas",
    "Reagent"."producer",
    "Reagent"."catalogId",
    "Reagent"."catalogLink",
    "Reagent"."pricePerUnit",
    "Reagent"."currency",
    "Reagent"."type",
    "Reagent"."status",
    "Reagent"."createdAt",
    "Reagent"."updatedAt",
    "Reagent"."deletedAt",
    ("StorageLocation"."room" || ', ' || "StorageLocation"."name") AS "storageLocation"
FROM
    "Reagent"
JOIN
    "StorageLocation" ON "Reagent"."storageId" = "StorageLocation"."id"

UNION ALL

SELECT
    "Sample"."id",
    'sample' AS category,
    "Sample"."name",
    "Sample"."structure",
    "Sample"."description",
    "Sample"."quantity",
    "Sample"."unit",
    "Sample"."quantityInit",
    "Sample"."expirationDate",
    NULL AS "cas",
    NULL AS "producer",
    NULL AS "catalogId",
    NULL AS "catalogLink",
    NULL AS "pricePerUnit",
    NULL AS "currency",
    NULL AS "type",
    NULL AS "status",
    "Sample"."createdAt",
    "Sample"."updatedAt",
    "Sample"."deletedAt",
    ("StorageLocation"."room" || ', ' || "StorageLocation"."name") AS "storageLocation"
FROM
    "Sample"
JOIN
    "StorageLocation" ON "Sample"."storageId" = "StorageLocation"."id";
