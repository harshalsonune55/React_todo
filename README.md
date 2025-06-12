# ✅ React To-Do App with Date & Time Logging

A simple, user-friendly React-based To-Do application designed to help you manage tasks efficiently. This app allows users to add, delete, and mark tasks as completed, with each task automatically timestamped using a live external API for accurate date and time logging.

---

## 🔧 Features

- 📅 **Real-Time Task Timestamping**: Automatically logs the creation date and time for each task using a public time API.
- 📝 **Task Management**: Add new tasks, mark them as completed, or delete them with ease.
- ✔️ **Bulk Actions**: Mark all tasks as completed in one click.
- ❌ **Delete Tasks**: Remove individual tasks or clear completed ones.
- ⏱️ **Live Time Updates**: Time is updated every second using `setInterval` for real-time accuracy.
- 🎨 **Responsive UI**: Clean and intuitive interface with visual indicators for completed tasks.
- 🛠️ **Persistent Storage** (optional): Easily extendable to include local storage for task persistence.

---

## 📦 Tech Stack

- **React**: Built with `useState` and `useEffect` hooks for state management and side effects.
- **External API**: Integrates with a [Google Apps Script API](https://script.googleusercontent.com/macros/echo?user_content_key=...) for fetching real-time date and time.
- **CSS**: Styled with modular CSS for a responsive and modern look.
- **JavaScript (ES6+)**: Leverages modern JavaScript for clean and efficient code.

---

## 🚀 How to Run Locally

Follow these steps to set up and run the app on your local machine:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/harshalsonune55/React_todo.git
   cd React_todo
   ```

2. **Install Dependencies**
   Ensure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```
   The app will open in your default browser at `http://localhost:3000`.

4. **Build for Production** (optional)
   ```bash
   npm run build
   ```
   This generates an optimized production build in the `build` folder.

---

## 🛠️ Project Structure

```
React_todo/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── TodoForm.js       # Form to add new tasks
│   │   ├── TodoList.js       # Displays the task list
│   │   └── TodoItem.js       # Individual task component
│   ├── App.js                # Main app component
│   ├── App.css               # Styles for the app
│   ├── index.js              # Entry point
│   └── index.css             # Global styles
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```

---

## 📡 API Integration

The app fetches the current date and time from a [Google Apps Script API](https://script.googleusercontent.com/macros/echo?user_content_key=...) to timestamp tasks. The API is called when a new task is added, ensuring accurate and server-synced timestamps.

- **Endpoint**: `https://script.googleusercontent.com/macros/echo?...`
- **Response**: Returns a JSON object with the current date and time.
- **Usage**: Integrated using `fetch` within a `useEffect` hook to update the time display every second.

---

## 🧑‍💻 Usage

1. **Add a Task**: Enter a task description in the input field and click "Add" or press Enter.
2. **Mark as Done**: Click the checkbox next to a task to mark it as completed.
3. **Delete a Task**: Click the delete button (🗑️) to remove a task.
4. **Mark All as Done**: Use the "Mark All Done" button to complete all tasks at once.
5. **View Timestamps**: Each task displays its creation date and time, fetched from the API.

---

## 🛠️ Extending the App

Want to enhance the app? Here are some ideas:
- **Local Storage**: Add `localStorage` to persist tasks across page refreshes.
- **Task Categories**: Implement categories or priority levels for tasks.
- **Edit Tasks**: Add functionality to edit existing tasks.
- **Notifications**: Integrate browser notifications for task reminders.
- **Dark Mode**: Add a toggle for dark/light theme support.

---

## 🐛 Known Issues

- The external API may occasionally experience latency, causing slight delays in timestamp updates.
- No persistent storage is implemented by default; tasks are cleared on page refresh.

---

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure your code follows the existing style and includes relevant tests.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

- Built with [Create Creation App](https://create-react-app.dev/).
- Time API provided by [Google Apps Script](https://developers.google.com/apps-script).
- Inspired by simple task management apps and React tutorials.

---

Feel free to star ⭐ the repository if you find this project useful!