import { BsArrowRight } from "react-icons/bs";

import classes from "./about.module.css";

import Button from "../button";

import featured1 from "../../assets/icons/featured-1.svg";
import featured2 from "../../assets/icons/featured-2.svg";
import featured3 from "../../assets/icons/featured-3.svg";

const About = () => {
  return (
    <div className={classes["about-container"]} id="about">
      <div className={`${classes["about"]} container`}>
        <div className={classes["about-content"]}>
          <div className={classes["about-img-parent"]}>
            <img src="/about.jpeg" alt="Dr Mohammed Arif - General Surgeon" className={classes["about-img"]} />
          </div>

          <div className={classes["about-text-content"]}>
            <h2 className={classes["about-name"]}>About Dr Mohammed Arif</h2>

            <p className={classes["about-desc"]}>
              Dr Mohammed Arif is a board-listed General Surgeon practising in Cape Town 
              at Melomed Tokai and Melomed Mitchells Plain. He specialises in minimally 
              invasive (laparoscopic) surgery and manages both elective and emergency 
              general surgical conditions.
            </p>

            <p className={classes["about-desc"]}>
              Dr Arif has performed advanced laparoscopic procedures including diaphragmatic 
              hernia repair with mesh and complex bile duct stone removals via keyhole 
              techniques. His focus is on delivering safe, evidence-based surgical care 
              with an emphasis on minimally invasive techniques that speed recovery and 
              reduce hospital stays.
            </p>

            <div className={classes["about-btn-wrapper"]}>
              <Button onClick={() => window.location.href = 'mailto:drarif.practice@gmail.com'}>
                Send Message <BsArrowRight />
              </Button>
            </div>
          </div>
        </div>

        <div className={classes["featured-container"]}>
          <p className={classes["featured-heading"]}>Accredited With:</p>

          <div className={classes["featured-wrapper"]}>
            <img src={featured1} alt="Medical accreditation" />
            <img src={featured2} alt="Hospital affiliation" />
            <img src={featured3} alt="Healthcare network" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
