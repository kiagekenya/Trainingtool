# Onboarding App for the Oil and Gas Industry

This is a MERN (MongoDB, Express, React, Node.js) stack application designed to streamline the onboarding process for new hires in the oil and gas industry. The app ensures employees are up to task, informed about industry practices, and can track their progress during their onboarding journey.

## Features

### Core Functionalities
- **Dynamic Profile Management**: New hires can view and manage their profile, including personal details, roles, and achievements.
- **Task Tracking**: Assigned tasks and deadlines are clearly displayed to keep employees organized.
- **Learning Resources**: Access to industry-specific resources, videos, and quizzes.
- **Progress Monitoring**: Visualize onboarding progress through dynamic charts and statistics.
- **Manager Dashboard**: Enables managers to assign tasks, review progress, and provide feedback.

## Technology Stack

### Frontend
- **React**: For building the user interface.
- **Redux**: For state management.
- **Axios**: For handling HTTP requests.
- **React Router**: For navigation and routing.

### Backend
- **Node.js**: As the runtime environment.
- **Express**: For handling API endpoints and server logic.
- **MongoDB**: For storing user data, tasks, and resources.
- **Mongoose**: For schema modeling and database interaction.

### Hosting
- Hosted on **DigitalOcean** for reliable and scalable deployment.

## Directory Structure

```
project-root
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   └── styles
│   ├── public
│   └── package.json
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   ├── utils
│   ├── server.js
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js installed
- MongoDB instance (local or cloud-based)
- DigitalOcean account for hosting

## Getting Started

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure the following:
   ```
   MONGO_URI=<Your MongoDB Connection String>
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Deployment
1. Use **DigitalOcean App Platform** to host both frontend and backend.
2. Configure environment variables on DigitalOcean for the backend.
3. Ensure the backend API URL is correctly set in the frontend `.env` file.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add a new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

Feel free to reach out for any queries or suggestions:
- **LinkedIn**: [Your LinkedIn Profile](https://www.linkedin.com/in/jacobkiage/)



