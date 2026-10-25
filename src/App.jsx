import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import gsap from 'gsap'

const divisions = [
  {
    id: 'brawl',
    name: 'Brawl Stars',
    short: 'BRAWL',
    tag: 'KORALL BS · KRL',
    type: 'ESPORTS',
    title: <>JUGAMOS<br />PARA <span>GANAR.</span></>,
    description: 'La escena competitiva de Brawl Stars tiene una nueva fuerza. Somos KRL: estrategia, comunidad y talento con hambre de llegar más lejos.',
    image: 'photo-1542751371-adc38448a05e',
    imageAlt: 'Equipo de esports preparado para competir',
    stat: 'TOP 01',
    caption: 'NUESTRO ORIGEN',
    number: '01',
  },
  {
    id: 'futbol',
    name: 'Fútbol',
    short: 'FÚTBOL',
    tag: 'KORALL FC',
    type: 'DEPORTE DE EQUIPO',
    title: <>EL JUEGO<br />NO <span>ESPERA.</span></>,
    description: 'Un equipo se construye en cada entrenamiento. Impulsamos jugadores con visión, disciplina y ambición para competir en serio.',
    image: 'photo-1521412644187-c49fa049e84d',
    imageAlt: 'Partido de fútbol en pleno juego',
    stat: '11 VS 11',
    caption: 'JUEGO COLECTIVO',
    number: '02',
  },
  {
    id: 'futsal',
    name: 'Fútbol sala',
    short: 'FÚTBOL SALA',
    tag: 'KORALL FS',
    type: 'DEPORTE DE EQUIPO',
    title: <>MÁS RÁPIDO.<br /><span>MÁS CERCA.</span></>,
    description: 'Velocidad, lectura y precisión en espacios cortos. Una nueva cancha para quienes convierten cada segundo en una oportunidad.',
    image: 'photo-1517466787929-bc90951d0974',
    imageAlt: 'Futbolistas disputando el balón',
    stat: '5 VS 5',
    caption: 'CADA SEGUNDO CUENTA',
    number: '03',
  },
  {
    id: 'basketball',
    name: 'Baloncesto',
    short: 'BASKET',
    tag: 'KORALL BASKET',
    type: 'DEPORTE DE EQUIPO',
    title: <>SUBE EL<br /><span>NIVEL.</span></>,
    description: 'Talento que se entrena. Equipo que se eleva. Abrimos la cancha a una generación lista para competir y crecer junta.',
    image: 'photo-1546519638-68e109498ffc',
    imageAlt: 'Partido de baloncesto en una cancha',
    stat: '5 VS 5',
    caption: 'TODO EN JUEGO',
    number: '04',
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    short: 'VOLLEY',
    tag: 'KORALL VOLLEY',
    type: 'DEPORTE DE EQUIPO',
    title: <>EL PUNTO<br /><span>ES NUESTRO.</span></>,
    description: 'Confianza en cada pase, potencia en cada salto. Encontramos talento y construimos equipos que se respaldan dentro y fuera de la cancha.',
    image: 'photo-1612872087720-bb876e2e67d1',
    imageAlt: 'Partido de volleyball junto a la red',
    stat: '6 VS 6',
    caption: 'JUGAMOS EN EQUIPO',
    number: '05',
  },
  {
    id: 'chess',
    name: 'Chess',
    short: 'CHESS',
    tag: 'KORALL CHESS',
    type: 'DEPORTE MENTAL',
    title: <>PIENSA<br /><span>DELANTE.</span></>,
    description: 'La competición también se juega en silencio. Estrategia, temple y una comunidad que lleva cada movimiento un paso más allá.',
    image: 'photo-1529699211952-734e80c4d42b',
    imageAlt: 'Tablero de ajedrez listo para jugar',
    stat: '1 JUGADA',
    caption: 'CAMBIA TODO',
    number: '06',
  },
  {
    id: 'running',
    name: 'Running',
    short: 'RUNNING',
    tag: 'KORALL RUN CLUB',
    type: 'RESISTENCIA',
    title: <>SUPERA<br /><span>TU MARCA.</span></>,
    description: 'Cada meta empieza mucho antes de la línea de salida. Entrenamos constancia, comunidad y una ambición que no se mide solo en kilómetros.',
    image: 'photo-1552674605-db6ffd4facb5',
    imageAlt: 'Corredores entrenando juntos en exteriores',
    stat: 'A TU RITMO',
    caption: 'LA SIGUIENTE META',
    number: '07',
  },
  {
    id: 'esports',
    name: 'Otros esports',
    short: 'ESPORTS',
    tag: 'KORALL NEXT',
    type: 'ESPORTS',
    title: <>NUEVO JUEGO.<br /><span>MISMA ACTITUD.</span></>,
    description: 'Brawl Stars es el comienzo. Buscamos jugadores y comunidades con potencial en los títulos que están definiendo la competición.',
    image: 'photo-1542751371-adc38448a05e',
    imageAlt: 'Jugadores de esports en una competición',
    stat: 'NEXT UP',
    caption: 'SIEMPRE EN EXPANSIÓN',
    number: '08',
  },
]

