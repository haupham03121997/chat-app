export const setLocalStorage = <T = any>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = <T = any>(key: string): T | null => {
  const value = localStorage.getItem(key)
  if (!value) return null
  return JSON.parse(value)
}

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}
