"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const hono_1 = require("hono");
const tasks_controller_1 = require("./tasks.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const bearAuth_1 = require("../middleware/bearAuth");
exports.tasksRouter = new hono_1.Hono();
exports.tasksRouter.get("/tasks", bearAuth_1.userAdminRoleAuth, tasks_controller_1.listTasks);
exports.tasksRouter.get("/tasksData", bearAuth_1.userAdminRoleAuth, tasks_controller_1.tasks);
exports.tasksRouter.get("/tasks/:id", bearAuth_1.userAdminRoleAuth, tasks_controller_1.getTasks);
exports.tasksRouter.post("/tasks", (0, zod_validator_1.zValidator)('json', validators_1.taskSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), bearAuth_1.userRoleAuth, tasks_controller_1.createTasks);
exports.tasksRouter.put("/tasks/:id", bearAuth_1.userAdminRoleAuth, tasks_controller_1.updateTasks);
exports.tasksRouter.delete("/tasks/:id", bearAuth_1.adminRoleAuth, tasks_controller_1.deleteTasks);
