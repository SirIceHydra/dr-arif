import React from "react";
import {
  FaFacebook,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";

import classes from "./footer.module.css";

import Logo from "../logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={classes["footer"]}>
      <div className={`${classes["footer-container"]} container`}>
        <div className={classes["footer-brand"]}>
          <Logo variant="light" />
          <p className={classes["brand-desc"]}>
            General & Laparoscopic Surgeon providing compassionate, 
            minimally-invasive surgical care at Melomed Tokai and 
            Mitchells Plain.
          </p>
          <div className={classes["social-links"]}>
            <a href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://wa.me/27213910586" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div className={classes["footer-section"]}>
          <h3 className={classes["heading"]}>Quick Links</h3>
          <ul className={classes["links-list"]}>
            <li><a href="#about">About Dr Arif</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#locations">Locations</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className={classes["footer-section"]}>
          <h3 className={classes["heading"]}>Practice Locations</h3>
          <div className={classes["location-info"]}>
            <div className={classes["location-item"]}>
              <FiMapPin className={classes["location-icon"]} />
              <div>
                <strong>Melomed Tokai</strong>
                <p>Corner Keysers & Main Road, Tokai</p>
                <p>4th Floor (Suite 404/405)</p>
              </div>
            </div>
            <div className={classes["location-item"]}>
              <FiMapPin className={classes["location-icon"]} />
              <div>
                <strong>Melomed Mitchells Plain</strong>
                <p>Symphony Walk, Town Centre</p>
                <p>Annex Building / Room 208</p>
              </div>
            </div>
          </div>
        </div>

        <div className={classes["footer-section"]}>
          <h3 className={classes["heading"]}>Contact Info</h3>
          <div className={classes["contact-info"]}>
            <div className={classes["contact-item"]}>
              <FiPhone className={classes["contact-icon"]} />
              <div>
                <a href="tel:+27213910586">+27 21 391 0586</a>
                <a href="tel:0217647500">021 764 7500</a>
              </div>
            </div>
            <div className={classes["contact-item"]}>
              <FiMail className={classes["contact-icon"]} />
              <a href="mailto:drarif.practice@gmail.com">drarif.practice@gmail.com</a>
            </div>
            <div className={classes["contact-item"]}>
              <FiClock className={classes["contact-icon"]} />
              <div>
                <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
                <p>Emergency: 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={classes["footer-bottom"]}>
        <div className={`${classes["footer-bottom-content"]} container`}>
          <p className={classes["footer-text"]}>
            © {currentYear} Dr Mohammed Arif. All rights reserved.
          </p>
          <p className={classes["footer-disclaimer"]}>
            For medical emergencies, please call hospital emergency services directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
