import { pgTable, pgEnum, serial, text, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["admin", "user", "userAdminRoleAuth"]);

// Users Table
export const usersTable = pgTable("users", {
  user_id: serial("user_id").primaryKey(),
  full_name: text("full_name"),
  email: varchar("email", { length: 255 }).unique(),
  contact_phone: text("contact_phone"),
  address: text("address"),
  role: roleEnum("role").default("user"),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

//task table
export const taskTable=pgTable("task_table",{
    task_id:serial("task_id").primaryKey(),
    user_id:integer("user_id").notNull().references(()=>usersTable.user_id,{onDelete:"cascade"}),
    task:text("task"),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
// Authentication Table
export const AuthOnUsersTable = pgTable("auth_on_users", {
    auth_id: serial("auth_id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => usersTable.user_id, { onDelete: "cascade" }),
    password: varchar("password", { length: 100 }),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  });

  export const AuthOnUsersRelations = relations(usersTable, ({ one }) => ({
    user: one(AuthOnUsersTable, {
        fields: [usersTable.user_id],
        references: [AuthOnUsersTable.user_id]
    })
  }));
 
  export const UsersTaskRelations = relations(taskTable, ({ many,one }) => ({
    user: one(usersTable,{
      fields: [taskTable.user_id],
      references: [usersTable.user_id],
    })
  }))
export type tiUsers = typeof usersTable.$inferInsert;
export type tsUsers = typeof usersTable.$inferSelect;
export type tiTask = typeof taskTable.$inferInsert;
export type tsTask = typeof taskTable.$inferSelect;
export type tiAuthOnUsers = typeof AuthOnUsersTable.$inferInsert;
export type tsAuthOnUsers = typeof AuthOnUsersTable.$inferSelect;