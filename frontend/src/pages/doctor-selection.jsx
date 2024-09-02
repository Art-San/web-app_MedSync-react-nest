import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  BackButton,
  MainButton,
  useCloudStorage,
  useHapticFeedback
} from '@vkruglikov/react-telegram-web-app'
import DoctorCard from '../components/DoctorsListing/DoctorCard.jsx'
import SearchBar from '../components/DoctorsListing/SearchBar.jsx'
import Nav from '../components/DoctorsListing/Nav.jsx'
import { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import { doctorService } from '../services/doctor/doctor.service.js'
import { specialtyService } from '../services/specialty/specialty.service.js'
import { locationService } from '../services/location/location.service.js'
import storage from '../utils/localStorage.js'

const DoctorSelection = () => {
  // const storage = useCloudStorage()
  const navigate = useNavigate()
  const [impactOccurred, notificationOccurred, selectionChanged] =
    useHapticFeedback()
  const [specialties, setSpecialties] = useState([])

  const [search, setSearch] = useState('')
  const [allDoctors, setAllDoctors] = useState([])

  const [displayedDoctors, setDisplayedDoctors] = useState([])
  // console.log(13, displayedDoctors[0]?.photoUrl)
  const [specialty, setSpecialty] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  window.Telegram.WebApp.enableClosingConfirmation()

  const fetchSpecialties = async () => {
    try {
      const response = await specialtyService.getSpecialties()
      // const response = await axios.get(
      //   `${import.meta.env.VITE_API_URL}/api/specialties/`
      // )
      setSpecialties(response.data)
    } catch (error) {
      console.error(error.message)
    }
  }
  const fetchAllDoctors = async () => {
    try {
      const response = await doctorService.getDoctors()

      setAllDoctors(response.data)
      setDisplayedDoctors(response.data) // Initially display all doctors
    } catch (error) {
      console.error(error.message)
    }
  }

  const fetchLocationInfo = async (locationId) => {
    try {
      const response = await locationService.getLocation(locationId)
      // console.log(12, 'response', response)
      await storage.setItem('selectedLocation', JSON.stringify(response.data))
    } catch (error) {
      console.log('Ошибка', error.message)
      console.error(error.message)
    }
  }

  const handleDoctorClick = async (doctor) => {
    if (selectedDoctor?.doctorId === doctor.doctorId) {
      setSelectedDoctor(null)
      selectionChanged()
      await storage.removeItem('selectedDoctor')
      return
    } else if (selectedDoctor) {
      setSelectedDoctor(doctor)
      selectionChanged()
    } else {
      setSelectedDoctor(doctor)
      notificationOccurred('success')
    }
    await fetchLocationInfo(doctor.location.locationId)
  }

  useEffect(() => {
    notificationOccurred('success')
    fetchAllDoctors()
    fetchSpecialties()
    storage.getItem('selectedDoctor').then((value) => {
      if (value) {
        setSelectedDoctor(JSON.parse(value))
      }
    })
  }, [])

  useEffect(() => {
    let filteredDoctors = allDoctors
    if (specialty) {
      filteredDoctors = filteredDoctors.filter(
        (doctor) => doctor.specialty.specialtyId === specialty
      )
      selectionChanged()
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredDoctors = filteredDoctors.filter(
        (doctor) =>
          doctor.fullName.toLowerCase().includes(searchLower) ||
          doctor.specialty.specialtyName.toLowerCase().includes(searchLower)
      )
    }

    setDisplayedDoctors(filteredDoctors)
  }, [specialty, search])

  return (
    <>
      <BackButton onClick={() => navigate('/')} />
      <button onClick={() => navigate(-1)}>назад</button>
      <button onClick={() => navigate('/')}>дом</button>
      <div className="doctor-selection">
        <Header title="Select a Doctor" className="header doctor-selection" />
        <SearchBar search={search} setSearch={setSearch} />
        {specialties && (
          <Nav
            specialties={specialties}
            onSpecialtyClick={setSpecialty}
            selectedSpecialty={specialty}
          />
        )}
        {displayedDoctors && (
          <main className="main">
            {displayedDoctors.map((doctor) => (
              <DoctorCard
                className={
                  selectedDoctor && selectedDoctor.doctorId === doctor.doctorId
                    ? 'card card--active'
                    : 'card'
                }
                key={doctor?.doctorId}
                name={doctor?.fullName}
                title={doctor?.specialty?.specialtyName}
                address={doctor?.location?.address}
                price={Number(doctor?.price)}
                avg_rating={doctor?.rating ? doctor?.rating : 5}
                reviews={doctor?.reviews ? doctor?.reviews : 7}
                doctorImage={doctor?.photoUrl}
                onClick={() => handleDoctorClick(doctor)}
              />
            ))}
          </main>
        )}
      </div>
      {selectedDoctor && (
        <button
          onClick={async () => {
            notificationOccurred('success')
            await storage.setItem(
              'selectedDoctor',
              JSON.stringify(selectedDoctor)
            )
            navigate(`/doctor/${selectedDoctor.doctorId}`)
          }}
        >
          Book with {selectedDoctor.fullName}
        </button>
      )}
      {selectedDoctor && (
        <MainButton
          textColor="#FFF"
          text={`Book with ${selectedDoctor.fullName}`}
          onClick={async () => {
            notificationOccurred('success')
            await storage.setItem(
              'selectedDoctor',
              JSON.stringify(selectedDoctor)
            )
            navigate(`/doctor/${selectedDoctor.doctorId}`)
          }}
        />
      )}
    </>
  )
}

export default DoctorSelection
