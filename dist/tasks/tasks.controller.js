"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTasks = exports.updateTasks = exports.createTasks = exports.tasks = exports.getTasks = exports.listTasks = void 0;
const tasks_service_1 = require("./tasks.service");
const listTasks = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, tasks_service_1.taskService)(limit);
        if (data == null || data.length == 0) {
            return c.text("tasks not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listTasks = listTasks;
const getTasks = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const tasks = await (0, tasks_service_1.getTaskService)(id);
    if (tasks == undefined) {
        return c.text("tasks not found", 404);
    }
    return c.json(tasks, 200);
};
exports.getTasks = getTasks;
// data
const tasks = async (c) => {
    try {
        const data = await (0, tasks_service_1.taskData)();
        if (data == null || data.length == 0) {
            return c.text("tasks not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.tasks = tasks;
const createTasks = async (c) => {
    try {
        const tasks = await c.req.json();
        const createdTasks = await (0, tasks_service_1.createTaskService)(tasks);
        if (!createdTasks)
            return c.text("tasks not created", 404);
        return c.json({ msg: createdTasks }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createTasks = createTasks;
const updateTasks = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const tasks = await c.req.json();
    try {
        const searchedTasks = await (0, tasks_service_1.getTaskService)(id);
        if (searchedTasks == undefined)
            return c.text("tasks not found", 404);
        // get the data and update it
        const res = await (0, tasks_service_1.updateTaskService)(id, tasks);
        if (!res)
            return c.text("tasks not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateTasks = updateTasks;
const deleteTasks = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const tasks = await (0, tasks_service_1.getTaskService)(id);
        if (tasks == undefined)
            return c.text("tasks not found", 404);
        const res = await (0, tasks_service_1.deleteTaskService)(id);
        if (!res)
            return c.text("tasks not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteTasks = deleteTasks;
