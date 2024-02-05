
gsap.registerPlugin(ScrollTrigger);



class App {
  
  constructor() {
    // Initialize arrays of hero images and texts
    this.heroImages = [...document.querySelectorAll('.hero__images img')];
    this.texts = [...document.querySelectorAll('.text__effect')];

    // Initialize and set up the application
    this._initialize();

    // Start rendering loop
    this._render();
  }

  // Method to set initial states for animations
  _setInitialStates() {
    // 1st effect
    // gsap.set('.hero_title span, .text__effect p, .fullwidth-image__text', {
    //   y: 32,
    //   opacity: 0
    // });

    // 2nd effect no text__effect p so the 2nd text is shown
     gsap.set('.hero_title span, .fullwidth-image__text', {
      y: 32,
      opacity: 0
    });

    gsap.set('.hero__images img', {
      opacity: 0,
      y: gsap.utils.random(100, 50)
    });

    gsap.set('.fullwidth-image img', {
      scale: 1.3
    });
  }

  // Method to create Lenis instance
  _createLenis() {
    this.lenis = new Lenis({
      lerp: 0.1
    });
  }

  // Method to create introductory animations
  _createIntro() {
    const tl = gsap.timeline();
     
    tl.to('.hero_title div', {
       opacity: 1 
      }).to('.hero_title span', {
        y: 0,
        opacity: 1,
        ease: 'expo.out',
        duration: 2,
        stagger: 0.02
      })
      .to('.hero__images img', {
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        duration: 2,
        stagger: 0.04
      }, 0.5);
  }

  // Method to create hero section animations
  _createHero() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    this.heroImages.forEach(image => {
      tl.to(image, {
        ease: 'none',
        yPercent: gsap.utils.random(-100, -50)
      }, 0);
    });
  }

  // Method to create text animation on scroll
  // 1st text effect
  // _createTextAnimation() {
    
  //   this.texts.forEach((text, index) => {
  //     const overlay = text.querySelector('.text__overlay');
  //     const content = text.querySelector('p');
      
   
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: '.text-block',
  //       start: 'top center',
  //       end: 'bottom top+=10%',
  //       scrub: true,
  //       markers: true // for debugging
  //     }
  //   });

  //     tl.to(overlay, {
  //       scaleX: 0
  //     }).to(content, { 
  //       y: 0, 
  //       opacity: 1, 
  //       ease: 'expo.out', 
  //       duration: 2, 
  //       delay: () => index * 0.1  
  //     }, 0);
  //   });
  // }

  _createTextAnimation() {
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.text-block',
        start: 'top center',
        end: 'bottom top+=10%',
        scrub: true,
        markers: true // for debugging
      }
    });
    
    this.texts.forEach((text, index) => {
      const overlay = text.querySelector('.text__overlay');
      // const content = text.querySelector('p');
      
      tl.to(overlay, {
        scaleX: 0
      })
    });
  }



  // Method to create pinned section animations
  _createPinnedSection() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.fullwidth-image',
        start: 'top top',
        end: '+=1500', // set the pixel value in the view port
        scrub: true,
        pin: true
      }
    });

    tl.to('.fullwidth-image__overlay', {
      opacity: 0.4
    })
      .to('.fullwidth-image', {
        "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
      }, 0)
      .to('.fullwidth-image img', {
        scale: 1
      }, 0)
      .to('.fullwidth-image__text', {
        y: 0,
        opacity: 1
      }, 0);
  }

  // Render loop method
  _render(time) {
    this.lenis.raf(time);
    requestAnimationFrame(this._render.bind(this));
  }

  // Main initialization method
  _initialize() {
    this._setInitialStates();
    this._createLenis();
    this._createIntro();
    this._createHero();
    this._createTextAnimation();
    this._createPinnedSection();
  }
}

// Initialize the application
new App();
