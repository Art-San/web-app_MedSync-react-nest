import { useEffect, useState } from 'react'
import { workingHoursService } from '../services/working-hours/working-hours.service'

export const useWorkingHours = (locationId) => {
  const [workingHours, setWorkingHours] = useState([])

  useEffect(() => {
    if (locationId) {
      const fetchLocWorkingHours = async () => {
        try {
          const workingHoursLocation =
            await workingHoursService.getWorkingHours(locationId)
          setWorkingHours(workingHoursLocation.data)
        } catch (err) {
          console.error(err)
        }
      }
      fetchLocWorkingHours()
    }
  }, [locationId])
  return workingHours
}
// import { useEffect, useState } from 'react'
// import axios from 'axios'

// export const useWorkingHours = (locationId) => {
//   const [workingHours, setWorkingHours] = useState([])
//   console.log(777, workingHours)
//   useEffect(() => {
//     if (locationId) {
//       axios
//         .get(
//           `${
//             import.meta.env.VITE_API_URL
//           }/api/working-hours/location/${locationId}`
//         )
//         .then((response) => {
//           setWorkingHours(response.data)
//         })
//         .catch((error) => {
//           console.error('Error fetching working hours:', error)
//         })
//     }
//   }, [locationId])
//   return workingHours
// }
