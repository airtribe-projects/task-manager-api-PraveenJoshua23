
# Task Management API

This is a simple REST API for managing tasks. It allows you to create, read, update, and delete tasks with various attributes like title, description, completed status, priority, and creation date.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone 
   ```

2. **Install dependencies:**
   ```bash
   cd task-manager-api-PraveenJoshua23
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start 
   ```
   This will start the server on `http://localhost:3000` (or the port you have configured).

## API Endpoints

**Base URL:** `http://localhost:3000/api/v1/tasks`

### GET /tasks

Retrieve all tasks.

**Query parameters:**

- `completed`: Filter tasks by completion status (`true` or `false`).
- `sortBy`: Sort tasks by creation date (`createdAt`).

**Example:**

- Get all tasks: `/tasks`
- Get completed tasks: `/tasks?completed=true`
- Get tasks sorted by creation date: `/tasks?sortBy=createdAt`

### GET /tasks/:id

Retrieve a specific task by its ID.

**Example:**

- Get task with ID 1: `/tasks/1`

### GET /tasks/priority/:level

Retrieve tasks by priority level (`low`, `medium`, or `high`).

**Example:**

- Get tasks with high priority: `/tasks/priority/high`

### POST /tasks

Create a new task.

**Request body:**

```json
{
  "title": "New Task",
  "description": "This is a new task",
  "completed": false, 
  "priority": "high" 
}
```

**Example:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{ "title": "New Task", "description": "This is a new task", "priority": "high" }' http://localhost:3000/tasks
```

### PUT /tasks/:id

Update an existing task by its ID.

**Request body:**

```json
{
  "title": "Updated Task",
  "completed": true,
  "priority": "medium"
}
```

**Example:**

```bash
curl -X PUT -H "Content-Type: application/json" -d '{ "title": "Updated Task", "completed": true, "priority": "medium" }' http://localhost:3000/tasks/1
```

### DELETE /tasks/:id

Delete a task by its ID.

**Example:**

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## Testing the API

You can test the API using tools like:

- **curl:**  Use curl commands in your terminal to send requests to the API endpoints.
- **Postman:** A graphical API testing tool that allows you to send requests and view responses.
- **REST Client:**  A browser extension (like REST Client for Firefox or Chrome) that provides a user interface for sending API requests.

**Example using curl to create a new task:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{ "title": "Test Task", "description": "This is a test task" }' http://localhost:3000/tasks
```
This will send a POST request to the `/tasks` endpoint with the task data in the request body.



