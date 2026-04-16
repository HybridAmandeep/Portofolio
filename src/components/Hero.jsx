import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile.jpg';
import { ChevronDown, GitBranch, Link, Mail } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      paddingTop: '80px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4rem',
          alignItems: 'center'
        }}>
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div 
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-brand)',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                display: 'inline-block',
                padding: '0.4rem 1rem',
                background: 'rgba(61, 255, 160, 0.1)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(61, 255, 160, 0.2)'
              }}
            >
              CSE Student · IoT · Android · Cloud
            </motion.div>
            
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', marginBottom: '1rem', letterSpacing: '-1px' }}>
              <span className="text-gradient">Amandeep</span><br />
              <span className="title-gradient">Kumar.</span>
            </h1>
            
            <p style={{ 
              color: 'var(--text-muted)', 
              fontSize: '1.15rem', 
              maxWidth: '600px',
              marginBottom: '2.5rem',
              lineHeight: 1.8
            }}>
              Computer Science Engineering student bridging hardware and software. 
              Currently building <strong style={{color: 'var(--text-main)'}}>PinPal</strong> — a real-time ride pooling app, 
              while actively contributing to the openSUSE ecosystem.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <a href="#projects" style={{
                background: 'var(--text-main)',
                color: 'var(--bg-base)',
                padding: '12px 28px',
                borderRadius: '30px',
                fontWeight: 600,
                transition: 'transform 0.2s',
                display: 'inline-block'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >View Work
              </a>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <SocialIcon href="https://github.com/HybridAmandeep" icon={<GitBranch size={22} />} />
                <SocialIcon href="https://www.linkedin.com/in/kramandeep" icon={<Link size={22} />} />
                <SocialIcon href="mailto:amandeep3583kr@gmail.com" icon={<Mail size={22} />} />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '450px',
              aspectRatio: '1/1',
            }}>
              {/* Outer glowing rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: '-10px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, transparent 0%, var(--accent-brand) 50%, var(--accent-primary) 100%)',
                  opacity: 0.4, filter: 'blur(10px)'
                }}
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: '-2px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-brand), transparent, var(--accent-primary))',
                }}
              />
              
              <div style={{
                position: 'absolute', inset: '4px',
                backgroundColor: 'var(--bg-base)',
                borderRadius: '50%',
                overflow: 'hidden',
                zIndex: 2,
                border: '4px solid var(--bg-surface)'
              }}>
                <img 
                  src={profileImg} 
                  alt="Amandeep Kumar" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Floating tech badges */}
              <FloatingBadge text="Android" top="10%" left="-10%" delay={0} />
              <FloatingBadge text="IoT Dev" bottom="15%" right="-5%" border="var(--accent-primary)" delay={1.5} />
            </div>
          </motion.div>

        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--text-muted)'
        }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

const SocialIcon = ({ href, icon }) => (
  <a href={href} target="_blank" rel="noreferrer" style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '45px', height: '45px',
    borderRadius: '50%',
    background: 'var(--bg-surface-light)',
    color: 'var(--text-main)',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'all 0.3s'
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.background = 'var(--text-main)';
    e.currentTarget.style.color = 'var(--bg-base)';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.background = 'var(--bg-surface-light)';
    e.currentTarget.style.color = 'var(--text-main)';
  }}
  >
    {icon}
  </a>
);

const FloatingBadge = ({ text, top, left, right, bottom, border = "var(--accent-brand)", delay }) => (
  <motion.div 
    animate={{ y: [0, -15, 0] }}
    transition={{ duration: 4, delay: delay, repeat: Infinity, ease: 'easeInOut' }}
    className="glass"
    style={{
      position: 'absolute', top, left, right, bottom,
      padding: '10px 20px', borderRadius: '30px',
      fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
      color: '#fff', borderLeft: `2px solid ${border}`,
      zIndex: 10, whiteSpace: 'nowrap'
    }}
  >
    {text}
  </motion.div>
);

export default Hero;
