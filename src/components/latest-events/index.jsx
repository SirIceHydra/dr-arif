import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight, FiMapPin, FiCreditCard, FiCalendar, FiUser, FiHeart, FiTarget } from "react-icons/fi";
import { RiStethoscopeLine, RiSurgicalMaskLine } from "react-icons/ri";

import classes from "./latest-events.module.css";

gsap.registerPlugin(ScrollTrigger);

const LatestEventsShow = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const faqs = [
    {
      question: "What conditions does Dr Arif treat?",
      answer: "Dr Arif treats general surgical conditions including hernias (inguinal, ventral, diaphragmatic), gallbladder/biliary disease, emergency abdominal conditions like appendicitis and bowel obstruction, and performs various laparoscopic procedures.",
      Icon: RiStethoscopeLine
    },
    {
      question: "Does Dr Arif perform laparoscopic (keyhole) surgery?",
      answer: "Yes, Dr Arif specialises in laparoscopic surgery. His publicly documented procedures include complex diaphragmatic hernia repair with mesh and biliary stone removal using advanced endoscopic techniques.",
      Icon: RiSurgicalMaskLine
    },
    {
      question: "How do I book an appointment?",
      answer: "You can book an appointment by calling the practice at +27 21 391 0586, contacting Melomed reception at 021 764 7500, or emailing drarif.practice@gmail.com.",
      Icon: FiCalendar
    },
    {
      question: "Does Dr Arif accept medical schemes?",
      answer: "Dr Arif appears on specialist lists used by medical scheme networks including the Discovery Flexicare Specialist Network. Patients should confirm their specific scheme status before booking.",
      Icon: FiCreditCard
    },
    {
      question: "What are the practice locations?",
      answer: "Dr Arif practices at Melomed Tokai (Corner Keysers & Main Road, 4th Floor) and Melomed Mitchells Plain (Symphony Walk, Town Centre, Room 208).",
      Icon: FiMapPin
    },
    {
      question: "What should I expect during a consultation?",
      answer: "During your consultation, Dr Arif will discuss your medical history, perform any necessary examinations, explain your diagnosis and treatment options, and answer all your questions about the proposed procedure.",
      Icon: FiUser
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-heading-anim", {
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
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={classes["latest-show"]} id="faq" ref={sectionRef}>
      <div className={`${classes["latest-show-container"]} container`}>
        <div className={`${classes["heading-wrapper"]} faq-heading-anim`}>
          <div className={classes["content-wrapper"]}>
            <h2 className={classes["content-heading"]}>Frequently Asked Questions</h2>
            <div className={classes["divider"]}></div>
            <p className={classes["content-desc"]}>
              Find answers to common questions about Dr Arif's practice, procedures, 
              and how to book your appointment.
            </p>
          </div>
        </div>

        <div className={classes["faq-wrapper"]}>
          {faqs.map((faq, index) => {
            const IconComponent = faq.Icon;
            return (
              <div 
                key={index} 
                className={classes["faq-card"]}
                ref={el => cardsRef.current[index] = el}
              >
                <h3 className={classes["faq-question"]}>
                  <span className={classes["question-icon"]}>
                    <IconComponent />
                  </span>
                  {faq.question}
                </h3>
                <p className={classes["faq-answer"]}>{faq.answer}</p>
              </div>
            );
          })}
        </div>

        <div className={classes["contact-prompt"]}>
          <p>Still have questions? Don't hesitate to reach out.</p>
          <a href="mailto:drarif.practice@gmail.com" className={classes["contact-link"]}>
            Contact Us <FiArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LatestEventsShow;
