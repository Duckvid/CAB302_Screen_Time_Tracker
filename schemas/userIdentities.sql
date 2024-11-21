-- public."userIdentities" definition

-- Drop table

-- DROP TABLE public."userIdentities";

CREATE TABLE public."userIdentities" (
	"userID" int4 NOT NULL,
	provider text NOT NULL,
	"providerToken" text NULL,
	"providerID" text NULL,
	picture text NULL,
	CONSTRAINT useridentities_pk PRIMARY KEY ("userID", provider),
	CONSTRAINT useridentities_fk FOREIGN KEY ("userID") REFERENCES public."users"("userID")
);