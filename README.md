### Starting Express Server with Environment Variables

1. **Install Dependencies:**
   Run `npm install` to install dependencies.

2. **Environment Variables:**
   Create a `.env` file in the project root and add: 
   `PORT=8000` & `MONGO=Your_Mongo_URI`

3. **Start the Server:**
Run `npm start` to start the server.

4. **Accessing the Server:**
Access the server at `http://localhost:8000`.

5. **Stopping the Server:**
Stop the server with `Ctrl + C`.

6. **Using Environment Variables:**
Access environment variables like `process.env.PORT` & `process.env.MONGO`in your code.

7. **Troubleshooting:**
Check terminal for errors and ensure environment variables are correctly defined.

## API End Points

### Get All Users

- **Description:** Retrieves a paginated list of all users.
- **URL:** `/api/users`
- **Method:** `GET`
- **Parameters:**
  - `page` (optional): Specifies the page number for pagination. Default is `1`.
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** 
    ```json
    [
      {
        "_id": "user_id",
        "name": "user_name",
        "parent_id": "parent_user_id",
        "earning":"earning_of_user"
      },
      {
        "_id": "user_id",
        "name": "user_name",
        "parent_id": "parent_user_id",
        "earning":"earning_of_user"
      },
      ...
    ]
    ```
- **Error Response:**
  - **Code:** `500 Internal Server Error`
  - **Content:** 
    ```json
    { "error": "Internal server error" }
    ```


### Get User By ID

- **Description:** Retrieves a user by their ID.
- **URL:** `/api/users/:userId`
- **Method:** `GET`
- **Parameters:**
  - `userId`: ID of the user to retrieve.
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** 
    ```json
    {
      "_id": "user_id",
      "name": "user_name",
      "parent_id": "parent_user_id",
      "earning":"earning_of_user"
    }
    ```
- **Error Response:**
  - **Code:** `404 Not Found`
  - **Content:** 
    ```json
    { "error": "User not found" }
    ```
  - **Code:** `500 Internal Server Error`
  - **Content:** 
    ```json
    { "error": "Internal server error" }
    ```

### Add User

- **Description:** Adds a new user to the database.
- **URL:** `/api/users`
- **Method:** `POST`
- **Data Params:**
  - `name`: Name of the user.
  - `parent_id` (optional): ID of the parent user.
- **Success Response:**
  - **Code:** `201 Created`
  - **Content:** 
    ```json
    {
      "_id": "user_id",
      "name": "user_name",
      "parent_id": "parent_user_id",
      "earning":0
    }
    ```
- **Error Response:**
  - **Code:** `500 Internal Server Error`
  - **Content:** 
    ```json
    { "error": "Internal server error" }
    ```

### Distribute Earning

- **Description:** Distributes earnings to users based on a predefined percentage structure.
- **URL:** `/api/distribute/:userId`
- **Method:** `POST`
- **URL Params:**
  - `userId`: ID of the user to distribute earnings.
- **Data Params:**
  - `toBeDistribute`: Amount of earning to distribute.
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** 
    ```json
    { "message": "Earning Distributed" }
    ```
- **Error Response:**
  - **Code:** `400 Bad Request`
  - **Content:** 
    ```json
    { "error": "Distribution amount could not be less than 0 or undefined" }
    ```
  - **Code:** `404 Not Found`
  - **Content:** 
    ```json
    { "error": "User not found" }
    ```
  - **Code:** `500 Internal Server Error`
  - **Content:** 
    ```json
    { "error": "Internal server error" }
    ```
## Explanation of `distributeEarning` Controller

The `distributeEarning` function is an asynchronous function that handles the distribution of earnings to users based on a predefined percentage structure. Below is a breakdown of its functionality:

1. **Request Parameters:**
   - The function accepts `req` (request) and `res` (response) parameters, typical in Express.js route handlers.
   - It extracts `userId` from the request parameters and `toBeDistribute` from the request query.

2. **Input Validation:**
   - It checks if `toBeDistribute` is undefined or less than 0. If so, it returns a 400 Bad Request status with an error message indicating that the distribution amount cannot be less than 0 or undefined.

3. **Retrieving User Information:**
   - It attempts to find the user with the provided `userId` using the `UserModel.findById()` method.
   - If the user is not found, it returns a 404 Not Found status with an error message indicating that the user was not found.

4. **Distribution Calculation:**
   - It defines a percentage array `percent` representing the distribution percentages for different levels.
   - It initializes `level` to 1 and `parent` to the current user.
   - It iterates over the parent hierarchy, updating earnings for each level based on the distribution percentage.
   - It calculates the remaining percentage for the user's own earning after distributing to the parent hierarchy.

5. **Updating User Earnings:**
   - It updates the user's earning with the remaining percentage calculated above.

6. **Response:**
   - If the distribution is successful, it returns a 200 OK status with a success message indicating that the earning has been distributed.

7. **Error Handling:**
   - If an error occurs during the execution, it logs the error to the console and returns a 500 Internal Server Error status with an error message indicating an internal server error.

This function efficiently distributes earnings to users based on a hierarchical structure and predefined percentage distribution. It handles input validation, retrieves user information, performs the distribution calculation, updates user earnings, and provides appropriate responses and error handling.
