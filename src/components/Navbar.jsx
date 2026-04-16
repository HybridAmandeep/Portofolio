import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, User, Briefcase, Mail, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#hero', icon: <User size={18} /> },
    { label: 'Experience', href: '#experience', icon: <Briefcase size={18} /> },
    { label: 'Projects', href: '#projects', icon: <Code2 size={18} /> },
    { label: 'Contact', href: '#contact', icon: <Mail size={18} /> }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        padding: scrolled ? '15px 0' : '25px 0',
        background: scrolled ? 'var(--bg-surface-light)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: '1.8rem', 
          fontWeight: 700,
          color: 'var(--text-main)',
          textDecoration: 'none'
        }}>
          AK<span style={{ color: 'var(--accent-brand)' }}>.</span>
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'none' }} className="desktop-nav">
           {/* Controlled via CSS later, but let's just do inline standard for now. */}
           <style>{`
             .desktop-nav { display: none; gap: 2rem; align-items: center; }
             .mobile-toggle { display: block; background: none; border: none; color: #fff; cursor: pointer; }
             @media(min-width: 768px) {
               .desktop-nav { display: flex; }
               .mobile-toggle { display: none; }
             }
             .nav-link { 
               display: flex; align-items: center; gap: 0.5rem; 
               color: var(--text-muted); transition: color 0.2s; font-size: 0.95rem; font-weight: 500;
             }
             .nav-link:hover { color: var(--accent-brand); }
             .btn-contact {
               background: rgba(61, 255, 160, 0.1);
               color: var(--accent-brand);
               border: 1px solid var(--accent-brand);
               padding: 8px 20px;
               border-radius: var(--radius-sm);
               transition: all 0.2s;
             }
             .btn-contact:hover {
               background: var(--accent-brand);
               color: var(--bg-base);
               box-shadow: 0 0 15px rgba(61,255,160,0.3);
             }
           `}</style>
          
          {navLinks.map((link) => (
            link.label !== 'Contact' && (
              <a key={link.label} href={link.href} className="nav-link">
                {link.icon} {link.label}
              </a>
            )
          ))}
          <a href="#contact" className="nav-link btn-contact">Let's Talk</a>
        </div>

        <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--bg-surface-light)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--glass-border)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="nav-link" 
                onClick={() => setMobileMenu(false)}
                style={{ padding: '0.5rem 1rem' }}
              >
                {link.icon} {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
