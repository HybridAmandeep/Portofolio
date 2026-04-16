import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'

function App() {
  return (
    <>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <Navbar />
      
      <main>
        <Hero />
        <Experience />
        <Projects />
      </main>

      <footer style={{ 
        borderTop: '1px solid var(--glass-border)', 
        padding: '3rem 2rem', 
        textAlign: 'center',
        marginTop: '6rem',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
            AK<span style={{ color: 'var(--accent-brand)' }}>.</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            &copy; 2026 Amandeep Kumar. Crafted with passion.
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
