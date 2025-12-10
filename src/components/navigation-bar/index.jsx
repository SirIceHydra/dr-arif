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

  const handleMobileNavClick = (href) => {
    closeMobileMenu();
    
    if (href === "/") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
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
    <>
      <div className={`${classes["navigation-container"]} ${scrolled ? classes["scrolled"] : ""}`}>
        <div className={`${classes["navigation-bar"]} container`}>
          <Logo />
          <NavigationLinks />
          
          <button 
            className={`${classes["mobile-menu-btn"]} ${mobileMenuOpen ? classes["menu-open"] : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Outside navigation container to cover full viewport */}
      <div className={`${classes["mobile-menu"]} ${mobileMenuOpen ? classes["mobile-menu-open"] : ""}`}>
        <button 
          className={classes["mobile-close-btn"]}
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          <FiX />
        </button>
        <nav className={classes["mobile-nav"]}>
          {mobileNavItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classes["mobile-nav-link"]}
              onClick={(e) => {
                e.preventDefault();
                handleMobileNavClick(item.href);
              }}
            >
              {item.name}
            </a>
          ))}
          <a 
            href="tel:+27213910586" 
            className={classes["mobile-cta-btn"]}
            onClick={(e) => {
              closeMobileMenu();
              // Allow default tel: link behavior
            }}
          >
            Book Appointment
          </a>
        </nav>
      </div>
    </>
  );
};

export default NavigationBar;
