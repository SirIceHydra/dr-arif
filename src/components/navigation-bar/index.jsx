import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import classes from "./navigation-bar.module.css";

import Logo from "../logo";
import NavigationLinks from "../navigation-links";

const NavigationBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden';
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const mobileNavItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Locations", href: "#locations" },
    { name: "Gallery", href: "#gallery" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className={`${classes["navigation-container"]} ${scrolled ? classes["scrolled"] : ""}`}>
      <div className={`${classes["navigation-bar"]} container`}>
        <Logo />
        <NavigationLinks />
        
        <button 
          className={classes["mobile-menu-btn"]}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${classes["mobile-menu"]} ${mobileMenuOpen ? classes["mobile-menu-open"] : ""}`}>
        <nav className={classes["mobile-nav"]}>
          {mobileNavItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classes["mobile-nav-link"]}
              onClick={closeMobileMenu}
            >
              {item.name}
            </a>
          ))}
          <a 
            href="tel:+27213910586" 
            className={classes["mobile-cta-btn"]}
            onClick={closeMobileMenu}
          >
            Book Appointment
          </a>
        </nav>
      </div>
    </div>
  );
};

export default NavigationBar;
