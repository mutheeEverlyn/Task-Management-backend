import { Context } from "hono";
import { taskService, getTaskService, createTaskService, updateTaskService, deleteTaskService,taskData } from "./tasks.service";

export const listTasks= async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))

        const data = await taskService(limit);
        if (data == null || data.length == 0) {
            return c.text("tasks not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getTasks= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const tasks = await getTaskService(id);
    if (tasks== undefined) {
        return c.text("tasks not found", 404);
    }
    return c.json(tasks, 200);
}

// data
export const tasks = async (c: Context) => {
    try {
        const data= await taskData();
        if (data == null || data.length == 0){
        return c.text("tasks not found", 404);
        }
        return c.json(data,200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
export const createTasks = async (c: Context) => {
    try {
        const tasks = await c.req.json();
        const createdTasks = await createTaskService(tasks);


        if (!createdTasks) return c.text("tasks not created", 404);
        return c.json({ msg: createdTasks}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateTasks = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const tasks = await c.req.json();
    try {
        const searchedTasks = await getTaskService(id);
        if (searchedTasks == undefined) return c.text("tasks not found", 404);
        // get the data and update it
        const res = await updateTaskService(id, tasks);
        if (!res) return c.text("tasks not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteTasks= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
       
        const tasks = await getTaskService(id);
        if (tasks== undefined) return c.text("tasks not found", 404);
        
        const res = await deleteTaskService(id);
        if (!res) return c.text("tasks not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}