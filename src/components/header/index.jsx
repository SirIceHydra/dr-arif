import classes from "./header.module.css";
import Button from "../button";

const Header = () => {
  return (
    <div className={classes["header-container"]}>
      <header className={`${classes["header"]} container`}>
        <div className={classes["header-content"]}>
          <div>
            <h4 className={classes["header-name"]}>DR. MOHAMMED ARIF</h4>

            <h1 className={classes["header-title"]}>
              General & Laparoscopic Surgeon
            </h1>

            <p className={classes["header-subtitle"]}>
              Melomed Tokai & Mitchells Plain, Cape Town
            </p>
          </div>

          <p className={classes["header-desc"]}>
            Compassionate, minimally-invasive surgical care for hernias, 
            gallbladder & general surgical conditions. Experienced in advanced 
            laparoscopic procedures including complex hernia repairs and 
            bile duct stone removals.
          </p>

          <div className={classes["header-button-wrapper"]}>
            <Button onClick={() => window.location.href = 'tel:+27213910586'}>
              Book an Appointment
            </Button>
            <Button variant="secondary" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
              Learn About Dr. Arif
            </Button>
          </div>
        </div>
        <div className={classes["header-img-parent"]}>
          <img
            src="/hero.jpeg"
            className={classes["header-img"]}
            alt="Dr Mohammed Arif - General Surgeon at Melomed"
          />
        </div>
      </header>
    </div>
  );
};

export default Header;
