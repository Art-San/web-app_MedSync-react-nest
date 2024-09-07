import { useEffect, useState } from 'react'
import axios from 'axios'

import { generateAllSlotsForMonth, isSlotBooked } from '../utils/slotUtils'
import { slotService } from '../services/slot/slot.service'

export const useSlots = (
  itemId,
  locationId,
  selectedDate,
  workingHours,
  itemType
) => {
  const [slots, setSlots] = useState(null)
  const [availableDays, setAvailableDays] = useState([])
  const endpoint = `/api/slots/${itemType}`
  // const endpoint = `/api/slots/doctors`
  // https://medsync.botfather.dev/api/slots/doctors/1/2/7

  useEffect(() => {
    if (itemId && locationId && selectedDate && workingHours.length > 0) {
      const fetchSlotsDocLoc = async () => {
        try {
          const response = await slotService.getSlots(
            itemId,
            locationId,
            selectedDate.getMonth()
          )

          let bookedSlots = response
          console.log('bookedSlots', bookedSlots)
          // const allPossibleSlots = generateAllSlotsForMonth(
          //   workingHours,
          //   selectedDate.getMonth(),
          //   selectedDate.getFullYear()
          // )

          // const availableSlots = allPossibleSlots.filter(
          //   (slot) => !isSlotBooked(slot, bookedSlots)
          // )
          // const availableDays = Array.from(
          //   new Set(availableSlots.map((slot) => slot.toDateString()))
          // )
          // setAvailableDays(availableDays)
          // setSlots(availableSlots)
        } catch (error) {
          console.log('error msg', error)
          console.error(error)
        }
      }
      fetchSlotsDocLoc()
    }
  }, [itemId, locationId, selectedDate, workingHours, endpoint])
  return { slots, availableDays }
}

// import { useEffect, useState } from 'react'
// import axios from 'axios'

// import { generateAllSlotsForMonth, isSlotBooked } from '../utils/slotUtils'

// export const useSlots = (
//   itemId,
//   locationId,
//   selectedDate,
//   workingHours,
//   itemType
// ) => {
//   const [slots, setSlots] = useState(null)
//   const [availableDays, setAvailableDays] = useState([])
//   const endpoint = `/api/slots/${itemType}`
//   // const endpoint = `/api/slots/doctors`
//   // https://medsync.botfather.dev/api/slots/doctors/1/2/7

//   // console.log(9991, itemId)
//   // console.log(9992, locationId)
//   // console.log(9993, selectedDate)
//   // console.log(9994, workingHours)
//   // const data = ['2024-09-01T01:00:00+00:00', '2024-09-01T07:00:00+00:00']
//   // const data = [
//   //   '2024-09-02T01:00:00.000Z',
//   //   '2024-09-02T07:00:00.000Z',
//   //   '2024-09-02T08:00:00.000Z'
//   // ]

//   useEffect(() => {
//     if (itemId && locationId && selectedDate && workingHours.length > 0) {
//       axios
//         .get(
//           `${
//             import.meta.env.VITE_API_URL
//           }${endpoint}/${itemId}/${locationId}/${selectedDate.getMonth()}`
//           // {
//           //   headers: {
//           //     'ngrok-skip-browser-warning': '69420'
//           //   }
//           // }
//         )
//         .then((response) => {
//           // let bookedSlots = data
//           let bookedSlots = response.data

//           const allPossibleSlots = generateAllSlotsForMonth(
//             workingHours,
//             selectedDate.getMonth(),
//             selectedDate.getFullYear()
//           )

//           const availableSlots = allPossibleSlots.filter(
//             (slot) => !isSlotBooked(slot, bookedSlots)
//           )

//           // console.log(16, availableSlots)
//           const availableDays = Array.from(
//             new Set(availableSlots.map((slot) => slot.toDateString()))
//           )
//           setAvailableDays(availableDays)
//           setSlots(availableSlots)
//         })
//         .catch((error) => {
//           console.log('error', error)
//           console.error('Error fetching slots:', error)
//         })
//     }
//   }, [itemId, locationId, selectedDate, workingHours, endpoint])
//   return { slots, availableDays }
// }
