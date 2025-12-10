import React, { useRef, useEffect } from "react";
import { GoArrowRight } from "react-icons/go";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import classes from "./call-to-action.module.css";
import Button from "../button";

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const sectionRef = useRef(null);
  const mainRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(mainRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          x: 50,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={classes["call-to-action"]} id="contact" ref={sectionRef}>
      <div className={`${classes["call-to-action-container"]} container`}>
        <div className={classes["cta-main"]} ref={mainRef}>
          <h1 className={classes["title"]}>
            Ready to Schedule Your Consultation with Dr Arif?
          </h1>

          <p className={classes["content-desc"]}>
            Whether you need a consultation for a surgical condition or want to discuss 
            your treatment options, Dr Arif's team is here to help. Book your appointment 
            at Melomed Tokai or Mitchells Plain today.
          </p>

          <div className={classes["cta-buttons"]}>
            <Button onClick={() => window.location.href = 'tel:+27213910586'}>
              Book Appointment <GoArrowRight size={"2.4rem"} />
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = 'mailto:drarif.practice@gmail.com'}>
              Send Email
            </Button>
          </div>
        </div>

        <div className={classes["contact-cards"]}>
          <div className={classes["contact-card"]} ref={el => cardsRef.current[0] = el}>
            <FiPhone className={classes["contact-icon"]} />
            <h4>Call Us</h4>
            <a href="tel:+27213910586">+27 21 391 0586</a>
            <a href="tel:0217647500">021 764 7500</a>
          </div>

          <div className={classes["contact-card"]} ref={el => cardsRef.current[1] = el}>
            <FiMail className={classes["contact-icon"]} />
            <h4>Email Us</h4>
            <a href="mailto:drarif.practice@gmail.com">drarif.practice@gmail.com</a>
          </div>

          <div className={classes["contact-card"]} ref={el => cardsRef.current[2] = el}>
            <FiMapPin className={classes["contact-icon"]} />
            <h4>Visit Us</h4>
            <p>Melomed Tokai & Mitchells Plain</p>
            <p>Cape Town, South Africa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
