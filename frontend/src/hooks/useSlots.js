import { useEffect, useState } from 'react'
import axios from 'axios'
import { generateAllSlotsForMonth, isSlotBooked } from '../utils/slotUtils'

export const useSlots = (
  itemId,
  locationId,
  selectedDate,
  workingHours,
  itemType
) => {
  const [slots, setSlots] = useState(null)
  const [availableDays, setAvailableDays] = useState([])
  // const endpoint = `/api/slots/${itemType}`
  const endpoint = `/api/slots/doctors`
  // https://medsync.botfather.dev/api/slots/doctors/1/2/7
  // console.log(12, itemId)
  // console.log(13, locationId)
  // console.log(14, selectedDate.getMonth())
  // console.log(15, workingHours)

  const data = [
    '2024-08-21T07:00:00+00:00',
    '2024-08-22T10:00:00+00:00',
    '2024-08-28T06:00:00+00:00',
    '2024-08-30T09:00:00+00:00'
  ]
  useEffect(() => {
    if (itemId && locationId && selectedDate && workingHours.length > 0) {
      axios
        .get(
          `${
            import.meta.env.VITE_API_URL
          }${endpoint}/${itemId}/${locationId}/${selectedDate.getMonth()}`
        )
        .then((response) => {
          let bookedSlots = data
          // let bookedSlots = response.data

          const allPossibleSlots = generateAllSlotsForMonth(
            workingHours,
            selectedDate.getMonth(),
            selectedDate.getFullYear()
          )
          // console.log(16, allPossibleSlots)
          const availableSlots = allPossibleSlots.filter(
            (slot) => !isSlotBooked(slot, bookedSlots)
          )
          const availableDays = Array.from(
            new Set(availableSlots.map((slot) => slot.toDateString()))
          )
          setAvailableDays(availableDays)
          setSlots(availableSlots)
        })
        .catch((error) => {
          console.error('Error fetching slots:', error)
        })
    }
  }, [itemId, locationId, selectedDate, workingHours, endpoint])
  return { slots, availableDays }
}
// ;[
//   '2024-08-21T07:00:00+00:00',
//   '2024-08-22T10:00:00+00:00',
//   '2024-08-28T06:00:00+00:00',
//   '2024-08-30T09:00:00+00:00'
// ][
//   ('2024-08-19T06:00:00.000Z',
//   '2024-08-19T07:00:00.000Z',
//   '2024-08-19T08:00:00.000Z',
//   '2024-08-19T06:00:00.000Z',
//   '2024-08-19T07:00:00.000Z',
//   '2024-08-19T08:00:00.000Z',
//   '2024-08-19T10:00:00.000Z')
// ]
