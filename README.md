# GitHub Contribution Graph 

This Node.js web application allows users to fetch and display their GitHub contribution graph. Users can enter their GitHub username, and the application will retrieve and display the corresponding contribution graph along with some profile details.

## Features

- Fetch and display GitHub contribution graph.
- View user profile details.
- Search for contribution graphs based on GitHub usernames.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ram13badgoti/githubcontributiongraph.git
    ```

2. **Change to the project directory:**

    ```bash
    cd github-contribution-graph
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

### Setting up Environment Variables

1. Create a `.env` file in the project root.

2. Add the following environment variables:

    ```env
    GITHUB_TOKEN=your_github_token_here
    PORT=3000
    ```

    Replace `your_github_token_here` with your GitHub token.

## Usage

1. **Start the application:**

    ```bash
    npm start
    ```

2. **Open your browser and navigate to [http://localhost:3000](http://localhost:3000).**

3. **Enter your GitHub username to view your contribution graph.**

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.


