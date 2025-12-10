import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import classes from "./gallery.module.css";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Select 15 unique images from the public/images folder (no duplicates)
  const images = [
    "WhatsApp Image 2025-12-01 at 14.23.08.jpeg",
    "WhatsApp Image 2025-12-01 at 14.23.09.jpeg",
    "WhatsApp Image 2025-12-01 at 14.23.09 (1).jpeg",
    "WhatsApp Image 2025-12-01 at 14.23.10.jpeg",
    "WhatsApp Image 2025-12-01 at 14.23.11.jpeg",
    "WhatsApp Image 2025-12-01 at 14.23.32.jpeg",
    "WhatsApp Image 2025-12-01 at 14.23.33.jpeg",
    "WhatsApp Image 2025-12-01 at 14.23.34.jpeg",
    "WhatsApp Image 2025-12-01 at 14.23.35.jpeg",
    "WhatsApp Image 2025-12-01 at 14.23.36.jpeg",
    "WhatsApp Image 2025-12-01 at 14.23.44.jpeg",
    "WhatsApp Image 2025-12-01 at 14.23.45.jpeg",
    "WhatsApp Image 2025-12-09 at 22.14.46.jpeg",
    "WhatsApp Image 2025-12-09 at 22.14.47.jpeg",
    "WhatsApp Image 2025-12-09 at 22.14.48.jpeg",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-heading-anim", {
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

      const items = galleryRef.current.querySelectorAll(`.${classes["gallery-item"]}`);
      items.forEach((item, index) => {
        gsap.from(item, {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = (imageSrc) => {
    setSelectedImage(imageSrc);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className={classes["gallery-section"]} id="gallery" ref={sectionRef}>
      <div className={`${classes["gallery-container"]} container`}>
        <div className="gallery-heading-anim">
          <h1 className={classes["gallery-heading"]}>Gallery</h1>
          <div className={classes["divider"]}></div>
          <p className={classes["gallery-desc"]}>
            A glimpse into our practice and the care we provide to our patients.
          </p>
        </div>

        <div className={classes["gallery-grid"]} ref={galleryRef}>
          {images.map((image, index) => (
            <div 
              key={`${image}-${index}`} 
              className={classes["gallery-item"]}
              onClick={() => openLightbox(`/images/${image}`)}
            >
              <img 
                src={`/images/${image}`} 
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
              />
              <div className={classes["overlay"]}>
                <span className={classes["view-icon"]}>+</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className={classes["lightbox"]} onClick={closeLightbox}>
          <button className={classes["close-btn"]} onClick={closeLightbox}>
            ×
          </button>
          <img 
            src={selectedImage} 
            alt="Enlarged view" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
