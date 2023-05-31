<h1>Open-notebook</h1>
![Screenshot from 2023-05-10 19-08-08](https://github.com/gravityNotWorking/open-notebook/assets/77449139/8a3cf2b9-a5b2-4836-841b-1898c340f609)
_Open-notebook_ is a MERN stack application that offers a unique approach to collaborative storytelling. Users can create and share stories, but each user is limited to contributing only one part of the story, such as the beginning. They are unable to add the development or conclusion to the story. This creates an interesting collaborative storytelling experience.


During the development of this app, I utilized the following packages:
You can find frontend files in this [repo](https://github.com/gravityNotWorking/on-frontend)
> Frontend: 

-   I used React as the main frontend library along with ReactDOM for rendering components.
-   For UI components, I utilized the "@chakra-ui/react" library, which offers a set of customizable UI components.
-   I implemented HTTP requests to the backend using the "axios" library.
-   To handle authentication, I utilized "jwt-decode" for decoding JSON Web Tokens.
-   For handling dates and times, I employed the "react-moment" library, which provides various utilities for manipulating and formatting dates.
-   Routing and navigation within the app were facilitated by the "react-router-dom" library.
        
> Backend:

-   The backend was built using Node.js and Express.js, a minimalist web application framework.
-   User passwords were securely hashed using the "bcrypt" library.
-   Cookie parsing was handled by the "cookie-parser" middleware in Express.js.
-   Cross-Origin Resource Sharing (CORS) was enabled using the "cors" middleware.
-   User authentication was implemented using JSON Web Tokens (JWT) with the help of the "jsonwebtoken" library.
-   MongoDB was used as the database, and interaction with the database was facilitated by the "mongoose" library.
  
Throughout the development process, custom components were created for inputs, and various packages were employed to fulfill specific functionality requirements. Additionally, design tools like Figma were utilized to create UI mockups and plan the app's visual structure.


## Story Controllers

    createStory

Description: This controller function creates a new story.


*Example Request:*


Method: **POST**


Route: `/create`


Body: `{ "title": "My Story", "category": "Adventure", intro:{"body": "Once upon a time...","author":"gnw" }}`

Example Response:


Status: 201 Created


Body: `{ "success": true, "message": "Story created successfully" }`


<br>





    addDevelopment

Description: This controller function adds a development section to an existing story.


*Example Request:*


Method: **PATCH**


Route: `/dev/:id (e.g., /dev/1234567890)`


Body: `{ "body": "The plot thickens...", "author":"gnw2" }`


Example Response:


Status: 201 Created

Body:` { "success": true, "message": "Development added to story" }`


<br>


    addConclusion

Description: This controller function adds a conclusion section to an existing story.


*Example Request:*


Method: **PATCH**


Route: `/conc/:id (e.g., /conc/1234567890)`


Body: `{ "body": "And they lived happily ever after." ,"author":"gnw3"}`


Example Response:


Status: 201 Created


Body: `{ "success": true, "message": "Conclusion added to story" }`


<br>


    getFinishedStories

Description: This controller function retrieves all finished stories.


*Example Request:*


Method: **GET**


Route: `/finished`


Example Response:


Status: 200 OK

Body: `{ "success": true, "stories": [ { "title": "Finished Story 1", "category": "Mystery", "_id": "1234567890", "intro": { "author": "gnw", "body": "Once upon a time..." }, "development": { "author": "gnw2", "body": "The plot thickens..." }, "conclusion": { "author": "gnw3", "body": "And they lived happily ever after." } } ] }`

<br>


    getUnfinishedStories

Description: This controller function retrieves all unfinished stories.


*Example Request:*


Method: **GET**


Route: `/unfinished`


Example Response:


Status: 200 OK


Body: `{ "success": true, "unfinishedStories": [ { "title": "Unfinished Story 1", "category": "Adventure",  "_id": "1234567890", "intro": { "author": "gnw", "body": "Once upon a time..." }, "development": { "author": "gnw2", "body": "The plot thickens..." } } ] }`

<br>


    getSingleStory

Description: This controller function retrieves a single story by its ID.


*Example Request:*


Method: **GET**


Route: `/:id (e.g., /1234567890)`


Example Response:


Status: 200 OK


Body: `{ "success": true, "story": { "title": "My Story", "category": "Adventure", "_id": "1234567890", "intro": { "author": "gnw", "body": "Once upon a time..." }, "development": { "author": "gnw2", "body": "The plot thickens..." }`

<br><br>



## User Controllers

    registerUser

Description: This controller function registers a new user.


*Example Request:*


Method: **POST**


Route: /register


Body: { "username": "gnw", "email": "gnw@example.com", "password": "passW0rd1?2" }


Example Response:


Status: 201 Created


Body: { "success": true, "message": "User created successfully!" }

<br>

    loginUser

Description: This controller function authenticates a user and generates a JWT token.


Example Request:


Method: **POST**


Route: /login


Body: { "username": "gnw", "password": "passW0rd1?2" }


*Example Response:*


Status: 200 OK


Body: { "success": true, "user": "gnw" }

<br>

    authenticateUser

Description: This controller function verifies the authenticity of a JWT token.


*Example Request:*


Method: **GET**


Route: /authenticate


Example Response:


Status: 200 OK


Body: { "success": true, "user": "gnw" }




