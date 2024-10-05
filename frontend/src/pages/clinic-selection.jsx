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
import storage from '../utils/localStorage.js'
import { diagnosticService } from '../services/diagnostic/diagnostic.service.js'

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

  // От GPT
  // Проблема: Вы вызываете асинхронную функцию внутри useEffect, что может вызвать предупреждения ESLint.
  // Решение: Оберните асинхронную функцию внутри useEffect:
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

  // const handleNext = useCallback(async () => {
  //   await storage.setItem('selectedLocation', JSON.stringify(selectedClinic))
  //   navigate('/booking/clinic')
  // }, [selectedClinic, navigate])

  // От GPT
  // Проблема: В handleNext нет обработки ошибок при сохранении данных.
  // Решение: Добавьте блок try...catch:
  // Проблема: Функции handleNext и handleChooseClinic пересоздаются при каждом рендере.
  // Решение: Оберните их в useCallback:
  // const handleNext = async () => {
  //   await storage.setItem('selectedLocation', JSON.stringify(selectedClinic))
  //   navigate('/booking/clinic')
  // }

  // const handleChooseClinic = async (clinic) => {
  //   const isSameClinicSelected =
  //     clinic.locationId === selectedClinic?.locationId

  //   if (isSameClinicSelected) {
  //     setSelectedClinic(null)
  //     selectionChanged()
  //   } else {
  //     if (selectedClinic) {
  //       selectionChanged()
  //     } else {
  //       notificationOccurred('success')
  //     }
  //     setSelectedClinic(clinic)
  //   }
  // }

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
      <button onClick={() => navigate(-1)}>назад</button>
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

// import SearchBar from '../components/DoctorsListing/SearchBar.jsx'
// import { useEffect, useState } from 'react'
// import Header from '../components/Header.jsx'
// import axios from 'axios'
// import { useNavigate, useParams } from 'react-router-dom'
// import {
//   BackButton,
//   MainButton,
//   useCloudStorage,
//   useHapticFeedback
// } from '@vkruglikov/react-telegram-web-app'
// import storage from '../utils/localStorage.js'
// import { diagnosticService } from '../services/diagnostic/diagnostic.service.js'

// const SpecializationBlock = ({ title, subtitle, isActive }) => {
//   return (
//     <section
//       className={`specialization-block ${
//         isActive ? 'specialization-block--active' : ''
//       }`}
//     >
//       <div className="specialization-block__title">{title}</div>
//       <div className="specialization-block__subtitle">{subtitle}</div>
//     </section>
//   )
// }

// const ClinicSelection = () => {
//   // const storage = useCloudStorage()
//   const [search, setSearch] = useState('')
//   const [clinics, setClinics] = useState([])
//   const [filteredClinics, setFilteredClinics] = useState([])

//   const { diagnosticId } = useParams()
//   const [selectedClinic, setSelectedClinic] = useState(null)
//   const navigate = useNavigate()
//   const [impactOccurred, notificationOccurred, selectionChanged] =
//     useHapticFeedback()

//   const fetchClinicsForDiagnostic = async () => {
//     try {
//       const response = await diagnosticService.getLocsForDiagnostic(
//         diagnosticId
//       )
//       setClinics(response.data)
//       setFilteredClinics(response.data)
//     } catch (error) {
//       console.error(error.message)
//     }
//   }

//   useEffect(() => {
//     fetchClinicsForDiagnostic()
//   }, [])

//   useEffect(() => {
//     const searchLower = search.toLowerCase()

//     const filtered = clinics.filter(
//       (clinic) =>
//         clinic.name.toLowerCase().includes(searchLower) ||
//         clinic.address.toLowerCase().includes(searchLower)
//     )

//     setFilteredClinics(filtered)
//   }, [search])

//   // useEffect(() => {
//   //   const fetchClinics = async () => {
//   //     try {
//   //       const clinics = await axios.get(
//   //         `${
//   //           import.meta.env.VITE_API_URL
//   //         }/api/diagnostics/${diagnosticId}/locations`
//   //         // `${import.meta.env.VITE_API_URL}/api/${diagnosticId}/locations`
//   //       )
//   //       console.log(345, 'clinics', clinics.data)

//   //       let filteredClinics = clinics.data

//   //       if (search) {
//   //         const searchLower = search.toLowerCase()
//   //         filteredClinics = clinics.data.filter(
//   //           (clinic) =>
//   //             clinic.name.toLowerCase().includes(searchLower) ||
//   //             clinic.address.toLowerCase().includes(searchLower)
//   //         )
//   //       }
//   //       setClinics(filteredClinics)
//   //     } catch (err) {
//   //       console.error(err)
//   //     }
//   //   }
//   //   fetchClinics()
//   // }, [search])

//   const handleNext = async () => {
//     await storage.setItem('selectedLocation', JSON.stringify(selectedClinic))
//     navigate('/booking/clinic')
//   }

//   const handleChooseClinic = async (clinic) => {
//     // console.log(1, 'clinic', clinic)
//     const isSameClinicSelected =
//       clinic.locationId === selectedClinic?.locationId

//     if (isSameClinicSelected) {
//       console.log(2, 'isSameClinicSelected', isSameClinicSelected)
//       setSelectedClinic(null)
//       selectionChanged()
//     } else {
//       if (selectedClinic) {
//         console.log(3, 'selectedClinic', selectedClinic)
//         selectionChanged()
//       } else {
//         console.log(4, 'notificationOccurred', 'success')
//         notificationOccurred('success')
//       }
//       setSelectedClinic(clinic)
//       console.log('fin для 3 или 4')
//     }
//   }

//   return (
//     <>
//       <BackButton onClick={() => navigate(-1)} />
//       <button onClick={() => navigate(-1)}>назад</button>
//       <button onClick={() => navigate('/')}>дом</button>
//       <div className="specialization">
//         <Header title="Choose Clinic" className="specialization" />
//         <SearchBar search={search} setSearch={setSearch} />
//         <main className="specialization__main">
//           {filteredClinics &&
//             filteredClinics.map((clinic, index) => (
//               <div onClick={() => handleChooseClinic(clinic)} key={index}>
//                 <SpecializationBlock
//                   title={clinic.name}
//                   subtitle={clinic.address}
//                   isActive={selectedClinic?.locationId === clinic.locationId}
//                 />
//               </div>
//             ))}
//         </main>
//         {selectedClinic && <button onClick={handleNext}>Next</button>}
//         {selectedClinic && <MainButton text="Next" onClick={handleNext} />}
//       </div>
//     </>
//   )
// }

// export default ClinicSelection
