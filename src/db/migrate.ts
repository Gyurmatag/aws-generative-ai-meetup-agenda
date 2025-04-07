import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { migrate } from "drizzle-orm/neon-http/migrator";
import * as schema from "./schema";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables
dotenv.config({ path: resolve(__dirname, "../../.env") });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Initial meetup schedule data
const initialTalks = [
  {
    time: "17:00 - 17:30",
    title: "Kapunyitás",
    speaker: "",
    iconName: "Users",
    iconColor: "text-gray-500",
    isCurrent: false,
  },
  {
    time: "17:30 - 18:00",
    title: "Keynote: Mastering Prompt Engineering for Smarter Interactions",
    speaker: "Kacper Dąbrowski, AWS",
    iconName: "Lightbulb",
    iconColor: "text-amber-500",
    isCurrent: false,
  },
  {
    time: "18:00 - 18:40",
    title: "GenAI security",
    speaker: "Czirok László, TC2",
    iconName: "Shield",
    iconColor: "text-emerald-500",
    isCurrent: false,
  },
  {
    time: "18:40 - 19:10",
    title: "AWS Amplify vs Vercel vs Cloudflare Pages / Workers",
    speaker: "Varga György, Shiwaforce",
    iconName: "Cloud",
    iconColor: "text-sky-500",
    isCurrent: true,
  },
  {
    time: "19:10",
    title: "Generative AI kvíz, nyereményekkel",
    speaker: "",
    iconName: "Gift",
    iconColor: "text-purple-500",
    isCurrent: false,
  },
];

async function main() {
  console.log("Using database URL:", databaseUrl);
  const sqlClient = neon(databaseUrl as string);
  const db = drizzle(sqlClient, { schema });

  try {
    // Drop existing tables if they exist
    console.log("Dropping existing tables...");
    await sqlClient`DROP TABLE IF EXISTS "posts" CASCADE`;
    await sqlClient`DROP TABLE IF EXISTS "users" CASCADE`;
    await sqlClient`DROP TABLE IF EXISTS "talks" CASCADE`;
    console.log("Existing tables dropped!");

    // Run migrations
    console.log("Running migrations...");
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations completed!");

    // Insert initial data
    console.log("Inserting initial meetup schedule data...");
    
    // Insert talks
    for (const talk of initialTalks) {
      await db.insert(schema.talks).values(talk).onConflictDoNothing();
    }
    
    console.log("Initial meetup schedule data inserted!");
  } catch (error) {
    console.error("Error during database setup:", error);
    throw error;
  }
  
  process.exit(0);
}

main().catch((err) => {
  console.error("Error during migration:", err);
  process.exit(1);
}); 