import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
    host: true, // Here
    strictPort: true,
    port: 5173
  }
})

// watch: { usePolling: true }: Использование опроса для наблюдения за изменениями
// в файлах. Полезно в средах, где события файловой системы не работают корректно
// (например, в Docker-контейнерах).

// host: true: Указывает Vite использовать ваш локальный IP-адрес для запуска сервера.
// Это позволяет получить доступ к вашему серверу разработки с других устройств
// в вашей сети.

// strictPort: true: Указывает Vite не менять порт, если указанный порт уже занят.
// Если порт 5173 занят, сервер не запустится.

// port: 5173: Указывает Vite использовать порт 5173 для сервера разработки.
// Это номер порта, который будет использоваться для доступа к вашему приложению.
