/** @type { import("drizzle-kit").Config } */
export default {
  schema: './configs/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:OPsqT9JSKLa6@ep-shy-sea-a5ap8l1y.us-east-2.aws.neon.tech/car-maeketplace?sslmode=require',
  },
}
