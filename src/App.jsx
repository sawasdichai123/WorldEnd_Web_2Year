import { useEffect } from 'react'
import CharacterShowcase from './CharacterShowcase'
import CyberGridBackground from './components/CyberGridBackground'
import './App.css'

// ... (omitted Scroll logic) ...

// ... (ParticleBackground code removed or kept if you want to keep it as fallback, but for now I will assume we remove it or just don't use it)

function App() {
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
            <br />
            Presented by VirtUp Entertainment.
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

      {/* Highlights Section */}
      <section className="highlights">
        <div className="container">
          <h2 className="section-title">Anniversary Contents</h2>
          <div className="highlights-grid">
            <div className="highlight-item large">
              <div className="highlight-image placeholder-1"></div>
              <div className="highlight-overlay">
                <h3>World End MV Premiere</h3>
                <p>The definitive musical experience</p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-image placeholder-2"></div>
              <div className="highlight-overlay">
                <h3>Virtual Exhibition</h3>
                <p>Interactive 3D Gallery</p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-image placeholder-3"></div>
              <div className="highlight-overlay">
                <h3>Live Concert</h3>
                <p>Special Anniversary Performance</p>
              </div>
            </div>
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
            <button className="btn btn-primary btn-large">Subscribe Now</button>
            <button className="btn btn-outline btn-large">Join Discord</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>World End</h3>
              <p>Celebrating 2 years of amazing adventures together</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#highlights">Highlights</a></li>
                <li><a href="#community">Community</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Social Media</h4>
              <ul>
                <li><a href="#youtube">YouTube</a></li>
                <li><a href="#twitter">Twitter</a></li>
                <li><a href="#discord">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 World End. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