const photoUrl = (id, width = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

function currentDivision() {
  const route = window.location.hash.replace(/^#\/?/, '')
  return divisions.find((division) => division.id === route) ?? divisions[0]
}

function App() {
  const [active, setActive] = useState(currentDivision)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const syncRoute = () => {
      setActive(currentDivision())
      setMenuOpen(false)
    }
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.fromTo('.hero-copy > *', { y: reduceMotion ? 0 : 28, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: reduceMotion ? 0 : 0.8,
        stagger: reduceMotion ? 0 : 0.09,
        ease: 'power3.out',
        clearProps: 'all',
      })
      gsap.fromTo(imageRef.current, { clipPath: 'inset(0 0 100% 0)' }, {
        clipPath: 'inset(0 0 0% 0)',
        duration: reduceMotion ? 0 : 1,
        ease: 'power3.inOut',
        clearProps: 'clipPath',
      })
      gsap.fromTo('.hero-index', { opacity: 0, x: 18 }, {
        opacity: 1,
        x: 0,
        duration: reduceMotion ? 0 : 0.7,
        delay: reduceMotion ? 0 : 0.3,
        ease: 'power2.out',
      })
    }, heroRef)
    return () => context.revert()
  }, [active])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <main ref={heroRef}>
      <header className="site-header">
        <a className="brand" href="#brawl" aria-label="KORALL, inicio">
          <span className="brand-mark">K<span>·</span></span>
          <span className="brand-name">KORALL<span>®</span></span>
        </a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
          <a className="nav-link" href="#brawl" onClick={() => setMenuOpen(false)}>Brawl Stars</a>
          <button className="nav-link nav-button" onClick={() => scrollTo('divisions')}>Disciplinas</button>
          <button className="nav-link nav-button" onClick={() => scrollTo('manifesto')}>El proyecto</button>
        </nav>
        <a className="header-cta" href="mailto:hola@korall.team?subject=Quiero%20unirme%20a%20KORALL">
          ÚNETE AL TEAM <ArrowUpRight size={15} strokeWidth={1.8} />
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> {active.tag} <span className="eyebrow-divider">/</span> {active.type}</div>
          <h1 id="hero-title">{active.title}</h1>
          <p className="hero-description">{active.description}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#divisions">EXPLORAR KORALL <ArrowRight size={16} /></a>
            <a className="text-link" href="mailto:hola@korall.team?subject=Quiero%20formar%20parte%20de%20KORALL">QUIERO COMPETIR <ArrowUpRight size={14} /></a>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true"><span>K</span><span>R</span><span>L</span></div>
            <span>UNA COMUNIDAD.<br /><strong>MUCHAS FORMAS DE COMPETIR.</strong></span>
          </div>
        </div>

        <div className="hero-visual" ref={imageRef}>
          <img src={photoUrl(active.image)} alt={active.imageAlt} fetchPriority="high" />
          <div className="image-grain" />
          <div className="visual-top"><span>KR / {active.number}</span><span>EST. MMXXIV</span></div>
          <div className="visual-stamp" aria-hidden="true"><span>KORALL</span><span>NO LIMITS<br />JUST LEVELS</span><span>◉</span></div>
          <div className="visual-bottom"><div><span className="visual-label">{active.caption}</span><strong>{active.name}</strong></div><span className="visual-stat">{active.stat}</span></div>
          <span className="hero-index">{active.number}<i> / 08</i></span>
        </div>
        <button className="scroll-cue" onClick={() => scrollTo('divisions')} aria-label="Desplazarse a las disciplinas"><ArrowDown size={16} /> <span>BAJA PARA DESCUBRIR</span></button>
        <div className="hero-side-label">COMPETIR <span>·</span> CRECER <span>·</span> TRASCENDER</div>
      </section>

      <div className="ticker" aria-label="Descubre tu siguiente nivel">
        <div className="ticker-track">{Array.from({ length: 4 }, (_, index) => <span key={index}>TALENTO SIN ETIQUETAS <b>✳</b> COMPETIMOS PARA CRECER <b>✳</b> EL SIGUIENTE NIVEL ES TUYO <b>✳</b></span>)}</div>
      </div>

      <section className="division-section section-wrap" id="divisions">
        <div className="section-heading">
          <div><span className="section-kicker">01 / ENCUENTRA TU CANCHA</span><h2>UN TEAM.<br /><span>MUCHOS JUEGOS.</span></h2></div>
          <p>No importa dónde empieza tu competición. Importa hasta dónde quieres llegar. Elige tu disciplina y descubre tu comunidad.</p>
        </div>
        <div className="division-grid">
          {divisions.map((division) => (
            <a className={`division-card ${active.id === division.id ? 'is-active' : ''}`} href={`#${division.id}`} key={division.id} aria-current={active.id === division.id ? 'page' : undefined}>
              <img src={photoUrl(division.image, 640)} alt={division.imageAlt} loading="lazy" />
              <span className="card-number">{division.number}</span>
              <span className="card-content"><span>{division.type}</span><strong>{division.name}</strong></span>
              <span className="card-arrow"><ArrowUpRight size={17} /></span>
            </a>
          ))}
          <a className="division-card more-card" href="mailto:hola@korall.team?subject=Quiero%20proponer%20una%20disciplina">
            <span className="more-symbol">+</span><span className="card-content"><span>EL SIGUIENTE PODRÍAS SER TÚ</span><strong>¿Y TU JUEGO?</strong></span><span className="card-arrow"><ArrowUpRight size={17} /></span>
          </a>
        </div>
        <div className="division-foot"><span>08 DISCIPLINAS Y SEGUIMOS CONTANDO</span><span>¿NO VES LA TUYA? <a href="mailto:hola@korall.team">HABLEMOS <ArrowUpRight size={12} /></a></span></div>
      </section>

      <section className="manifesto" id="manifesto">
        <div className="manifesto-image"><video className="manifesto-video" src="https://videos.pexels.com/video-files/854053/854053-hd_1920_1080_25fps.mp4" poster={photoUrl('photo-1528605248644-14dd04022da1', 1300)} autoPlay muted loop playsInline preload="none" aria-label="Video de stock sobre comunidad y competición" /><span className="manifesto-image-label">NO SE TRATA DE HACERLO SOLO.</span></div>
        <div className="manifesto-copy">
          <span className="section-kicker">02 / MÁS QUE COMPETIR</span>
          <h2>EL TALENTO<br />NO CRECE<br /><span>SOLO.</span></h2>
          <p>KORALL es una comunidad que detecta potencial y lo convierte en camino. Con estructura, visibilidad y respaldo real para que cada persona pueda enfocarse en dar su siguiente paso.</p>
          <div className="manifesto-points"><div><span>01</span><strong>ENCONTRAMOS</strong><p>Buscamos talento donde otros todavía no están mirando.</p></div><div><span>02</span><strong>IMPULSAMOS</strong><p>Conectamos personas con recursos, equipo y oportunidades.</p></div><div><span>03</span><strong>CRECEMOS</strong><p>Celebramos el progreso y competimos para llegar más lejos.</p></div></div>
          <a className="text-link text-link-light" href="mailto:hola@korall.team?subject=Quiero%20conocer%20el%20proyecto">CONOCE EL PROYECTO <ArrowUpRight size={14} /></a>
        </div>
      </section>

      <section className="join-section section-wrap">
        <div className="join-top"><span className="section-kicker">03 / TU SIGUIENTE PASO</span><span className="join-coordinate">40°25'01.3"N<br />3°42'11.2"W</span></div>
        <h2>EL SIGUIENTE<br /><span>NOMBRE EN LA LISTA.</span><br />PUEDE SER EL TUYO.</h2>
        <div className="join-bottom"><p>Si tienes talento, ganas de competir y hambre de crecer, aquí hay un sitio para ti. Cuéntanos qué haces.</p><a className="button button-dark" href="mailto:hola@korall.team?subject=Quiero%20unirme%20a%20KORALL">HABLEMOS <ArrowUpRight size={16} /></a></div>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#brawl"><span className="brand-mark">K<span>·</span></span><span className="brand-name">KORALL<span>®</span></span></a>
        <span className="footer-note">COMPETIR ES SOLO EL PRINCIPIO.</span>
        <div className="footer-links"><a href="mailto:hola@korall.team">CONTACTO <ArrowUpRight size={13} /></a><a href="#brawl">INSTAGRAM <ArrowUpRight size={13} /></a></div>
        <span className="copyright">© KORALL 2025</span>
      </footer>
    </main>
  )
}

export default App