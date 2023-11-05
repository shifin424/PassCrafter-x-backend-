
# PassCrafter-X - Secure Password Generator

PassCrafter-X is a powerful password generator project developed using the MERN stack. This project focuses on creating highly secure passwords that prioritize user safety and the protection of sensitive data. It achieves this by combining numbers, letters, patterns, and symbols to craft robust and reliable passwords.

## Key Features:
- Utilizes Formik and Yup for efficient form handling.
- Implements JWT for user authentication.
- Manages data storage through MongoDB Atlas, ensuring robust and scalable database management.
- Enhances type safety and maintainability with TypeScript in both the frontend and backend.
- Optimizes code reusability and streamlines MongoDB queries in the backend using the Repository pattern and MVC architecture.
## API Reference

#### Sign Up

```http
 POST /api/v1/sign-up
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userName` | `string` | User's username.|
| `email` | `string` |User's email address. |
| `password` | `string` | User's password. |

#### Login

```http
  POST /api/v1/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | User's email address.|
| `password`      | `string` | User's password. |


#### Save Password

```http
POST /api/v1/saved-password
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `appName`      | `string` | Name of the application/site|
| `userName`      | `string` | User's username. |
| `password`      | `string` | The generated password. |

#### Fetch Saved Passwords

```http
GET /api/v1/fetchSavedData
```

| Headers	 | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `headers`      | `object` |Authorization headers.|




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`  The port number that the server will listen on

`SECRET_KEY`  Application's security secret.

`MONGO_URI`  The MongoDB connection string or URI that your application will use to connect to the database.


## Conclusion

With PassCrafter-X, you can generate strong passwords that meet the highest security standards. This project showcases your expertise in the MERN stack, demonstrating your commitment to code quality, security, and efficient development practices.

For more details and to experience the power of PassCrafter-X, visit __passcrafter-x.netlify.app__



