CREATE TABLE "talks" (
	"id" serial PRIMARY KEY NOT NULL,
	"time" varchar(50) NOT NULL,
	"title" text NOT NULL,
	"speaker" text,
	"icon_name" varchar(50) NOT NULL,
	"icon_color" varchar(50) NOT NULL,
	"is_current" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);
