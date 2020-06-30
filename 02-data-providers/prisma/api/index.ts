import { PrismaClient } from "@prisma/client";
import * as bodyParser from "body-parser";
import express from "express";

const prisma = new PrismaClient();
const app = express();

// Helper methods

const catchAsync = (fn: any) => {
  return (req: any, res: any, next: any) => {
    fn(req, res, next).catch(next);
  };
};

// Coniguration

app.use(bodyParser.json());

// Users APIs

app.get(
  `/users`,
  catchAsync(async (_req: any, res: any, _next: any) => {
    // Get the data
    const result = await prisma.user.findMany();
    // Set the headers
    res.set("x-total-count", result.length.toString());
    // Return the result
    res.json(result);
  })
);

app.post(
  `/users`,
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request body
    const { email, name } = req.body;
    // Create the entity
    const result = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    // Return the result
    res.json(result);
  })
);

app.get(
  `/users/:id`,
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request params
    const { id } = req.params;
    // Get the data
    const result = await prisma.user.findOne({
      where: {
        id: Number(id),
      },
    });
    // Return the result
    res.json(result);
  })
);

app.put(
  "/users/:id",
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request params
    const { id } = req.params;
    // Deserialize the request body
    const { name } = req.body;
    // Update the entity
    const result = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
      },
    });
    // Return the result
    res.json(result);
  })
);

app.delete(
  `/users/:id`,
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request params
    const { id } = req.params;
    // Delete the entity
    const result = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    // Return the result
    res.json(result);
  })
);

// Posts APIs

app.get(
  `/posts`,
  catchAsync(async (_req: any, res: any, _next: any) => {
    // Get the data
    const result = await prisma.post.findMany();
    // Set headers
    res.set("x-total-count", result.length.toString());
    // Return the result
    res.json(result);
  })
);

app.post(
  `/posts`,
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request body
    const { title, content, authorId } = req.body;
    // Create the entity
    const result = await prisma.post.create({
      data: {
        title,
        content,
        published: false,
        author: { connect: { id: authorId } },
      },
    });
    // Return the result
    res.json(result);
  })
);

app.get(
  `/posts/:id`,
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request params
    const { id } = req.params;
    // Get the data
    const result = await prisma.post.findOne({
      where: {
        id: Number(id),
      },
    });
    // Return the result
    res.json(result);
  })
);

app.put(
  "/posts/:id",
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request params
    const { id } = req.params;
    // Deserialize the request body
    const { title, content, authorId } = req.body;
    // Update the entity
    const result = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        published: false,
        author: { connect: { id: authorId } },
      },
    });
    // Return the result
    res.json(result);
  })
);

app.delete(
  `/posts/:id`,
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request params
    const { id } = req.params;
    // Delete the entity
    const result = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    // Return the result
    res.json(result);
  })
);

// Error handling

app.use((err: any, _req: any, res: any, _next: any) => {
  res.status(500);
  res.json({ error: err });
});

const server = app.listen(3001, () =>
  console.log("🚀 Server ready at: http://localhost:3001")
);
