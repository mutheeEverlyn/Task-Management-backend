import { Hono } from "hono";
import { listTasks, getTasks, createTasks, updateTasks, deleteTasks,tasks} from "./tasks.controller"
import { zValidator } from "@hono/zod-validator";
import { taskSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const tasksRouter = new Hono();


tasksRouter.get("/tasks",userAdminRoleAuth, listTasks);

tasksRouter.get("/tasksData",userAdminRoleAuth, tasks);

tasksRouter.get("/tasks/:id",userAdminRoleAuth, getTasks)

tasksRouter.post("/tasks",zValidator('json',taskSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}), userRoleAuth,createTasks)

tasksRouter.put("/tasks/:id",userAdminRoleAuth, updateTasks)

tasksRouter.delete("/tasks/:id",adminRoleAuth, deleteTasks)

