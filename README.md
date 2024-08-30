# RAG app demo

Small chat app demo using RAG (Retrieval Augmented Generation) with Qdrant and Anthropic's Claude.

## Features

- User can chat with a uploaded CSV file

## Technologies Used

- Next.js
- React
- Qdrant - Vector Database
- Anthropic claude - LLM
- Voyage AI for generating embeddings

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

2. Navigate to the project directory:
   ```bash
   cd your-repo-name
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Add environment variables
   - Create a `.env` file in the root of the project
   - Add the following variables:
     ```bash
     QDRANT_API_KEY=your-api-key
     QDRANT_URL=URL_TO_YOUR_QDRANT_COLLECTION
     ANTHROPIC_API_KEY=your-api-key
     VOYAGE_API_KEY=your-api-key
     ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- Upload a CSV file
- Ask questions about the CSV file
- Click on the "Chat" button

## Contributing

If you'd like to contribute, please fork the repository and create a pull request. You can also simply open an issue with the tag "enhancement".

## License

