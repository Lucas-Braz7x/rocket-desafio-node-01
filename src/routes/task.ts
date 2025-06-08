import { randomUUID } from "node:crypto";
import { buildRoutePath } from "../utils";
import { Database } from "../infra/db/database";
import { ServerResponse } from "node:http";
import { TaskProps } from "../dtos";

const database = new Database();

const TABLE_NAME = "task";

const verifyTaskExist = (id: string) => {
  const tasks: TaskProps[] = database.select(TABLE_NAME, null);

  const task = tasks.find((record) => record.id === id);

  return task;
};

const validateBodyRequest = (body: TaskProps) => {
  if (!body?.description || !body?.title) {
    return true;
  }

  return false;
};

export const routesTask = [
  {
    method: "GET",
    path: buildRoutePath("/task"),
    handler: (req: any, res: ServerResponse) => {
      const { search } = req.query;

      const tasks: TaskProps | TaskProps[] = database.select(
        TABLE_NAME,
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/task"),
    handler: (req: any, res: ServerResponse) => {
      const bodyDoesNotValid = validateBodyRequest(req.body);

      if (bodyDoesNotValid) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: "Body incorrect: description or title is empty",
          })
        );
      }

      const { description, title }: TaskProps = req.body;

      const task: TaskProps = {
        id: randomUUID(),
        description,
        title,
        updated_at: new Date(),
        created_at: new Date(),
      };

      database.insert(TABLE_NAME, task);

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/task/:id"),
    handler: (req: any, res: ServerResponse) => {
      const { id } = req.params;

      if (!req.body.description && !req.body.title) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: "Body incorrect: description and title is empty",
          })
        );
      }

      const { description, title }: TaskProps = req.body;

      const taskExist = verifyTaskExist(id);

      if (taskExist === undefined) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: "Task not found",
          })
        );
      }

      database.update(TABLE_NAME, id, {
        ...taskExist,
        description: description || taskExist.description,
        title: title || taskExist.title,
        updated_at: new Date(),
      });

      return res.writeHead(204).end();
    },
  },

  {
    method: "PATCH",
    path: buildRoutePath("/task/:id/complete"),
    handler: (req: any, res: ServerResponse) => {
      const { id } = req.params;

      const taskExist = verifyTaskExist(id);

      if (taskExist === undefined) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: "Task not found",
          })
        );
      }

      database.update(TABLE_NAME, id, {
        ...taskExist,
        completed_at: new Date(),
      });

      return res.writeHead(204).end();
    },
  },

  {
    method: "DELETE",
    path: buildRoutePath("/task/:id"),
    handler: (req: any, res: ServerResponse) => {
      const { id } = req.params;

      const taskExist = verifyTaskExist(id);

      if (taskExist === undefined) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: "Task not found",
          })
        );
      }

      database.delete(TABLE_NAME, id);

      return res.writeHead(204).end();
    },
  },
];
