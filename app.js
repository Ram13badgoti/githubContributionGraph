// Importing required packages and modules
import express from "express";
import axios from "axios";
import path, { dirname } from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import ejs from "ejs";

// Setting up Express application
const app = express();

// Configuring environment variables
dotenv.config();

// Middleware setup
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Retrieving current file path
const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl);
const currentDir = dirname(currentFilePath);

// Configuring EJS template engine
app.set("view engine", "ejs");
app.set("views", path.join(currentDir, "views"));


// Defining port and GitHub GraphQL API endpoint
const PORT = process.env.port;
const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";
const GITHUB_TOKEN = process.env.github_token;


// Setting up routes

// Home route
app.get("/", (req, res) => {
  res.render("home");
});

// Fetch route
app.post("/fetch", async (req, res) => {
  const { username } = req.body;

  try {
    // GraphQL query to fetch user details and contributions
    const query = `
      query($userName: String!) {
        user(login: $userName) {
          name
          avatarUrl
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
          followers {
            totalCount
          }
          following {
            totalCount
          }
          repositories(first: 6) {
            nodes {
              name
              description
              url
              primaryLanguage {
                name
              }
            }
          }
        }
      }
    `;

    const variables = { userName: username };

    // Making a POST request to GitHub GraphQL API
    const response = await axios.post(
      GITHUB_GRAPHQL_API,
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      }
    );

    const data = response.data;

    // Rendering the profile or displaying an error message
    if (data.errors || !data.data || !data.data.user) {
      res.render("profile", { username });
    } else {
      const profileDetails = data.data.user;
      res.render("profile", {
        profileDetails,
        contributions:
          profileDetails.contributionsCollection.contributionCalendar,
        username,
        repositories: profileDetails.repositories.nodes,
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});


// Starting the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
