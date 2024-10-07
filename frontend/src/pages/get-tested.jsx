import React, { useEffect, useState } from 'react'
import {
  BackButton,
  useCloudStorage,
  useHapticFeedback
} from '@vkruglikov/react-telegram-web-app'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import SearchBar from '../components/DoctorsListing/SearchBar.jsx'
import SpecializationCard from '../components/GetTested/DiagnosticType.jsx'
import { diagnosticService } from '../services/diagnostic/diagnostic.service.js'
import storage from '../utils/localStorage.js'

const GetTested = () => {
  // const storage = useCloudStorage()
  let navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [diagnosticTypes, setDiagnosticTypes] = useState([])
  const [filteredDiagnosticTypes, setFilteredDiagnosticTypes] = useState([])
  const [impactOccurred, notificationOccurred, selectionChanged] =
    useHapticFeedback()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAllDiagnostics = async () => {
    setLoading(true)
    try {
      const response = await diagnosticService.getDiagnostics()
      setDiagnosticTypes(response.data)
      setFilteredDiagnosticTypes(response.data)
    } catch (error) {
      console.error(error.message)
      setError('Ошибка при загрузке процедур')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      fetchAllDiagnostics()
    }
    fetchData()
  }, [])

  useEffect(() => {
    const searchLower = search.toLowerCase()
    const filtered = diagnosticTypes.filter((type) =>
      type.typeName.toLowerCase().includes(searchLower)
    )
    setFilteredDiagnosticTypes(filtered)
  }, [search, diagnosticTypes])

  if (loading) {
    return <div>Загрузка...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <BackButton onClick={() => navigate('/')} />
      <button onClick={() => navigate(-1)}>назад</button>
      <button onClick={() => navigate('/')}>дом</button>
      <div className="get-tested">
        <Header className={'get-tested__header'} title={'Get Tested'} />
        <SearchBar search={search} setSearch={setSearch} />
        <main className="get-tested__main">
          {filteredDiagnosticTypes.map((type, index) => (
            <Link
              to={`/booking/diagnostics/${type.diagnosticId}`}
              key={index}
              className="get-tested__link"
              onClick={async () => {
                await storage.setItem(
                  'selectedDiagnostic',
                  JSON.stringify(type)
                )
                notificationOccurred('success')
              }}
            >
              <SpecializationCard
                className="specialization-card"
                imgSrc={type.photoUrl}
                title={type.typeName}
                subtitle={`${type.clinicsCount || 0} Clinics`}
                price={type.price}
              />
            </Link>
          ))}
        </main>
      </div>
    </>
  )
}

export default GetTested
