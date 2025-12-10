import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import classes from "./testimonial.module.css";

import { quotes } from "../../data/quotes";

gsap.registerPlugin(ScrollTrigger);

const Testimonial = () => {
  const [activeDot, setActiveDot] = useState(0);
  const [activeQuote, setActiveQuote] = useState(quotes[0]);
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    setActiveQuote(quotes[activeDot]);
  }, [activeDot]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(quoteRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      statsRef.current.forEach((stat, index) => {
        gsap.from(stat, {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          delay: index * 0.1,
          ease: "back.out(1.7)",
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

  const handleDotClick = (i) => {
    setActiveDot(i);
  };

  return (
    <div className={classes["testimonial"]} id="testimonials" ref={sectionRef}>
      <div className={`${classes["testimonial-container"]} container`}>
        <div className={classes["testimonial-quote"]} ref={quoteRef}>
          <p className={classes["quote-subtitle"]}>
            What Our Patients Say
          </p>
          <h2 className={classes["quote-text"]}>"{activeQuote?.quote}"</h2>

          <div className={classes["quote-author-dots"]}>
            <div className={classes["quote-author"]}>
              <p className={classes["author-name"]}>{activeQuote?.name}</p>
              <p className={classes["author-passion"]}>{activeQuote?.passion}</p>
            </div>

            <div className={classes["quote-dots"]}>
              {quotes.map((_, i) => (
                <div
                  onClick={() => handleDotClick(i)}
                  key={i}
                  className={`${classes["dot"]} ${
                    activeDot === i ? classes["dot-active"] : ""
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className={classes["testimonial-img-parent"]}>
          <div className={classes["stats-grid"]}>
            <div className={classes["stat-card"]} ref={el => statsRef.current[0] = el}>
              <span className={classes["stat-number"]}>500+</span>
              <span className={classes["stat-label"]}>Successful Surgeries</span>
            </div>
            <div className={classes["stat-card"]} ref={el => statsRef.current[1] = el}>
              <span className={classes["stat-number"]}>2</span>
              <span className={classes["stat-label"]}>Hospital Locations</span>
            </div>
            <div className={classes["stat-card"]} ref={el => statsRef.current[2] = el}>
              <span className={classes["stat-number"]}>100%</span>
              <span className={classes["stat-label"]}>Patient Focused</span>
            </div>
            <div className={classes["stat-card"]} ref={el => statsRef.current[3] = el}>
              <span className={classes["stat-number"]}>24/7</span>
              <span className={classes["stat-label"]}>Emergency Care</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
