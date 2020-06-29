import { PrismaClient } from "@prisma/client";
import * as bodyParser from "body-parser";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

// Users APIs

app.get(`/users`, async (_, res) => {
  // Get the data
  const result = await prisma.user.findMany();
  // Set the headers
  res.set("x-total-count", result.length.toString());
  // Return the result
  res.json(result);
});

app.post(`/users`, async (req, res) => {
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
});

app.get(`/users/:id`, async (req, res) => {
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
});

app.put("/users/:id", async (req, res) => {
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
});

app.delete(`/users/:id`, async (req, res) => {
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
});

// Posts APIs

app.get(`/posts`, async (_, res) => {
  // Get the data
  const result = await prisma.post.findMany();
  // Set headers
  res.set("x-total-count", result.length.toString());
  // Return the result
  res.json(result);
});

app.post(`/posts`, async (req, res) => {
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
});

app.get(`/posts/:id`, async (req, res) => {
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
});

app.put("/posts/:id", async (req, res) => {
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
});

app.delete(`/posts/:id`, async (req, res) => {
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
});

// Error catch-all

app.use(
  (
    err: any,
    req: any,
    res: any,
    next: any
  ) => {
    console.log("in error method");
    res.status(500);
    res.render("error", { error: err });
  }
);

const server = app.listen(3001, () =>
  console.log("🚀 Server ready at: http://localhost:3001")
);
