import SearchBar from '../components/DoctorsListing/SearchBar.jsx'
import { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import {
  BackButton,
  MainButton,
  useCloudStorage,
  useHapticFeedback
} from '@vkruglikov/react-telegram-web-app'
import storage from '../utils/localStorage.js'

const SpecializationBlock = ({ title, subtitle, isActive }) => {
  return (
    <section
      className={`specialization-block ${
        isActive ? 'specialization-block--active' : ''
      }`}
    >
      <div className="specialization-block__title">{title}</div>
      <div className="specialization-block__subtitle">{subtitle}</div>
    </section>
  )
}

const ClinicSelection = () => {
  // const storage = useCloudStorage()
  const [search, setSearch] = useState('')
  const [clinics, setClinics] = useState(null)
  const { diagnosticId } = useParams()
  const [selectedClinic, setSelectedClinic] = useState(null)
  const navigate = useNavigate()
  const [impactOccurred, notificationOccurred, selectionChanged] =
    useHapticFeedback()
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const clinics = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/diagnostics/${diagnosticId}/locations`
          // `${import.meta.env.VITE_API_URL}/api/${diagnosticId}/locations`
        )
        console.log(345, 'clinics', clinics.data)

        let filteredClinics = clinics.data

        if (search) {
          const searchLower = search.toLowerCase()
          filteredClinics = clinics.data.filter(
            (clinic) =>
              clinic.name.toLowerCase().includes(searchLower) ||
              clinic.address.toLowerCase().includes(searchLower)
          )
        }
        setClinics(filteredClinics)
      } catch (err) {
        console.error(err)
      }
    }
    fetchClinics()
  }, [search])

  const handleNext = async () => {
    await storage.setItem('selectedLocation', JSON.stringify(selectedClinic))
    navigate('/booking/clinic')
  }

  const handleChooseClinic = async (clinic) => {
    // console.log(1, 'clinic', clinic)
    const isSameClinicSelected =
      clinic.locationId === selectedClinic?.locationId

    if (isSameClinicSelected) {
      console.log(2, 'isSameClinicSelected', isSameClinicSelected)
      setSelectedClinic(null)
      selectionChanged()
    } else {
      if (selectedClinic) {
        console.log(3, 'selectedClinic', selectedClinic)
        selectionChanged()
      } else {
        console.log(4, 'notificationOccurred', 'success')
        notificationOccurred('success')
      }
      setSelectedClinic(clinic)
      console.log('fin для 3 или 4')
    }
  }

  return (
    <>
      <BackButton onClick={() => navigate(-1)} />
      <button onClick={() => navigate(-1)}>назад</button>
      <button onClick={() => navigate('/')}>дом</button>
      <div className="specialization">
        <Header title="Choose Clinic" className="specialization" />
        <SearchBar search={search} setSearch={setSearch} />
        <main className="specialization__main">
          {clinics &&
            clinics.map((clinic, index) => (
              <div onClick={() => handleChooseClinic(clinic)} key={index}>
                <SpecializationBlock
                  title={clinic.name}
                  subtitle={clinic.address}
                  isActive={selectedClinic?.locationId === clinic.locationId}
                />
              </div>
            ))}
        </main>
        {selectedClinic && <button onClick={handleNext}>Next</button>}
        {selectedClinic && <MainButton text="Next" onClick={handleNext} />}
      </div>
    </>
  )
}

export default ClinicSelection
