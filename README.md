
---

# Stream SpOTT

Stream SpOTT is a web application that allows users to stream videos stored on Firebase Storage. Users can search for videos, toggle between light and dark modes, and log in with their credentials.

## Features

- **User Authentication**: Users can log in with their credentials to access the streaming content. Authentication is handled securely using Firebase Authentication.

- **Dark Mode**: The application supports a dark mode theme, providing users with a visually comfortable experience in low-light environments.

- **Search Functionality**: Users can search for specific videos using the search bar. The search function filters the content based on the entered query.

- **Responsive Design**: The application is responsive and can adapt to various screen sizes, providing a seamless experience across devices.

## Getting Started

To get started with Stream SpOTT, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/stream-spott.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firebase Authentication and Firebase Storage in your project.
   - Add your Firebase configuration to `firebase.js` in the project.

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your web browser and navigate to `http://localhost:3000` to view the application.

## Usage

- **Authentication**: If you have an account, log in with your credentials. Otherwise, sign up for a new account.
- **Theme Toggling**: Click on the theme toggler to switch between light and dark modes.
- **Search**: Use the search bar to find specific videos by their titles.
- **Content Streaming**: Stream videos by clicking on them in the content grid.

## Contributing

Contributions to Stream SpOTT are welcome! If you have any feature requests, bug fixes, or suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this template to better suit your project and its features! Let me know if you need further assistance.
