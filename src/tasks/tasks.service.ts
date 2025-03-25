import { Column, eq, gt, sql } from "drizzle-orm";
import db from "../drizzle/db";
import {taskTable, tsTask,tiTask} from "../drizzle/schema"


export const taskService = async (limit?: number):Promise<tsTask [] | null> => {
    if (limit) {
        return await db.query.taskTable.findMany({
            limit: limit
        });
    }
    return await db.query.taskTable.findMany();
}

export const getTaskService = async (id: number) => {
    return await db.query.taskTable.findFirst({
        where: eq(taskTable.task_id, id)
    })
}



export const taskData = async () => {
    return await db.query.taskTable.findMany({
        columns:{
            user_id:true,
            task_id:true,
            status:true,
            task:true,
           updated_at:true,
           created_at:true,
        },with:{
           user:{
                columns:{
                   address:true,
                   contact_phone:true,
                   created_at:true,
                   email:true,
                   full_name:true,
                   updated_at:true
                }
            }
        }
    })
}
export const createTaskService = async (task:tiTask):Promise<string | null>  => {
    await db.insert(taskTable).values(task)
    return "task created successfully";
}

export const updateTaskService = async (id: number, task: tiTask):Promise<string | null> => {
    await db.update(taskTable).set(task).where(eq(taskTable.task_id, id))
    return "task updated successfully";
}

export const deleteTaskService = async (id: number):Promise<string | null>  => {
    await db.delete(taskTable).where(eq(taskTable.task_id, id))
    return "task deleted successfully";
}
