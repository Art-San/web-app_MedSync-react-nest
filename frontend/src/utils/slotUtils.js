import { eachDayOfInterval, endOfMonth, getDay, startOfMonth } from 'date-fns'

export const generateAllSlotsForMonth = (
  workingHours,
  selectedMonth,
  selectedYear
) => {
  const allSlots = []

  // Initialize a Date object for the first day of the selected month and year
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1)

  // Get the first and last day of the month
  const start = startOfMonth(firstDayOfMonth)
  const end = endOfMonth(firstDayOfMonth)

  // Generate an array of all days in the month
  const daysInMonth = eachDayOfInterval({ start, end })

  daysInMonth.forEach((day) => {
    // Get the weekday index (0 for Sunday, 1 for Monday, etc.)
    const weekdayIndex = getDay(day)

    // Find the working hours for this weekday
    const workingHour = workingHours.find(
      (wh) => wh.weekdayIndex === weekdayIndex
    )

    if (workingHour) {
      // Генерация слотов на основе рабочего времени
      const start_hour = workingHour.startTime // Это целое число часов, например 9 для 9 утра.
      const end_hour = workingHour.endTime

      for (let hour = start_hour; hour < end_hour; hour++) {
        const slotStart = new Date(day)
        slotStart.setHours(hour)
        if (slotStart >= new Date()) {
          allSlots.push(slotStart)
        }
      }
    }
  })

  return allSlots
}

export const isSlotBooked = (slot, bookedSlots) => {
  return bookedSlots.some((bookedSlot) => {
    let bookedSlotDateWithHours = new Date(bookedSlot)
    return slot.getTime() === bookedSlotDateWithHours.getTime()
  })
}
