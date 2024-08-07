const Nav = ({ specialties, selectedSpecialty, onSpecialtyClick }) => {
  const handleClick = (specialtyId) => {
    if (specialtyId === selectedSpecialty) {
      // reset selected specialty
      specialtyId = null
    }
    onSpecialtyClick(specialtyId)
  }

  return (
    <div className="nav">
      <ul className="nav__list">
        {specialties.map((specialty) => (
          <li className="nav__item" key={specialty.specialtyId}>
            <button
              className={`nav__button button ${
                selectedSpecialty === specialty.specialtyId
                  ? 'nav__button--active'
                  : ''
              }`}
              onClick={() => handleClick(specialty.specialtyId)}
            >
              {specialty.specialtyName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Nav
