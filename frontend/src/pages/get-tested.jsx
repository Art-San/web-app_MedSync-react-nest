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

  const fetchAllDiagnostics = async () => {
    try {
      const response = await diagnosticService.getDiagnostics()
      setDiagnosticTypes(response.data)
      setFilteredDiagnosticTypes(response.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllDiagnostics()
  }, [])

  useEffect(() => {
    const searchLower = search.toLowerCase()
    const filtered = diagnosticTypes.filter((type) =>
      type.typeName.toLowerCase().includes(searchLower)
    )
    setFilteredDiagnosticTypes(filtered)
  }, [search, diagnosticTypes])

  return (
    <>
      <BackButton onClick={() => navigate('/')} />
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
// import React, { useEffect, useState } from 'react'
// import {
//   BackButton,
//   useCloudStorage,
//   useHapticFeedback
// } from '@vkruglikov/react-telegram-web-app'
// import { Link, useNavigate } from 'react-router-dom'
// import Header from '../components/Header.jsx'
// import SearchBar from '../components/DoctorsListing/SearchBar.jsx'
// import SpecializationCard from '../components/GetTested/DiagnosticType.jsx'
// import axios from 'axios'
// import storage from '../utils/localStorage.js'
// import { diagnosticService } from '../services/diagnostic/diagnostic.service.js'

// const GetTested = () => {
//   // const storage = useCloudStorage()
//   let navigate = useNavigate()
//   const [search, setSearch] = useState('')
//   const [diagnosticTypes, setDiagnosticTypes] = useState([])
//   console.log(13, 'diagnosticTypes', diagnosticTypes)
//   const [impactOccurred, notificationOccurred, selectionChanged] =
//     useHapticFeedback()

//   const fetchAllDiagnostics = async () => {
//     try {
//       const response = await diagnosticService.getDiagnostics()
//       return response.data
//     } catch (error) {
//       console.error(error.message)
//     }
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       let filteredDiagnosticTypes = await fetchAllDiagnostics()
//       if (search) {
//         const searchLower = search.toLowerCase()
//         filteredDiagnosticTypes = filteredDiagnosticTypes.filter((type) =>
//           type.typeName.toLowerCase().includes(searchLower)
//         )
//       }
//       setDiagnosticTypes(filteredDiagnosticTypes)
//     }

//     fetchData()
//   }, [search])

//   // useEffect(() => {
//   //   axios
//   //     .get(`${import.meta.env.VITE_API_URL}/api/diagnostics/`)
//   //     .then((response) => {
//   //       let filteredDiagnosticTypes = response.data
//   //       if (search) {
//   //         const searchLower = search.toLowerCase()
//   //         filteredDiagnosticTypes = response.data.filter((type) =>
//   //           type.typeName.toLowerCase().includes(searchLower)
//   //         )
//   //       }
//   //       setDiagnosticTypes(filteredDiagnosticTypes)
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error fetching diagnostic types:', error)
//   //     })
//   // }, [search])

//   return (
//     <>
//       <BackButton onClick={() => navigate('/')} />
//       <div className="get-tested">
//         <Header className={'get-tested__header'} title={'Get Tested'} />
//         <SearchBar search={search} setSearch={setSearch} />
//         <main className="get-tested__main">
//           {diagnosticTypes.map((type, index) => (
//             <Link
//               to={`/booking/diagnostics/${type.diagnosticId}`}
//               key={index}
//               className="get-tested__link"
//               onClick={async () => {
//                 await storage.setItem(
//                   'selectedDiagnostic',
//                   JSON.stringify(type)
//                 )
//                 notificationOccurred('success')
//               }}
//             >
//               <SpecializationCard
//                 className="specialization-card"
//                 imgSrc={type.photoUrl}
//                 title={type.typeName}
//                 subtitle={`${type.clinicsCount || 0} Clinics`}
//                 price={type.price}
//               />
//             </Link>
//           ))}
//         </main>
//       </div>
//     </>
//   )
// }

// export default GetTested
