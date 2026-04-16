import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import summitImg from '../assets/summit.jpg';

const experiences = [
  {
    role: "Graphic Design & Media Coordinator · Event Manager",
    company: "openSUSE Project — openSUSE.Asia Summit 2025",
    date: "Jul – Sep 2025",
    location: "Faridabad, HR",
    description: [
      "Designed posters, banners, certificates, and promotional creatives.",
      "Maintained consistent visual branding across all event materials.",
      "Served as Event Manager & Host, coordinating sessions."
    ],
    image: summitImg
  },
  {
    role: "Frontend Web Developer",
    company: "Vaishnav Technologies",
    date: "Jun – Aug 2025",
    location: "Remote",
    description: [
      "Developed frontend web pages, improving UI elements and overall layout.",
      "Supported usability testing and iterative design improvements."
    ],
    image: null
  },
  {
    role: "Graphic Designer",
    company: "Dr OP Bhalla Foundation",
    date: "Aug 2024 – Mar 2025",
    location: "Faridabad",
    description: [
      "Designed article layouts and visual creatives for the 'Karmayogi' magazine.",
      "Created posters and publication-ready visuals using Canva & Photoshop."
    ],
    image: null
  }
];

const Experience = () => {
  return (
    <section id="experience" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '50px', height: '2px', background: 'var(--accent-primary)' }}></div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)' }}>Experience</h2>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>My professional journey and community involvement.</p>
        </motion.div>

        <div style={{ position: 'relative', paddingLeft: '20px' }}>
          {/* Vertical Line */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
            background: 'linear-gradient(to bottom, var(--accent-brand), transparent)'
          }}></div>

          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{ position: 'relative', marginBottom: '3rem', paddingLeft: '2rem' }}
            >
              {/* Dot */}
              <div style={{
                position: 'absolute', left: '-27px', top: '10px', width: '16px', height: '16px',
                borderRadius: '50%', background: 'var(--bg-base)', border: '4px solid var(--accent-brand)',
                boxShadow: '0 0 15px rgba(61,255,160,0.5)'
              }}></div>
              
              <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{exp.role}</h3>
                    <h4 style={{ fontSize: '1rem', color: 'var(--accent-primary)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>{exp.company}</h4>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                      <Calendar size={16} /> {exp.date}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                      <MapPin size={16} /> {exp.location}
                    </div>
                  </div>
                </div>

                <ul style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {exp.description.map((item, i) => (
                    <li key={i} style={{ color: 'var(--text-muted)', display: 'flex', gap: '10px' }}>
                      <span style={{ color: 'var(--accent-brand)', flexShrink: 0 }}>▹</span> {item}
                    </li>
                  ))}
                </ul>

                {exp.image && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    style={{ marginTop: '2rem', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--glass-border)' }}
                  >
                    <img src={exp.image} alt={exp.company} style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: '350px' }} />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
