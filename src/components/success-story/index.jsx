import React, { useRef, useEffect } from "react";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { FiCheck } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import classes from "./success-story.module.css";

gsap.registerPlugin(ScrollTrigger);

const SuccessStory = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const quoteRef = useRef(null);
  const benefitsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(quoteRef.current, {
        x: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      benefitsRef.current.forEach((item, index) => {
        gsap.from(item, {
          x: -30,
          opacity: 0,
          duration: 0.5,
          delay: 0.3 + index * 0.1,
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

  const benefits = [
    "Smaller incisions & minimal scarring",
    "Faster recovery & shorter hospital stays",
    "Less post-operative pain",
    "Quicker return to normal activities"
  ];

  return (
    <div className={`${classes["success-story"]} container`} ref={sectionRef}>
      <div className={classes["story-content"]} ref={contentRef}>
        <div className="content-wrapper">
          <h2 className={classes["story-content-heading"]}>
            Minimally Invasive Surgical Excellence
          </h2>
          <div className={classes["divider"]}></div>
          <p className={classes["story-content-desc"]}>
            Dr Arif specialises in laparoscopic (keyhole) surgery, offering patients 
            faster recovery times, smaller incisions, and reduced hospital stays 
            compared to traditional open surgery.
          </p>
        </div>

        <div className={classes["benefits-list"]}>
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className={classes["benefit-item"]}
              ref={el => benefitsRef.current[index] = el}
            >
              <span className={classes["benefit-icon"]}>
                <FiCheck />
              </span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={classes["story-quote"]} ref={quoteRef}>
        <BiSolidQuoteAltRight className={classes["quote"]} />

        <p className={classes["quote-text"]}>
          Dr Arif performed a complex laparoscopic diaphragmatic hernia repair with mesh 
          at Melomed. His expertise in minimally invasive techniques has helped countless 
          patients recover faster and return to their daily lives sooner.
        </p>
        
        <div className={classes["quote-footer"]}>
          <span className={classes["quote-source"]}>— Melomed Hospital Case Study</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessStory;
