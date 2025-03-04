# Demo Book List
A simple React application built to manage a list of books using CRUD operations with a fake REST API. 
The app includes two main pages:

Dashboard: Displays a table of books with functionalities to filter by status (Active, Deactivated, or All), edit, delete,
or deactivate/reactivate records.
Add/Edit a Book: Allows users to add new books or edit existing ones.
The application supports form validation, time zone-aware date formatting, 
and responsive design for a smooth user experience across devices. 
The backend is powered by [json-server](https://github.com/typicode/json-server), providing a fake REST API for CRUD operations.

## Instructions for Running the App

### 1. Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/DmytroBoiarchuk/book-manager-test.git
```

### 2. Navigate to Fake Backend and Install Dependencies
```bash
cd fake-backend
npm install
```

### 3. Run Backend
Pass it to JSON Server CLI
```bash
npx json-server db.json
```

### 4. Navigate to the Fronted and Install Dependencies
```bash
cd ..
cd frontend
```

### 5. Install Dependencies
Navigate into the project directory and install the required dependencies:
```bash
npm install
```
### 6. Run in Development Mode
To run the application in development mode (with hot reloading and an easy debugging environment), use:
```bash
npm run dev
```
This will start the app on http://localhost:5173 and automatically reload the page when you make changes to the files.

## Build for Production
To create a production-ready version of the app (for deployment), run the following command:
in 'frontend' folder run: 
```bash
npm run build
```
This will generate an optimized build in the build/ folder, ready for deployment on any server.

### Preview the Production Build Locally
To preview the production build locally, use:
```bash
npm run preview
```
This will start a local server to serve the files from the dist/ folder on http://localhost:4173/

## Technologies Used:
- React v.19
- TypeScript
- Vite
- json-server (for fake backend)
- CSS Modules
- SCSS
- Functional Components & Hooks
