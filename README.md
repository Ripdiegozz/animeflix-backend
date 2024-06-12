# Animeflix API

This project provides an API built with Bun, Elysiajs, and Consumet.ts to offer data and streaming links for anime and manga.

## Getting Started 🚀

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes. See the Deployment section for details on how to deploy the project.

### Prerequisites 📋

Before you begin, ensure you have met the following requirements:
- You need to install [Bun](https://bun.sh/docs/install) and [Node.js](https://nodejs.org/).
- A package manager such as npm or yarn.
  
```bash
# Example for installing Bun
curl -fsSL https://bun.sh/install | bash

# Example for installing Node.js
sudo apt install nodejs
```

### Installation 💥

Follow these steps to set up the development environment:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/anime-manga-api.git
    cd anime-manga-api
    ```

2. **Install dependencies:**

    ```bash
    bun install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root of the project and add necessary environment variables. Example:

    ```env
    API_KEY=your_api_key_here
    PORT=3000
    ```

4. **Run the development server:**

    ```bash
    bun run dev
    ```

    You should see output indicating the server is running and listening on the specified port.

5. **Retrieve system data or use for a small demo:**

    Open your browser and navigate to `http://localhost:3000/api/anime?title=Naruto` to see a JSON response with data about Naruto.

### Running the Tests ⚙️

To run automated tests for this system:

1. **Unit Tests:**
   
    ```bash
    bun test
    ```

    These tests verify the correctness of individual components.

2. **End-to-End Tests:**

    End-to-end tests verify the complete functionality of the API from start to finish.

    ```bash
    bun run e2e
    ```

3. **Coding Style Tests:**

    Ensure code quality and style adherence using linters:

    ```bash
    bun run lint
    ```

    These tests verify that the code follows our specified style guidelines.

### Deployment 🚀

To deploy the project:

1. **Build the project:**

    ```bash
    bun run build
    ```

2. **Deploy to your server:**

    Transfer the built files to your deployment server and start the server with:

    ```bash
    bun run start
    ```

    Ensure you have set the correct environment variables on the server.

## Built With 🛠️

- **Bun:** JavaScript runtime and package manager.
- **Elysiajs:** Web framework used.
- **Consumet:** Library for fetching anime and manga data.

## Contributing 🙌

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Wiki 📖

You can find more information on how to use this project in our [Wiki](https://github.com/yourusername/anime-manga-api/wiki).

## Versioning 📌

We use SemVer for versioning. For all available versions, see the tags in this repository.

## Authors ✒️

- **Andrés Villanueva:** Initial work - [@villanuevand](https://github.com/villanuevand)
- **Fulanito Detal:** Documentation - [@fulanitodetal](https://github.com/fulanitodetal)

You can also check out the list of [all contributors](https://github.com/yourusername/anime-manga-api/contributors) who participated in this project.

## License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments 🎉

Thanks to everyone involved in this project. If you find this useful, feel free to buy us a beer 🍺 or a coffee ☕. You can also donate crypto to this address: `0xf253fc233333078436d111175e5a76a649890000`.

### API Documentation

The complete documentation for the endpoints is available at `/swagger`. There you will find everything well-documented.

⌨️ with ❤️ by Villanuevand 😊
