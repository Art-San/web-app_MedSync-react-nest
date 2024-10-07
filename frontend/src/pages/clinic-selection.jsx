import SearchBar from '../components/DoctorsListing/SearchBar.jsx'
import { useCallback, useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import {
  BackButton,
  MainButton,
  useCloudStorage,
  useHapticFeedback
} from '@vkruglikov/react-telegram-web-app'
import { diagnosticService } from '../services/diagnostic/diagnostic.service.js'
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
  const [clinics, setClinics] = useState([])
  const [filteredClinics, setFilteredClinics] = useState([])
  const { diagnosticId } = useParams()
  const [selectedClinic, setSelectedClinic] = useState(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [impactOccurred, notificationOccurred, selectionChanged] =
    useHapticFeedback()

  const fetchClinicsForDiagnostic = async () => {
    setLoading(true)
    try {
      const response = await diagnosticService.getLocsForDiagnostic(
        diagnosticId
      )
      setClinics(response.data)
      setFilteredClinics(response.data)
    } catch (error) {
      console.error(error.message)
      setError('Ошибка при загрузке клиник')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchClinicsForDiagnostic()
    }
    fetchData()
  }, [diagnosticId])

  useEffect(() => {
    const searchLower = search.toLowerCase()
    const filtered = clinics.filter(
      (clinic) =>
        clinic.name.toLowerCase().includes(searchLower) ||
        clinic.address.toLowerCase().includes(searchLower)
    )
    setFilteredClinics(filtered)
  }, [search, clinics])

  const handleNext = useCallback(async () => {
    try {
      await storage.setItem('selectedLocation', JSON.stringify(selectedClinic))
      navigate('/booking/clinic')
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error)
    }
  }, [selectedClinic, navigate])

  const handleChooseClinic = useCallback(
    (clinic) => {
      const isSameClinicSelected =
        clinic.locationId === selectedClinic?.locationId

      if (isSameClinicSelected) {
        setSelectedClinic(null)
        selectionChanged()
      } else {
        if (selectedClinic) {
          selectionChanged()
        } else {
          notificationOccurred('success')
        }
        setSelectedClinic(clinic)
      }
    },
    [selectedClinic, selectionChanged]
  )

  if (loading) {
    return <div>Загрузка...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <BackButton onClick={() => navigate(-1)} />
      <button onClick={() => navigate('/')}>дом</button>
      <div className="specialization">
        <Header title="Choose Clinic" className="specialization" />
        <SearchBar search={search} setSearch={setSearch} />
        <main className="specialization__main">
          {filteredClinics &&
            filteredClinics.map((clinic, index) => (
              <div
                onClick={() => handleChooseClinic(clinic)}
                key={clinic.locationId}
              >
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
