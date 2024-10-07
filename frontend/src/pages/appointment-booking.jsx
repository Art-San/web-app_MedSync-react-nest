import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BackButton,
  MainButton,
  useCloudStorage,
  useHapticFeedback
} from '@vkruglikov/react-telegram-web-app'
import { useWorkingHours } from '../hooks/useWorkingHours.js'
import { useSlots } from '../hooks/useSlots.js'
import TimeSlot from '../components/Booking/TimeSlot.jsx'
import Calendar from '../components/Booking/Calendar.jsx'
import Header from '../components/Header.jsx'
import storage from '../utils/localStorage.js'

const SlotSelection = ({ storageKey, itemType }) => {
  // const storage = useCloudStorage()
  const navigate = useNavigate()
  const [selectedItem, setParsedItem] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [impactOccurred, notificationOccurred, selectionChanged] =
    useHapticFeedback()

  const [selectedLocation, setSelectedLocation] = useState(null)

  useEffect(() => {
    storage.getItem(storageKey).then((storedItem) => {
      setParsedItem(JSON.parse(storedItem))
    })
    storage.getItem('selectedLocation').then((storedLocation) => {
      if (storedLocation) {
        setSelectedLocation(JSON.parse(storedLocation))
      }
    })
  }, [storage])

  const workingHours = useWorkingHours(selectedLocation?.locationId)

  const { slots, availableDays, loading, error } = useSlots(
    itemType === 'doctors'
      ? selectedItem?.doctorId
      : selectedItem?.diagnosticId,
    selectedLocation?.locationId,
    selectedDate,
    workingHours,
    itemType
  )

  const handleDateChange = (date) => {
    selectionChanged()
    setSelectedDate(date)
  }

  const handleSlotSelection = (slot) => {
    setSelectedTimeSlot(slot)
    selectionChanged()
  }

  const handleNext = async () => {
    notificationOccurred('success')
    console.log('selectedTimeSlot', selectedTimeSlot)
    await storage.setItem('selectedTimeSlot', JSON.stringify(selectedTimeSlot))
    navigate(`/booking/patient-info-form/${itemType}`)
  }

  return (
    <>
      <BackButton onClick={() => navigate(-1)} />
      <button onClick={() => navigate(-1)}>назад</button>
      <button onClick={() => navigate('/')}>дом</button>
      <div className="time-details">
        <Header className="time-details" title="Time Details" />
        <main className="time-details__main">
          <Calendar
            onDateChange={handleDateChange}
            availableDays={availableDays}
          />
          {selectedDate && slots && (
            <TimeSlot
              availableSlots={slots}
              selectedTimeSlot={selectedTimeSlot}
              setSelectedTimeSlot={handleSlotSelection}
              selectedDate={selectedDate}
              loading={loading}
              error={error}
            />
          )}

          {selectedTimeSlot && <button onClick={handleNext}>Жми</button>}
          {selectedTimeSlot && <MainButton onClick={handleNext}></MainButton>}
        </main>
      </div>
    </>
  )
}

export default SlotSelection
