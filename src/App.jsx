import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion' // Need this for the modal animation
import CharacterShowcase from './CharacterShowcase'
import CyberGridBackground from './components/CyberGridBackground'
import SubscriptionModal from './components/SubscriptionModal' // Import the modal
import mvVideo from './assets/Mvtest.mp4'
import './App.css'

// ... (omitted Scroll logic) ...

// ... (ParticleBackground code removed or kept if you want to keep it as fallback, but for now I will assume we remove it or just don't use it)

function App() {
  const [showSubscribeModal, setShowSubscribeModal] = useState(false) // Modal State

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <CyberGridBackground />
          <div className="vignette"></div>
        </div>

        <div className="hero-content">
          <div className="anniversary-badge slide-down">
            <span className="year">2nd</span>
            <span className="label">Anniversary</span>
          </div>

          <h1 className="hero-title fade-in-up delay-1">
            <span className="gradient-text">World End</span>
            <span className="subtitle">Virtual Project</span>
          </h1>

          <p className="hero-description fade-in-up delay-2">
            Celebrating two years of imagination, creativity, and the virtual frontier.

          </p>

          <div className="hero-cta fade-in-up delay-3">
            <button className="btn btn-primary"><span>Watch Celebration</span></button>
            <button className="btn btn-secondary"><span>Explore Exhibition</span></button>
          </div>
        </div>

        <div className="scroll-indicator fade-in delay-4">
          <div className="mouse"></div>
        </div>
      </section>

      {/* Members Character Showcase */}
      <CharacterShowcase />

      {/* MV Showcase Section */}
      <section className="mv-showcase">
        <div className="container">
          <div className="mv-header">
            <span className="mv-subtitle">Fanmade Music Video</span>
            <h2 className="mv-title">Beyond the World End</h2>
            <p className="mv-description">
              Celebrate our 2nd Anniversary with the brand new fanmade song.
              <br />A story of connection, dreams, and the future we build together.
            </p>
          </div>

          <div className="video-frame-container">
            <div className="video-frame">
              {/* Local Video Player */}
              <video
                width="100%"
                height="100%"
                controls
                poster={mvVideo} // Optional: use the video itself as poster or a separate image if available
                style={{ objectFit: 'cover' }}
              >
                <source src={mvVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            {/* Decorative Cyberpunk Elements around frame */}
            <div className="frame-corner top-left"></div>
            <div className="frame-corner top-right"></div>
            <div className="frame-corner bottom-left"></div>
            <div className="frame-corner bottom-right"></div>
            <div className="frame-glow"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">2</div>
              <div className="stat-label">Years Strong</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Streams</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Community Members</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Memories Created</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Be Part of Our Journey</h2>
          <p>Subscribe and join our growing community for exclusive content and updates</p>
          <div className="cta-buttons">
            <button className="btn btn-primary btn-large" onClick={() => setShowSubscribeModal(true)}>
              Subscribe Now
            </button>
            <button className="btn btn-outline btn-large">Join Discord</button>
          </div>
        </div>
      </section>



      {/* Subscription Modal Rendered Here */}
      <AnimatePresence>
        {showSubscribeModal && <SubscriptionModal onClose={() => setShowSubscribeModal(false)} />}
      </AnimatePresence>
    </div>
  )
}

export default App
