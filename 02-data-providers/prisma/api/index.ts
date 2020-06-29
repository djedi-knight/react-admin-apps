import { PrismaClient } from "@prisma/client";
import * as bodyParser from "body-parser";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

app.post(`/users`, async (req, res) => {
  // Deserialize the request
  const { email, name } = req.body;
  // Create the user
  const result = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  // Return the result
  res.json(result);
});

app.get(`/users`, async (_, res) => {
  // Get data
  const result = await prisma.user.findMany();
  // Set headers
  res.set("x-total-count", result.length.toString());
  // Return result
  res.json(result);
});

app.get(`/posts`, async (_, res) => {
  // Get data
  const result = await prisma.post.findMany();
  // Set headers
  res.set("x-total-count", result.length.toString());
  // Return result
  res.json(result);
});

// app.post(`/post`, async (req, res) => {
//   const { title, content, authorEmail } = req.body;
//   const result = await prisma.post.create({
//     data: {
//       title,
//       content,
//       published: false,
//       author: { connect: { email: authorEmail } },
//     },
//   });
//   res.json(result);
// });

// app.put("/publish/:id", async (req, res) => {
//   const { id } = req.params;
//   const post = await prisma.post.update({
//     where: { id: Number(id) },
//     data: { published: true },
//   });
//   res.json(post);
// });

// app.delete(`/post/:id`, async (req, res) => {
//   const { id } = req.params;
//   const post = await prisma.post.delete({
//     where: {
//       id: Number(id),
//     },
//   });
//   res.json(post);
// });

// app.get(`/post/:id`, async (req, res) => {
//   const { id } = req.params;
//   const post = await prisma.post.findOne({
//     where: {
//       id: Number(id),
//     },
//   });
//   res.json(post);
// });

// app.get("/feed", async (req, res) => {
//   const posts = await prisma.post.findMany({
//     where: { published: true },
//     include: { author: true },
//   });
//   res.json(posts);
// });

// app.get("/filterPosts", async (req, res) => {
//   const { searchString }: { searchString?: string } = req.query;
//   const draftPosts = await prisma.post.findMany({
//     where: {
//       OR: [
//         {
//           title: {
//             contains: searchString,
//           },
//         },
//         {
//           content: {
//             contains: searchString,
//           },
//         },
//       ],
//     },
//   });
//   res.json(draftPosts);
// });

const server = app.listen(3001, () =>
  console.log("🚀 Server ready at: http://localhost:3001")
);
