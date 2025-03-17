const authMode = import.meta.env.VITE_AUTH_MODE;

console.log(`App running in ${authMode} mode`);

const serverUrl = authMode === 'local'
  ? 'http://localhost:8089'
  : 'https://cloud-api.example.com';

console.log(`Подключаемся к ${serverUrl}`);

export default serverUrl;
