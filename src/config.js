const authMode = import.meta.env.VITE_AUTH_MODE;

const serverUrl = authMode === 'local'
  ? 'http://localhost:8089'
  : 'https://cloud-api.example.com';

export default serverUrl;