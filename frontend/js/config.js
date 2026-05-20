const CONFIG = {
    // Dynamically set API BASE URL
    // For production (hosted on Render), we use relative paths to avoid CORS/Origin issues
    API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000'
        : ''
};

window.CONFIG = CONFIG;
