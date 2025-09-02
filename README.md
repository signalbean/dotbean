# dotbean

A simple and lightweight Node.js library to load environment variables from a `.env` file into `process.env`. Built as a modern, ESM-first alternative to dotenv.

---

### 🚀 Features

* **Simple & Fast:** Minimalist design with no dependencies.
* **ESM First:** Built for modern JavaScript modules.
* **No Overwriting:** By default, it won't overwrite existing environment variables.

---

### 📦 Installation

To install dotbean in your project, use npm:

npm install dotbean

---

### 💻 Usage

1.  **Create a .env file**

    In the root of your project, create a file named `.env` and add your environment variables to it.

    ```
    # .env file
    API_KEY=my-super-secret-key
    DB_URL="mongodb://localhost:27017/my_app"
    PORT=3000
    ```

2.  **Configure dotbean**

    Import and call the `config()` function at the very top of your main application file (e.g., `app.js`).

    ```
    // app.js
    import { config } from 'dotbean';

    config();

    // The rest of your application code can now access the variables
    import express from 'express';
    const app = express();
    const port = process.env.PORT;

    app.get('/', (req, res) => {
      res.send(`Server running with API Key: ${process.env.API_KEY}`);
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
    ```

---

### Options

The `config()` function accepts an optional object to customize its behavior.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `path` | `string` | `.env` | Specify a custom path to your environment file. |
| `override`| `boolean`| `false`| Set to `true` to force dotbean to overwrite variables that already exist in `process.env`.|

Example with a custom path:

import { config } from 'dotbean';
config({ path: './config/production.env' });

---

### 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
