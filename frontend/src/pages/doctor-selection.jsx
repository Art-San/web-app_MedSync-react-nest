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

const DoctorSelection = () => {
  const navigate = useNavigate()
  const storage = useCloudStorage()
  const [impactOccurred, notificationOccurred, selectionChanged] =
    useHapticFeedback()
  const [specialties, setSpecialties] = useState([])
  console.log(123, 'DoctorSelection', specialties)
  const [search, setSearch] = useState('')
  const [allDoctors, setAllDoctors] = useState([])
  const [displayedDoctors, setDisplayedDoctors] = useState([])
  // console.log(13, displayedDoctors[0]?.photoUrl)
  const [specialty, setSpecialty] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  window.Telegram.WebApp.enableClosingConfirmation()

  const fetchSpecialties = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/specialties/`
      )
      setSpecialties(response.data)
    } catch (error) {
      console.error(error.message)
    }
  }
  const fetchAllDoctors = async () => {
    try {
      const response = await doctorService.getDoctors()
      console.log(123, 'fetchAllDoctors', response)
      // const response = await axios.get(
      //   `${import.meta.env.VITE_API_URL}/api/doctors/`
      // )
      setAllDoctors(response.data)
      setDisplayedDoctors(response.data) // Initially display all doctors
    } catch (error) {
      console.error(error.message)
    }
  }

  const fetchLocationInfo = async (location_id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/locations/${location_id}`
      )
      await storage.setItem('selectedLocation', JSON.stringify(response.data))
    } catch (error) {
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
    await fetchLocationInfo(doctor.location_id)
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
        (doctor) => doctor.specialty_id === specialty
      )
      selectionChanged()
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredDoctors = filteredDoctors.filter(
        (doctor) =>
          doctor.fullName.toLowerCase().includes(searchLower) ||
          doctor.specialty_name.toLowerCase().includes(searchLower)
      )
    }

    setDisplayedDoctors(filteredDoctors)
  }, [specialty, search])

  return (
    <>
      <BackButton onClick={() => navigate('/')} />
      <div className="doctor-selection">
        <Header title="Select a Doctor" className="header doctor-selection" />
        <SearchBar search={search} setSearch={setSearch} />
        {/* {specialties && (
          <Nav
            specialties={specialties}
            onSpecialtyClick={setSpecialty}
            selectedSpecialty={specialty}
          />
        )} */}
        {/* {displayedDoctors && (
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
        )} */}
      </div>
      {/* {selectedDoctor && (
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
      )} */}
    </>
  )
}

export default DoctorSelection
