## Open-notebook
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
