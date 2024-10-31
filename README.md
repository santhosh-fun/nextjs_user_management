# User Management System

A complete user management application with a **React.js** frontend and **NestJS** backend, containerized with **Docker** for easy deployment. This application provides a functional admin panel for managing user accounts.

## Project Structure

- **Frontend**: Developed with React.js, handling the user interface and client-side functionality.
- **Backend**: Built using NestJS, managing APIs and business logic.

---

## Getting Started

### Prerequisites

To run this project, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) - to containerize and run the application.
- [Git](https://git-scm.com/) - to clone the repository.

### Installation and Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/santhosh-fun/user_management.git

   Navigate into the Project Directory
   ```

````bash
cd user_management
Build and Run the Docker Containers

Inside the project directory, run the following command:

```bash
docker-compose up --build
This will build the Docker images and start the containers for both frontend and backend applications.


2. **Application Access**
Backend API: Accessible at http://localhost:3303/
Frontend Application: Accessible at http://localhost:8808/

**Login Credentials**
To access the application, use the following credentials:

Username: admin
Password: password123

**Troubleshooting**

Port Conflicts
If you encounter issues with ports already in use (default: 3303 for backend, 8808 for frontend), follow these steps:

Open the docker-compose.yml file in the root directory and change the port mappings to available ports.
Update the backend configuration in user-management-backend/src/main.ts:

await app.listen(process.env.PORT ?? 3303); // Change to the updated port
origin: // add the host
````
