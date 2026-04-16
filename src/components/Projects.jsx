import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Bot, Monitor, Leaf, Activity, Network } from 'lucide-react';

const projects = [
  {
    title: "PinPal — Real-Time Ride Pooling & Friend Tracking App",
    desc: "Full-stack Android application for real-time ride pooling with live GPS tracking (5-second sync), group location sharing, Firebase notifications, and cloud functions. Follows MVVM architecture with WorkManager scheduling.",
    status: "Current",
    tags: ["Kotlin", "Jetpack Compose", "Firebase", "Google Maps SDK"],
    icon: <Smartphone size={32} className="glow-text-primary" />,
    featured: true
  },
  {
    title: "EcoSense Bot",
    desc: "IoT robot monitoring environmental air conditions with real-time web dashboard and ESP32/ESP8266 sensor integration.",
    tags: ["ESP32", "ESP8266", "IoT"],
    icon: <Bot size={28} className="glow-text-brand" />
  },
  {
    title: "Desk Bot",
    desc: "Smart IoT desktop assistant with time, weather, alarm, and next-day forecast features plus mobile/web connectivity.",
    tags: ["Arduino", "ESP8266", "OLED"],
    icon: <Monitor size={28} style={{ color: 'var(--accent-tertiary)' }} />
  },
  {
    title: "Healthy Leaves Detection",
    desc: "CNN-based plant disease classification model trained on 1000+ images, achieving ~81% accuracy.",
    tags: ["Python", "TensorFlow", "Keras"],
    icon: <Leaf size={28} className="glow-text-brand" />
  },
  {
    title: "Diabetes Prediction System",
    desc: "ML-based diabetes risk predictor with a user-friendly Streamlit web interface.",
    tags: ["Python", "Streamlit", "ML"],
    icon: <Activity size={28} className="glow-text-primary" />
  },
  {
    title: "Network Infrastructure Sim",
    desc: "Multi-campus network simulation with router/switch configuration and IP addressing in Cisco Packet Tracer.",
    tags: ["Cisco PT", "Networking"],
    icon: <Network size={28} style={{ color: 'var(--accent-secondary)' }} />
  }
];

const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginBottom: '4rem', textAlign: 'center' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)' }}>Featured Work</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>A showcase of my recent coding and hardware integration projects.</p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -5, boxShadow: '0 15px 40px rgba(0,240,255,0.15)' }}
              className="glass"
              style={{
                gridColumn: proj.featured ? '1 / -1' : 'auto',
                padding: '2.5rem',
                borderRadius: 'var(--radius-md)',
                position: 'relative',
                overflow: 'hidden',
                border: proj.featured ? '1px solid rgba(0, 240, 255, 0.4)' : '1px solid var(--glass-border)'
              }}
            >
              {proj.featured && (
                <div style={{
                  position: 'absolute', top: '-10%', right: '-5%', width: '150px', height: '150px',
                  background: 'var(--accent-primary)', filter: 'blur(80px)', opacity: 0.4, zIndex: 0
                }} />
              )}
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', display: 'inline-flex' }}>
                    {proj.icon}
                  </div>
                  {proj.status && (
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                      background: 'rgba(61, 255, 160, 0.1)', color: 'var(--accent-brand)',
                      padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(61, 255, 160, 0.3)'
                    }}>{proj.status}</span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.4 }}>{proj.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.7 }}>
                  {proj.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                  {proj.tags.map((tag, idx) => (
                    <span key={idx} style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)',
                      background: 'rgba(0,0,0,0.3)', padding: '5px 12px', borderRadius: '6px',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
