import { useEffect, useState } from 'react'

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

  useEffect(() => {
    if (itemId && locationId && selectedDate && workingHours.length > 0) {
      const fetchSlotsDocLoc = async () => {
        try {
          const response = await slotService.getSlots(
            itemType,
            itemId,
            locationId,
            selectedDate.getMonth()
          )

          let bookedSlots = response.data
          const allPossibleSlots = generateAllSlotsForMonth(
            workingHours,
            selectedDate.getMonth(),
            selectedDate.getFullYear()
          )

          const availableSlots = allPossibleSlots.filter(
            (slot) => !isSlotBooked(slot, bookedSlots)
          )

          const availableDays = Array.from(
            new Set(availableSlots.map((slot) => slot.toDateString()))
          )
          setAvailableDays(availableDays)
          setSlots(availableSlots)
        } catch (error) {
          console.log('error msg', error)
          console.error(error)
        }
      }
      fetchSlotsDocLoc()
    }
  }, [itemId, locationId, selectedDate, workingHours, itemType])
  return { slots, availableDays }
}
