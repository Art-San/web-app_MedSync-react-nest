import { useState } from 'react'

function AdminLogin() {
  const [fullName, setFullName] = useState('')
  const [telegramId, setTelegramId] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, telegramId })
      }
    )

    const data = await response.json()
    if (response.ok) {
      // Handle successful login, e.g., store token and redirect
      console.log('Logged in as admin:', data)
    } else {
      // Handle login failure
      console.error('Login failed:', data.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Full Name:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Telegram ID:
          <input
            type="password"
            value={telegramId}
            onChange={(e) => setTelegramId(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default AdminLogin
