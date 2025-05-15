# TaskDashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12 and designed to help users manage tasks using a drag-and-drop Kanban-style interface.

## GitHub Repository

`https://github.com/Ashik-ch/task-dashboard`

Getting Started
Follow the steps below to run the project locally.

## Prerequisites

Make sure you have the following tools installed on your machine:
 Node.js (version 17 or above)
 Angular CLI
 Git

## Installation

Clone the repository:
 git clone `https://github.com/Ashik-ch/task-dashboard.git`
 cd task-dashboard

## Install dependencies

 npm install

## Run the project locally

 ng serve

## Open your browser and navigate to

 `http://localhost:4200`

The application should now be up and running.

## Architecture and Approach

Overview
The project follows a modular approach with a component-driven architecture, using Angular's built-in tools and services to manage data, UI, and logic.

## Key Features

Drag-and-Drop Kanban: Tasks can be moved between columns (To Do, In Progress, Done) using Angular CDK drag-and-drop.

Task Management: Users can add, update, and manage tasks.

API Integration: The backend (a REST API) is used to fetch and store tasks.

Folder Structure:
src/app: Contains all the core application logic.

components: Includes individual components like TaskManagerComponent, TaskComponent, etc.

services: Manages communication with the api (e.g., TaskService).

models: Contains data models like Task.

pipes: Custom pipes, such as filtering tasks.

## Technologies Used

Angular: Front-end framework used to build the project.

Angular CDK: Provides drag-and-drop functionality for tasks.

Tailwind CSS: A utility-first CSS framework used for styling.

RxJS: Used for handling asynchronous operations and state management.

## Approach

The task dashboard was developed with the goal of creating an intuitive and interactive task management system. The application allows users to view tasks in a Kanban-style board with a clean, responsive UI. Tasks are dynamically updated as users drag them between columns or update their status.
