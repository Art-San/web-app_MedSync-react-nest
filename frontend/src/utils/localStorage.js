// utils/localStorageWrapper.js

const storage = {
  setItem: async (key, value) => {
    localStorage.setItem(key, value) // Можно заменить на sessionStorage, если нужно
  },
  getItem: async (key) => {
    return localStorage.getItem(key) // Можно заменить на sessionStorage, если нужно
  },
  removeItem: async (key) => {
    localStorage.removeItem(key) // Можно заменить на sessionStorage, если нужно
  }
}

export default storage
