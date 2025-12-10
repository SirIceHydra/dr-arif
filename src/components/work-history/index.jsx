import React, { useRef, useEffect } from "react";
import { FiMapPin, FiPhone, FiMail, FiInfo } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import classes from "./work-history.module.css";

gsap.registerPlugin(ScrollTrigger);

const WorkHistory = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const locations = [
    {
      name: "Melomed Tokai",
      address: "Corner Keysers & Main Road, Tokai, Cape Town",
      floor: "4th Floor (Suite 404/405)",
      phone: "021 764 7500",
      isCurrent: true,
      description: "Main practice location for consultations and surgical procedures. Conveniently located in the Southern Suburbs of Cape Town."
    },
    {
      name: "Melomed Mitchells Plain",
      address: "Symphony Walk, Town Centre, Mitchells Plain, Cape Town",
      floor: "Annex Building / Room 208",
      phone: "+27 21 391 0586",
      email: "drarif.practice@gmail.com",
      isCurrent: true,
      description: "Serving the Mitchells Plain community with accessible, quality surgical care and consultations."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".history-heading-anim", {
        y: 50,
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
          y: 80,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`${classes["work-history"]} container`} id="locations" ref={sectionRef}>
      <div className={`${classes["work-his-heading-wrapper"]} history-heading-anim`}>
        <h1 className={classes["history-heading"]}>Practice Locations</h1>
        <div className={classes["divider"]}></div>
        <p className={classes["history-desc"]}>
          Dr Mohammed Arif practices at two convenient Melomed hospital locations 
          in Cape Town, providing accessible surgical care to patients across the region.
        </p>
      </div>

      <div className={classes["work-history-card-wrapper"]}>
        {locations.map((location, index) => (
          <div 
            key={index} 
            className={classes["location-card"]}
            ref={el => cardsRef.current[index] = el}
          >
            <div className={classes["card-header"]}>
              <span className={classes["location-badge"]}>Now Consulting</span>
              <h3 className={classes["location-name"]}>{location.name}</h3>
            </div>
            
            <div className={classes["card-content"]}>
              <div className={classes["info-row"]}>
                <FiMapPin className={classes["info-icon"]} />
                <div>
                  <p className={classes["address"]}>{location.address}</p>
                  <p className={classes["floor"]}>{location.floor}</p>
                </div>
              </div>
              
              <div className={classes["info-row"]}>
                <FiPhone className={classes["info-icon"]} />
                <a href={`tel:${location.phone.replace(/\s/g, '')}`} className={classes["phone"]}>
                  {location.phone}
                </a>
              </div>
              
              {location.email && (
                <div className={classes["info-row"]}>
                  <FiMail className={classes["info-icon"]} />
                  <a href={`mailto:${location.email}`} className={classes["email"]}>
                    {location.email}
                  </a>
                </div>
              )}
              
              <p className={classes["description"]}>{location.description}</p>
            </div>

            <button 
              className={classes["book-btn"]}
              onClick={() => window.location.href = `tel:${location.phone.replace(/\s/g, '')}`}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      <div className={classes["note-wrapper"]}>
        <p className={classes["note"]}>
          <FiInfo className={classes["note-icon"]} />
          <strong>Tip:</strong> Please verify the exact suite/room number with hospital reception when booking your appointment.
        </p>
      </div>
    </div>
  );
};

export default WorkHistory;
