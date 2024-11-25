URL Shortener Project

This project is a dynamic URL shortener built with Nest.js for the backend and Redis for caching. It provides a scalable architecture using Docker to streamline setup and development.
Getting Started

Follow these steps to set up the project on your local machine.
Prerequisites

    Docker and Docker Compose installed on your system.

Installation

    Clone the repository:

git clone <repository-url>
cd <repository-folder>

Build and start the Docker containers:

    docker-compose up --build

    This will:
        Build the Nest.js backend from the Dockerfile in ./backend/shortener.
        Pull the redis/redis-stack image for Redis and expose ports 6379 (Redis) and 8001 (Redis Insight).

    Verify the services:
        Backend: Available at http://localhost:3000
        Redis Insight (Optional): Available at http://localhost:8001 for managing and visualizing Redis data.

Project Structure
Backend

    The Nest.js application resides in ./backend/shortener.
    The backend service communicates with Redis using environment variables defined in the docker-compose.yml.

Redis

    Redis Host: redis (network alias in Docker Compose)
    Redis Port: 6379

Redis is used for:

    Caching: Temporary storage of frequently accessed data.
    Future enhancements: Features like rate limiting, session management, or analytics can be implemented.

Environment Variables

The docker-compose.yml defines the following environment variables for the backend service:

    REDIS_HOST: Hostname for the Redis container (set to redis).
    REDIS_PORT: Port for Redis (default: 6379).

You can add more environment variables by editing the docker-compose.yml file.
Running the Project

    Start the application:

    docker-compose up

    Access the following services:
        Backend: http://localhost:3000
        Redis Insight (for Redis monitoring): http://localhost:8001

Redis Insight (Optional)

The redis/redis-stack image includes Redis Insight, a GUI for managing and visualizing Redis. You can use it to:

    Monitor data in Redis.
    Debug cache entries or keys.

To access Redis Insight:

    Open your browser and go to http://localhost:8001.
    Connect to the Redis instance at localhost:6379.

Development Workflow

    The backend code in ./backend/shortener is mounted as a volume in the Docker container. Any changes to the code are reflected immediately when the containers are running.

    To rebuild the backend after making changes:

    docker-compose up --build

Useful Commands

    Stop the services:

docker-compose down

Remove containers and networks:

docker-compose down --volumes

Rebuild the backend:

docker-compose up --build
