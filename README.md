# Task Manager

This is a simple task manager that allows you to add, delete, and mark tasks as complete.

It is built using NestJS and TypeORM, and it uses RabbitMQ for event-driven communication between microservices.

![Architecture](/Architecture.png)

- Nashville (Backend Facing Frontend) Microservice: Handles incoming requests from the client and forwards them to the Gallatin microservice.

- Gallatin (Task Manager) Microservice: Handles task-related operations (CRUD) and emits events to the Ashland microservice.

- Ashland (Logger) Microservice: Listens for events from the Gallatin microservice and logs them to the console.

## Features

- Add new tasks
- Delete existing tasks
- Event-driven architecture using RabbitMQ

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (>= 20.16.0)
- Yarn (>= 1.22.19)
- Docker (for RabbitMQ)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/faizahmedfarooqui/nestjs-rabbitmq-task-manager.git
    cd nestjs-rabbitmq-task-manager
    ```

2. **Install dependencies:**

    ```bash
    yarn install
    ```

3. **Set up RabbitMQ:**

    You can run RabbitMQ using Docker:

    ```bash
    docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
    # Access the RabbitMQ management console at http://localhost:15672
    # Username: guest
    # Password: guest
    ```

4. **Configure Variables:**

    1. Goto "services/gallatin-task-manager/src/app.module.ts" and update the RabbitMQ & PostgreSQL configs
    2. Goto "services/ashland-logger/src/main.ts" and update the RabbitMQ configs

5. **Run the Nashville (Backend Facing Frontend) Microservice:**

    ```bash
    yarn start:nashville
    ```

6. **Run the Gallatin (Task Manager) Microservice:**

    ```bash
    yarn start:gallatin
    ```

7. **Run the Ashland (Logger) Microservice:**

    ```bash
    yarn start:ashland
    ```

## Usage

Once the application is running, you can access the API at `http://localhost:3000`. Use a tool like Postman or cURL to interact with the API endpoints.

### API Endpoints

You can refer "[TaskManager.postman_collection.json](/TaskManager.v2.postman_collection.json)" file for the Postman collection.

- **GET /tasks**: Retrieve all tasks (with Pagination)
- **GET /tasks/{id}**: Retrieve a task
- **POST /tasks**: Create a new task
- **DELETE /tasks/:id**: Delete a task by ID
- **PUT /tasks/:id**: Update a Task by ID

## Contributing

Contributions are always welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out to raise an issue.

---

Happy coding!
