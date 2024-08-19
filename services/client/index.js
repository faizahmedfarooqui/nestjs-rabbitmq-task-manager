const { io } = require('socket.io-client');

// WebSocket Server URL
const socket = io('http://localhost:3000');

// Handle connection event
socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

// Handle disconnection event
socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

// Handle custom events
socket.on('createTask', (data) => {
  console.log('Task Created:', data);

  // capture the task id
  const taskId = data.id;

  // use the captured ID in further operations
  listTask(taskId);
  updateTask(taskId, 'Updated Title', 'Updated Description', null);
  deleteTask(taskId);
});

socket.on('listAllTasks', (data) => {
  console.log('All Tasks:', data);
});

socket.on('listTask', (data) => {
  console.log('Task Details:', data);
});

socket.on('updateTask', (data) => {
  console.log('Task Updated:', data);
});

socket.on('deleteTask', (data) => {
  console.log('Task Deleted:', data);
});

// Emit events to the server
function createTask(title, description, parentId) {
  socket.emit('createTask', { title, description, parentId });
}

function listAllTasks(page, pageSize) {
  socket.emit('listAllTasks', { page, pageSize });
}

function listTask(id) {
  socket.emit('listTask', { id });
}

function updateTask(id, title, description, parentId) {
  socket.emit('updateTask', { id, title, description, parentId });
}

function deleteTask(id) {
  socket.emit('deleteTask', { id });
}

// Example usage
listAllTasks(1, 10);
createTask('New Task', 'Task Description', null);
