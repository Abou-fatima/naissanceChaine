(function() {
    // ----- ANIMATION AU SCROLL (Intersection Observer) -----
    const animatedElements = document.querySelectorAll('.animate');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionnel : on peut unobserve après l'animation pour économiser les ressources
          // observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => observer.observe(el));
    
    // ----- COMPTEUR ANIMÉ (1.8M) -----
    const counterElement = document.getElementById('counter');
    let counted = false;
    const target = 1800000;
    
    function animateCounter() {
      let current = 0;
      const duration = 2000;
      const stepTime = 10;
      const steps = duration / stepTime;
      const increment = target / steps;
      
      function update() {
        if (current < target) {
          current += increment;
          if (current > target) current = target;
          counterElement.textContent = formatNumber(Math.floor(current));
          requestAnimationFrame(update);
        } else {
          counterElement.textContent = '1.8M';
        }
      }
      requestAnimationFrame(update);
    }
    
    function formatNumber(num) {
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
      if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
      return num;
    }
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          animateCounter();
        }
      });
    }, { threshold: 0.5 });
    
    if (counterElement) counterObserver.observe(counterElement);
    
    // ----- UPLOAD D'IMAGE -----
    const fileInput = document.getElementById('imageUpload');
    const fieldImage = document.getElementById('fieldImage');
    const resetBtn = document.getElementById('resetImageBtn');
    const defaultImageSrc = fieldImage.src;
    
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
          fieldImage.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
    
    resetBtn.addEventListener('click', function() {
      fieldImage.src = defaultImageSrc;
      fileInput.value = '';
    });
    
    fieldImage.onerror = function() {
      if (fieldImage.src !== defaultImageSrc) {
        fieldImage.src = defaultImageSrc;
      }
    };
    
  })();