import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/DoctorAbout/TopBar.jsx'
import DoctorInfo from '../components/DoctorAbout/DoctorInfo.jsx'
import Section from '../components/DoctorAbout/Section.jsx'
import ServicesList from '../components/DoctorAbout/ServicesList.jsx'
import { BackButton } from '@vkruglikov/react-telegram-web-app'
import WorkingHours from '../components/Resume/WorkingHours.jsx'
import { useEffect, useState } from 'react'
import { doctorService } from '../services/doctor/doctor.service.js'
import { workingHoursService } from '../services/working-hours/working-hours.service.js'

const About = () => {
  const { doctorId } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [workingHours, setWorkingHours] = useState([])

  const navigate = useNavigate()
  // let navigate = useNavigate()

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const doc = await doctorService.getDoctorById(doctorId)

        const workingHours = await workingHoursService.getWorkingHours(
          doc.data.locationId
        )

        setDoctor(doc.data)
        setWorkingHours(workingHours.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchDoctorInfo()
  }, [doctorId])

  return (
    <>
      <button onClick={() => navigate(-1)}>назад</button>
      <BackButton onClick={() => navigate(-1)} />
      {doctor && (
        <div className="about">
          <header className="header">
            <TopBar title="About" />
            <DoctorInfo
              name={doctor.fullName}
              specialty={doctor.specialty.specialtyName}
              status="Available"
              imageSrc={doctor.photoUrl}
            />
          </header>
          <main className="about__main">
            <Section title="Experience" tag="experience">
              {doctor.experience}
            </Section>
            <Section title="Services" tag="services">
              <ServicesList services={doctor.services} />
            </Section>
            <Section title="Certificates" tag="certificates">
              {doctor.certificates}
            </Section>
            <Section title="Working Time" tag="working-time">
              <WorkingHours hoursArray={workingHours} />
            </Section>
            <Section title="Location" tag="location">
              <div className="location">
                <p className="about__section__title">{doctor.location.name}</p>
                <p className="about__section__text">
                  {doctor.location.address}
                </p>
              </div>
            </Section>
          </main>
        </div>
      )}
    </>
  )
}
export default About
