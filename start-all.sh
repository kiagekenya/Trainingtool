#!/bin/bash

# Start the frontend
cd frontend
npm start &
cd ..

# Start the backend
cd backend
npm start &
cd ..

# Wait for both processes to finish
wait
