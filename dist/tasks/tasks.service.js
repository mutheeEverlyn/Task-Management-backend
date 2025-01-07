"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskService = exports.updateTaskService = exports.createTaskService = exports.taskData = exports.getTaskService = exports.taskService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const taskService = async (limit) => {
    if (limit) {
        return await db_1.default.query.taskTable.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.taskTable.findMany();
};
exports.taskService = taskService;
const getTaskService = async (id) => {
    return await db_1.default.query.taskTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.taskTable.task_id, id)
    });
};
exports.getTaskService = getTaskService;
const taskData = async () => {
    return await db_1.default.query.taskTable.findMany({
        columns: {
            user_id: true,
            task_id: true,
            updated_at: true,
            created_at: true,
        }, with: {
            user: {
                columns: {
                    address: true,
                    contact_phone: true,
                    created_at: true,
                    email: true,
                    full_name: true,
                    updated_at: true
                }
            }
        }
    });
};
exports.taskData = taskData;
const createTaskService = async (task) => {
    await db_1.default.insert(schema_1.taskTable).values(task);
    return "task created successfully";
};
exports.createTaskService = createTaskService;
const updateTaskService = async (id, task) => {
    await db_1.default.update(schema_1.taskTable).set(task).where((0, drizzle_orm_1.eq)(schema_1.taskTable.task_id, id));
    return "task updated successfully";
};
exports.updateTaskService = updateTaskService;
const deleteTaskService = async (id) => {
    await db_1.default.delete(schema_1.taskTable).where((0, drizzle_orm_1.eq)(schema_1.taskTable.task_id, id));
    return "task deleted successfully";
};
exports.deleteTaskService = deleteTaskService;
