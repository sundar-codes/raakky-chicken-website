import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Clock3, MapPin, Menu, Phone, X, Navigation, ShoppingBag, Star } from 'lucide-react'

const address = '81, Thiruvalluvar Nagar, Press Colony, Coimbatore, Veerapandi, Tamil Nadu 641019'
const phone = '+919843599030'
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=The+Raakky+Chicken+81+Thiruvalluvar+Nagar+Press+Colony+Coimbatore'
const mapEmbedUrl = 'https://www.google.com/maps?q=The+Raakky+Chicken,+81+Thiruvalluvar+Nagar,+Press+Colony,+Coimbatore,+Tamil+Nadu+641019&output=embed'
const googleUrl = 'https://share.google/OM1mRey3kexr1j7tc'
const studioUrl = 'https://sdwebstudio.vercel.app'

// Fill these values when the owner confirms the remaining branch details and delivery policy.
const branchCount = 3
const deliveryRadiusKm: number | null = null
const onlineOrderUrl = '' // Add the Raakky Chicken ordering-app URL here when it is ready.

const products = [
  { name: 'Curry cut', detail: 'For everyday cooking', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=900&q=85' },
  { name: 'Boneless', detail: 'Easy to prepare', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=85' },
  { name: 'Drumsticks', detail: 'A versatile favourite', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85' },
  { name: 'Wings', detail: 'For snacks and meals', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=85' },
]

function getShopStatus(now: Date) {
  const parts = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now)
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]))
  const weekday = values.weekday as string
  const minutes = Number(values.hour) * 60 + Number(values.minute)
  const opening = weekday === 'Sunday' ? 4 * 60 : 7 * 60
  const closing = 21 * 60
  const open = minutes >= opening && minutes < closing
  const openingLabel = weekday === 'Sunday' ? '4 AM' : '7 AM'
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  const tomorrowWeekday = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long' }).format(tomorrow)
  const tomorrowOpening = tomorrowWeekday === 'Sunday' ? '4 AM' : '7 AM'
  return {
    open,
    label: open ? 'OPEN NOW' : minutes >= closing ? `CLOSED · OPENS ${tomorrowOpening} TOMORROW` : `CLOSED · OPENS ${openingLabel}`,
    today: `${openingLabel} – 9 PM`,
    weekday,
  }
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  const status = useMemo(() => getShopStatus(now), [now])
  const orderHref = onlineOrderUrl || '#online-order'
  const navLinks = [{ label: 'The shop', href: '#shop' }, { label: 'Chicken cuts', href: '#cuts' }, { label: 'Locations', href: '#locations' }]

  return <main id="top">
    <div className="topline">
      <span>COIMBATORE, TAMIL NADU</span>
      <span className="topline-right"><span className={`live-dot ${status.open ? 'is-open' : ''}`} />{status.label}</span>
    </div>

    <header className="nav wrap">
      <a className="brand" href="#top" aria-label="The Raakky Chicken home">
        <span className="brand-mark">R</span><span>THE RAAKKY<br/><b>CHICKEN</b></span>
      </a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        {navLinks.map(link => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
        <a className="nav-call" href={`tel:${phone}`} aria-label="Call The Raakky Chicken"><Phone size={17}/></a>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <section className="hero wrap" id="shop">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line"/> THE RAAKKY CHICKEN · COIMBATORE</div>
        <h1>CHICKEN FOR<br/>YOUR <em>TABLE.</em></h1>
        <p className="hero-intro">Your neighbourhood chicken shop in Press Colony, with cuts for everyday cooking and family meals.</p>
        <div className="hero-actions">
          <a className="button button-red" href="#locations">FIND A BRANCH <ArrowUpRight size={17}/></a>
          <a className="text-link" href={orderHref} onClick={e => { if (!onlineOrderUrl) { e.preventDefault(); document.getElementById('online-order')?.scrollIntoView({ behavior: 'smooth' }) } }}>ONLINE ORDER <ShoppingBag size={16}/></a>
        </div>
        <div className="hero-proof">
          <div className="rating-stars"><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/></div>
          <div><strong>4.5 / 5</strong><span> · 134 Google reviews</span></div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-image-frame"><img src="/images/storefront.jpg" alt="The Raakky Chicken storefront in Press Colony, Coimbatore"/><div className="image-label"><span>THE SHOP</span><span>PRESS COLONY</span></div></div>
        <div className="hero-stamp"><span>LOCAL SHOP</span><b>RAAKKY</b><span>COIMBATORE</span></div>
      </div>
    </section>

    <section className="shop-summary" aria-label="About the shop">
      <div className="wrap summary-inner">
        <div><span className="section-kicker">WHAT WE DO</span><h2>A chicken shop<br/>close to <em>home.</em></h2></div>
        <p>Visit us for chicken cuts prepared for your kitchen. Choose the cut that suits your meal, or contact the shop to check availability.</p>
        <div className="summary-facts"><div><b>{branchCount}</b><span>branches</span></div><div><b>4.5 ★</b><span>Google rating</span></div></div>
      </div>
    </section>

    <section className="selection wrap" id="cuts">
      <div className="section-heading"><div><span className="section-kicker">FROM OUR COUNTER</span><h2>Chicken <em>cuts.</em></h2></div><p>Some of the cuts available at The Raakky Chicken. Selection may vary by branch and day.</p></div>
      <div className="product-grid">{products.map(product => <article className="product-card" key={product.name}><div className="product-photo"><img src={product.image} alt={`${product.name} chicken cut`} loading="lazy"/></div><div className="product-meta"><div><h3>{product.name}</h3><p>{product.detail}</p></div><ArrowUpRight size={19}/></div></article>)}</div>
    </section>

    <section className="order-band" id="online-order">
      <div className="wrap order-inner">
        <div><span className="section-kicker">ONLINE ORDERING</span><h2>Order online<br/><em>with Raakky.</em></h2><p>Our online ordering destination will be available here. For now, contact your nearest branch to check availability.</p></div>
        {onlineOrderUrl ? <a className="button button-light" href={onlineOrderUrl} target="_blank" rel="noreferrer">ORDER ONLINE <ArrowUpRight size={17}/></a> : <span className="order-status"><ShoppingBag size={17}/> ONLINE ORDERING COMING SOON</span>}
      </div>
    </section>

    <section className="locations wrap" id="locations">
      <div className="locations-heading"><div><span className="section-kicker">VISIT A BRANCH</span><h2>Find <em>Raakky.</em></h2></div><p>Three branches serve customers across the area. Press Colony is the first verified location listed here; the other branch details can be added once confirmed.</p></div>
      <div className="location-layout">
        <div className="branch-card">
          <div className="branch-card-top"><span className="branch-tag">VERIFIED LOCATION</span><span className={`branch-open ${status.open ? 'is-open' : ''}`}>{status.open ? 'OPEN NOW' : 'CLOSED'}</span></div>
          <h3>Press Colony</h3>
          <p className="branch-address">81, Thiruvalluvar Nagar, Press Colony, Coimbatore, Veerapandi, Tamil Nadu 641019</p>
          <div className="branch-meta"><div><Clock3 size={17}/><span><b>{status.today}</b><small>{status.weekday} · India time</small></span></div><a href={`tel:${phone}`} aria-label="Call Press Colony branch"><Phone size={18}/></a></div>
          <a className="button button-red directions-button" href={mapsUrl} target="_blank" rel="noreferrer">GET DIRECTIONS <Navigation size={16}/></a>
          <div className="branch-count-note">{branchCount} branches in total · Additional branch details will be listed here.</div>
        </div>
        <a className="map-panel" href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Open The Raakky Chicken in Google Maps">
          <iframe title="Map showing The Raakky Chicken, Press Colony" src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <span className="map-open-label">OPEN IN GOOGLE MAPS <ArrowUpRight size={16}/></span>
        </a>
      </div>
      <div className="delivery-note"><div className="delivery-icon"><MapPin size={19}/></div><div><b>Delivery area</b><p>{deliveryRadiusKm ? `Delivery available within ${deliveryRadiusKm} km of the selected branch, subject to availability.` : 'Delivery distance is being confirmed with the shop. Please contact your nearest branch to check whether your area is covered.'}</p></div></div>
    </section>

    <footer className="footer">
      <div className="wrap footer-main">
        <a className="brand footer-brand" href="#top"><span className="brand-mark">R</span><span>THE RAAKKY<br/><b>CHICKEN</b></span></a>
        <a className="footer-listing" href={googleUrl} target="_blank" rel="noreferrer">Google Business listing <ArrowUpRight size={14}/></a>
        <a className="studio-mark" href={studioUrl} target="_blank" rel="noreferrer" aria-label="Designed by SD Web Studio"><img src="/images/sd-web-studio.png" alt="SD Web Studio"/><span>WEB STUDIO</span></a>
      </div>
      <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} THE RAAKKY CHICKEN</span><span>COIMBATORE, TAMIL NADU</span></div>
    </footer>
    <a className="mobile-call" href={`tel:${phone}`}><Phone size={17}/> CALL THE SHOP</a>
  </main>
}

export default App
