import './CardWeather'

const CardLoading = ({denied}) => {
  return (
    <article className="weather">
      <h1 className="weather__title">{denied? 'Acceso denegado a ubicacion': 'Loading...' }</h1>
      <h2 className="weather__location">Puedes buscar el nombre de tu ciudad</h2>
      <section className="weather__body">
        <header className="weather__container">
          <img className="weather__img" src={denied? 'denied.png':'/Loading.gif'} alt="" />
        </header>
        <article className="weather__info">
          <h3 className="weather__condition" >----- -----</h3>
          <ul className="weather__list">
            <li className="weather__item"><span className="weather__label">Wind Speed</span><span className="weather__value">---- m/s</span></li>
            <li className="weather__item"><span className="weather__label">Clouds</span><span className="weather__value">--- %</span></li>
            <li className="weather__item"><span className="weather__label">Pressure</span><span className="weather__value">---- hPa</span></li>
          </ul>
        </article>
      </section>
      <h2 className="weather__temp"> ---- °C</h2>
      {/* <button className="weather__btn">{denied? 'Acceso denegado': 'Loading...' }</button> */}
    </article>
  )
}

export default CardLoading