ALTER TABLE "fancy_text" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_search_index" ON "fancy_text" USING gin (to_tsvector('english', "name"));