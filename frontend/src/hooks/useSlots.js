import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  convertToUTCOffsetFormat,
  generateAllSlotsForMonth
} from '../utils/slotUtils'
// import { generateAllSlotsForMonth, isSlotBooked } from '../utils/slotUtils'

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

  // const data = []
  const data = ['2024-09-01T01:00:00+00:00', '2024-09-01T07:00:00+00:00']

  const isSlotBooked = (slot, bookedSlots) => {
    return bookedSlots.some((bookedSlot) => {
      const bookedSlotDate = new Date(bookedSlot).getTime()
      return slot.getTime() === bookedSlotDate
    })
  }
  useEffect(() => {
    if (itemId && locationId && selectedDate && workingHours.length > 0) {
      axios
        .get(
          `${
            import.meta.env.VITE_API_URL
          }${endpoint}/${itemId}/${locationId}/${selectedDate.getMonth()}`
        )
        .then((response) => {
          // let bookedSlots = data
          let bookedSlots = response.data
          console.log(123, 'bookedSlots', bookedSlots)

          var res = bookedSlots.map((el) => {
            return convertToUTCOffsetFormat(el)
          })
          // console.log(11, 'res', res)

          const allPossibleSlots = generateAllSlotsForMonth(
            workingHours,
            selectedDate.getMonth(),
            selectedDate.getFullYear()
          )

          const availableSlots = allPossibleSlots.filter(
            (slot) => !isSlotBooked(slot, res)
          )

          // console.log(16, availableSlots)
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
