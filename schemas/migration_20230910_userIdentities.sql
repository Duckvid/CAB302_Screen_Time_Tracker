CREATE TABLE "userIdentities" (
	"userID" int4 NOT NULL,
	provider text NOT NULL,
	"providerToken" text NULL,
	"providerID" text NULL,
	picture text NULL,
	CONSTRAINT useridentities_pk PRIMARY KEY ("userID", provider),
	CONSTRAINT useridentities_fk FOREIGN KEY ("userID") REFERENCES "users"("userID")
);

INSERT INTO "userIdentities"("userID", "provider", "providerToken", "providerID", "picture")
SELECT "userID", "provider", "providerToken", NULL AS "providerID", "picture"
FROM users;

ALTER TABLE "users"
DROP COLUMN provider,
DROP COLUMN "providerToken",
DROP COLUMN "picture";