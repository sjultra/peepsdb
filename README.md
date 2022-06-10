# PeepsDB

The people database (PeepsDB) integrates data from multple sources to help remotely distributed freelancer teams collaborate on software projects using cloud based technology.

- This project is being tracked with Work Items in the Azure DevOps Project - https://dev.azure.com/sjultra/VzxyTools/_git/PeepsDB

| Backend | Framework | Database |
| ------- | --------- | -------- |
| NodeJS  | Express   | MongoDB  |

# Requirements

1.  NodeJS >= 10.0
1.  Express
1.  MongoDB (we are using an online instance)

# Getting Started

In the project directory, run:

`npm install`

Create a file called .env in PeepsDB folder and add the following variables in order to test it locally:

1. GOOGLE_CLIENT_ID
2. GOOGLE_CLIENT_SECRET
3. GITHUB_CLIENT_ID
4. GITHUB_CLIENT_SECRET
5. MICROSOFT_CLIENT_ID
6. MICROSOFT_CLIENT_SECRET
7. FRONTEND_URL
8. BACKEND_URL
9. MONGO_URI
10. JWT_SECRET
11. AZURE_TENANT_ID
12. AZURE_CLIENT_ID
13. AZURE_CLIENT_SECRET
14. ENVIRONMENT (DEV or PROD)

## Start Application

In the project directory, run:

`npm run server`

Backend runs on [http://localhost:5000](http://localhost:5000)
