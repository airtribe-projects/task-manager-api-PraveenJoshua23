/* Implement GET /tasks: Retrieve all tasks.

Implement GET /tasks/:id: Retrieve a specific task by its ID.

Implement POST /tasks: Create a new task with the required fields (title, description, completed).

Implement PUT /tasks/:id: Update an existing task by its ID.

Implement DELETE /tasks/:id: Delete a task by its ID.

Test all endpoints using Postman or curl to ensure proper functionality.*/

const express = require('express')
const router = express.Router();

  const tasks= [
        {
            "id": 1,
            "title": "Set up environment",
            "description": "Install Node.js, npm, and git",
            "completed": true
        },
        {
            "id": 2,
            "title": "Create a new project",
            "description": "Create a new project using the Express application generator",
            "completed": true
        },
        {
            "id": 3,
            "title": "Install nodemon",
            "description": "Install nodemon as a development dependency",
            "completed": true
        },
        {
            "id": 4,
            "title": "Install Express",
            "description": "Install Express",
            "completed": false
        },
        {
            "id": 5,
            "title": "Install Mongoose",
            "description": "Install Mongoose",
            "completed": false
        },
        {
            "id": 6,
            "title": "Install Morgan",
            "description": "Install Morgan",
            "completed": false
        },
        {
            "id": 7,
            "title": "Install body-parser",
            "description": "Install body-parser",
            "completed": false
        },
        {
            "id": 8,
            "title": "Install cors",
            "description": "Install cors",
            "completed": false
        },
        {
            "id": 9,
            "title": "Install passport",
            "description": "Install passport",
            "completed": false
        },
        {
            "id": 10,
            "title": "Install passport-local",
            "description": "Install passport-local",
            "completed": false
        },
        {
            "id": 11,
            "title": "Install passport-local-mongoose",
            "description": "Install passport-local-mongoose",
            "completed": false
        },
        {
            "id": 12,
            "title": "Install express-session",
            "description": "Install express-session",
            "completed": false
        },
        {
            "id": 13,
            "title": "Install connect-mongo",
            "description": "Install connect-mongo",
            "completed": false
        },
        {
            "id": 14,
            "title": "Install dotenv",
            "description": "Install dotenv",
            "completed": false
        },
        {
            "id": 15,
            "title": "Install jsonwebtoken",
            "description": "Install jsonwebtoken",
            "completed": false
        }
    ]


const validateTask = (req, res, next) => {
    const { title, description, completed } = req.body;

    if (typeof title !== 'string') {
        return res.status(400).json({ message: 'Title must be a string' });
    }

    if (typeof description !== 'string') {
        return res.status(400).json({ message: 'Description must be a string' });
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'Completed must be a boolean' });
    }

    // Validate priority
    const validPriorities = ['low', 'medium', 'high'];
    if (priority !== undefined && !validPriorities.includes(priority)) {
        return res.status(400).json({ message: 'Priority must be one of: low, medium, high' });
    }

    next(); 
}

// Get All Tasks
router.get('/', (req,res)=>{
    const { completed, sortBy } = req.query; 

    let filteredTasks = tasks;

    // Filtering
    if (completed !== undefined) {
        // const isCompleted = completed.toLowerCase() === 'true';
        filteredTasks = tasks.filter(task => task.completed === completed);   

    }

    // Sorting (add createdAt property to tasks if it doesn't exist)
    if (sortBy === 'createdAt') {
        filteredTasks.forEach(task => {
            if (!task.createdAt) {
                task.createdAt = new Date(); 
            }
        });
        filteredTasks.sort((a, b) => a.createdAt - b.createdAt); 
    }

    res.json(filteredTasks);
});

// GET a single task by ID
router.get('/:id', (req, res) => {
    
    const task = tasks.filter(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task[0]);
});

// CREATE a new task   

router.post('/', validateTask, (req, res) => {
    const { title, description, completed, priority } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    const newTask = {
        id: tasks.length+1,
        title,
        description,
        completed: completed || false,
        priority: priority || 'medium', // Default to medium if not provided
        createdAt: new Date()  
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// UPDATE an existing task
router.put('/:id', validateTask, (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = { ...tasks[taskIndex], ...req.body };
    tasks[taskIndex] = updatedTask;
    res.status(200).json(updatedTask);
});

// DELETE a task
router.delete('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Task deleted' });
});

// GET tasks by priority level
router.get('/priority/:level', (req, res) => {
    const priorityLevel = req.params.level.toLowerCase();
    const filteredTasks = tasks.filter(task => task.priority === priorityLevel);
    res.json(filteredTasks);
});

module.exports = router;



