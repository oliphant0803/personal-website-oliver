'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Navigation links - creative narrative style
  const navLinks = [
    { name: 'Publications', url: '/publications' },
    { name: 'CV', url: 'static/uploads/resume.pdf' }
  ];

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logoText}>Oliver Huang</span>
          </Link>
        </div>

        {/* Navigation links */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navLinks.map((link, index) => (
              <li key={link.name} className={styles.navItem}>
                <Link 
                  href={link.url}
                  className={styles.navLink}
                >
                  {link.name}
                </Link>
                {index < navLinks.length - 1 && (
                  <span className={styles.divider}>•</span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
