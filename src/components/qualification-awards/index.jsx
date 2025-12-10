import React, { useRef, useEffect } from "react";
import classes from "./qualification-awards.module.css";
import { 
  FiCheck, 
  FiDroplet,
  FiActivity,
  FiSearch,
  FiFileText,
  FiCrosshair,
  FiZap,
  FiShield
} from "react-icons/fi";
import { RiSurgicalMaskLine, RiFirstAidKitLine, RiHeartPulseLine, RiMicroscopeLine, RiStethoscopeLine, RiKnifeLine } from "react-icons/ri";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QualificationAwards = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const sidebarRef = useRef(null);

  const services = [
    {
      title: "Laparoscopic Hernia Repair",
      description: "Minimally invasive repair for inguinal, ventral, and diaphragmatic hernias with mesh reinforcement.",
      Icon: RiSurgicalMaskLine
    },
    {
      title: "Gallbladder Surgery",
      description: "Laparoscopic cholecystectomy and bile duct stone management using advanced endoscopic techniques.",
      Icon: FiDroplet
    },
    {
      title: "Emergency General Surgery",
      description: "Urgent surgical care for appendicitis, bowel obstruction, perforations, and acute abdominal conditions.",
      Icon: RiFirstAidKitLine
    },
    {
      title: "Diagnostic Laparoscopy",
      description: "Minimally invasive diagnostic and therapeutic laparoscopic explorations for various conditions.",
      Icon: RiMicroscopeLine
    },
    {
      title: "Pre-op & Post-op Care",
      description: "Comprehensive assessment before surgery and thorough follow-up care for optimal recovery.",
      Icon: RiStethoscopeLine
    },
    {
      title: "Soft Tissue Surgery",
      description: "General surgical procedures for various soft tissue conditions and minor surgical interventions.",
      Icon: FiCrosshair
    }
  ];

  const qualifications = [
    "Board-listed General Surgeon",
    "Specialist in Minimally Invasive Surgery",
    "Advanced Laparoscopic Training",
    "Emergency Surgery Certified",
    "Melomed Hospital Accredited",
    "Listed on Discovery/Flexicare Network"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(".qualification-heading-wrapper", {
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

      // Animate service cards with stagger
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Animate sidebar
      gsap.from(sidebarRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sidebarRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={`${classes["qualification-awards"]} container`}
      id="services"
      ref={sectionRef}
    >
      <div className={`${classes["qualification-heading-wrapper"]} qualification-heading-wrapper`}>
        <h1 className={classes["qualification-heading"]}>
          Services & Procedures
        </h1>
        <div className={classes["divider-heading"]}></div>
        <p className={classes["qualification-desc"]}>
          Dr Arif offers a comprehensive range of general surgical services with a focus on 
          minimally invasive techniques that promote faster recovery and reduced hospital stays.
        </p>
      </div>

      <div className={classes["qualification-content"]}>
        <div className={classes["services-grid"]}>
          {services.map((service, index) => {
            const IconComponent = service.Icon;
            return (
              <div 
                key={index} 
                className={classes["service-card"]}
                ref={el => cardsRef.current[index] = el}
              >
                <div className={classes["service-icon"]}>
                  <IconComponent />
                </div>
                <h3 className={classes["service-title"]}>{service.title}</h3>
                <p className={classes["service-desc"]}>{service.description}</p>
              </div>
            );
          })}
        </div>

        <div className={classes["qualifications-sidebar"]} ref={sidebarRef}>
          <div className={classes["qualifications-card"]}>
            <h3 className={classes["qualifications-title"]}>Qualifications & Credentials</h3>
            <ul className={classes["qualifications-list"]}>
              {qualifications.map((qual, index) => (
                <li key={index} className={classes["qualification-item"]}>
                  <FiCheck className={classes["check-icon"]} />
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={classes["cta-card"]}>
            <h4>Need a Consultation?</h4>
            <p>Contact us to schedule an appointment with Dr Arif.</p>
            <a href="tel:+27213910586" className={classes["cta-button"]}>
              Call +27 21 391 0586
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualificationAwards;
