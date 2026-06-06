# React-GraphQL-Project
This repository contains a full-stack application consisting of a React client and a GraphQL API server backed by MongoDB.

📁 Project Structure

Client:

Front-end application built with React and TypeScript.

GraphQL Server:

Back-end API built with GraphQL, connected to a MongoDB database.

🛠️ Tech Stack

Frontend: React, TypeScript
Backend: GraphQL, Node.js
Database: MongoDB (managed via MongoDB Compass)

⚙️ Setup & Configuration

You will need to create a MongoDB database named AVGO in MongoDB Compass.
Alternatively, you can update the connection string in the server configuration:
const MONGO_DB = "mongodb://127.0.0.1:27017/AVGO";
This is located in graphql-server/index.ts (line 7).
You may replace AVGO with the name of your own database if preferred.

Avgoustinos Zigos.
