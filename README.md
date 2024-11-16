# AI Chat Assistant

A modern, responsive chat interface built with Flask, jQuery, and Bootstrap that integrates with OpenAI's GPT models.

## Features

- 🤖 Real-time chat interface with AI powered by OpenAI's GPT models
- 🎨 Customizable themes (Light/Dark mode)
- 📱 Fully responsive design
- ⚙️ Configurable settings:
  - Font size adjustment
  - Model selection (GPT-3.5-Turbo, GPT-4, etc.)
  - Theme preferences
- 💬 Interactive chat features:
  - Real-time typing indicators
  - Loading animations
  - Message timestamps
  - User/Bot avatars

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**:
  - HTML5/CSS3
  - JavaScript (jQuery)
  - Bootstrap 4.5
- **APIs**: OpenAI Chat Completions API

## Prerequisites

- Python 3.6+
- OpenAI API key
- Modern web browser
- Internet connection (for CDN resources)

## Installation

```bash
1. Clone the repository
git clone https://github.com/mahakim89/chatbot-microservices.git
cd chatbot-microservices

2. Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate

3. Install dependencies
Install dependencies

4. Create a .env file in the project root and add your OpenAI API key:
OPENAI_API_KEY=your_api_key_here

5. Run the application
python app.py

6. Access the chat interface at http://127.0.0.1:5000



Configuration
Available GPT Models
GPT-3.5-Turbo (Default)
GPT-3.5-Turbo 16K
GPT-4
GPT-4 32K
Environment Variables
OPENAI_API_KEY: Your OpenAI API key (required)


Project Structure
├── app.py              # Flask application
├── requirements.txt    # Python dependencies
├── static/            # Static assets
│   ├── bot-avatar.png
│   └── user-avatar.png
└── templates/         # HTML templates
    ├── index.html     # Main chat interface
    └── index_test.html # Testing interface



Contributing
1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request


License
This project is licensed under the MIT License - see the LICENSE file for details.


Acknowledgments
OpenAI for the GPT API
Bootstrap team for the UI framework
Flask team for the Python web framework
```
