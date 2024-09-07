export const VITE_URL_API = `${import.meta.env.VITE_API_URL}/api`

export const getDoctorsUrl = (string) => `/doctors${string}`
export const getSpecialtiesUrl = (string) => `/specialties${string}`
export const getLocationsUrl = (string) => `/locations${string}`
export const getWorkingHoursUrl = (string) => `/working-hours${string}`

// https://medsync.botfather.dev/api/slots/doctors/1/2/7
// 'slots/doctors/:doctorId/:locationId/:monthNumber'
export const getSlotsUrl = (string) => `/slots${string}`
