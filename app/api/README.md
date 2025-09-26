# API Folder Documentation

This folder contains the API route handlers for the project, following the Next.js App Router convention. Each subfolder represents an endpoint that handles HTTP requests for a specific feature or resource.

## Structure

- Each subfolder (e.g., `contact`, `newsletter`, `analytics`, `subscribe`) contains a `route.ts` file that defines the logic for handling API requests (POST, GET, etc.).
- These routes are accessible via `/api/[route-name]` in your deployed application.

## Endpoints

### /api/contact
- **Description:** Handles contact form submissions and sends an email notification.
- **Method:** POST
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello!"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "string.",
  }
  ```

### /api/newsletter
- **Description:** Handles newsletter signups and sends a confirmation email.
- **Method:** POST
- **Request Body:**
  ```json
  {
    "email": "john@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "You have been subscribed to the newsletter."
  }
  ```

### /api/analytics
- **Description:** Handles analytics-related requests.
- **Method:** POST/GET

### /api/subscribe
- **Description:** Handles subscription requests.
- **Method:** POST

## Important Note

> All email sending is handled server-side by these API endpoints. The frontend should NOT send emails directly; it should only make requests to these endpoints.

## Usage

- Send HTTP requests (POST, GET, etc.) to the respective endpoints.
- Each route validates and processes the request data, then returns a JSON response.

## Notes

- All API logic is implemented in TypeScript for type safety.
- Input validation and sanitization are performed for security.
- Update or add new route folders/files as your API grows.
