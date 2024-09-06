import { integer, json, pgTable, serial, varchar } from 'drizzle-orm/pg-core'

export const CarListing = pgTable('carListing', {
  id: serial('id').primaryKey(),
  listingTitle: varchar('listingTitle').notNull(),
  tagline: varchar('tagline').notNull(),
  price: varchar('price').notNull(),
  brand: varchar('brand').notNull(),
  model: varchar('model').notNull(),
  year: varchar('year').notNull(),
  color: varchar('color'),
  mileage: varchar('mileage'),
  mileages: varchar('mileages'),
  description: varchar('description'),
  features: json('features'),
  createdBy: varchar('createdBy').notNull(),
  postedOn: varchar('postedOn'),
})

export const CarImage = pgTable('carImage', {
  id: serial('id').primaryKey(),
  imageUrl: varchar('imageUrl').notNull(),
  carListingId: integer('carListingId')
    .notNull()
    .references(() => CarListing.id),
})
