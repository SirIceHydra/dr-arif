import React, { useState, useEffect } from "react";
import classes from "./navigation-links.module.css";
import Button from "../button";

const NavigationLinks = () => {
  const [activeLink, setActiveLink] = useState("Home");

  const handleActiveLink = (link) => {
    setActiveLink(link);
  };

  // Update active link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'services', 'locations', 'gallery', 'testimonials', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLink(section.charAt(0).toUpperCase() + section.slice(1));
            return;
          }
        }
      }
      
      if (window.scrollY < 200) {
        setActiveLink("Home");
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Locations", href: "#locations" },
    { name: "Gallery", href: "#gallery" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <div className={classes["nav-links-container"]}>
      <ul className={classes["nav-links-parent"]}>
        {navItems.map((item) => (
          <li key={item.name} className={classes["nav-link-item"]}>
            <a
              href={item.href}
              onClick={() => handleActiveLink(item.name)}
              className={`${classes["nav-link"]} ${
                activeLink === item.name ? classes["active-link"] : ""
              }`}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>

      <div className={classes["divider"]}></div>

      <Button 
        className={classes["contact-btn"]}
        onClick={() => window.location.href = 'tel:+27213910586'}
      >
        Book Appointment
      </Button>
    </div>
  );
};

export default NavigationLinks;
