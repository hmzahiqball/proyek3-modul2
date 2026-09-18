document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.getElementById('main-nav');

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  });

  // 2. Dynamic Feature List & 3. Filtering
  const featuresData = [
    { id: 1, title: 'Pembuatan Website Profile', category: 'web', desc: 'Website profesional untuk perusahaan Anda.' },
    { id: 2, title: 'Aplikasi Android', category: 'mobile', desc: 'Aplikasi mobile native yang cepat.' },
    { id: 3, title: 'Desain UI/UX', category: 'design', desc: 'Desain antarmuka menarik dan mudah digunakan.' },
    { id: 4, title: 'Sistem Informasi Web', category: 'web', desc: 'Sistem manajemen data berbasis web.' },
    { id: 5, title: 'Aplikasi iOS', category: 'mobile', desc: 'Aplikasi mobile untuk ekosistem Apple.' },
  ];

  const featuresContainer = document.getElementById('features-container');
  const featuresEmpty = document.getElementById('features-empty');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderFeatures(filter = 'all') {
    featuresContainer.innerHTML = ''; // Safe usage: controlled elements, no user input
    
    const filteredData = filter === 'all' 
      ? featuresData 
      : featuresData.filter(item => item.category === filter);

    if (filteredData.length === 0) {
      featuresContainer.classList.add('hidden');
      featuresEmpty.classList.remove('hidden');
    } else {
      featuresContainer.classList.remove('hidden');
      featuresEmpty.classList.add('hidden');
      
      filteredData.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('feature-card');
        
        const title = document.createElement('h3');
        title.textContent = item.title;
        
        const desc = document.createElement('p');
        desc.textContent = item.desc;
        
        card.appendChild(title);
        card.appendChild(desc);
        featuresContainer.appendChild(card);
      });
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active to clicked
      e.target.classList.add('active');
      
      const filterValue = e.target.getAttribute('data-filter');
      renderFeatures(filterValue);
    });
  });

  renderFeatures(); // Initial render

  // 4. FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const currentlyActive = document.querySelector('.accordion-header[aria-expanded="true"]');
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // Close currently active if it's not the clicked one
      if (currentlyActive && currentlyActive !== header) {
        currentlyActive.setAttribute('aria-expanded', 'false');
        currentlyActive.nextElementSibling.style.maxHeight = null;
      }

      // Toggle clicked item
      header.setAttribute('aria-expanded', !isExpanded);
      const content = header.nextElementSibling;
      if (!isExpanded) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
    });

    // Keyboard support for accessibility
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  // 5. Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.error-msg').forEach(msg => msg.textContent = '');
    formSuccess.classList.add('hidden');
    
    let isValid = true;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    if (nameInput.value.trim() === '') {
      document.getElementById('name-error').textContent = 'Nama harus diisi.';
      isValid = false;
    }
    
    if (emailInput.value.trim() === '') {
      document.getElementById('email-error').textContent = 'Email harus diisi.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      document.getElementById('email-error').textContent = 'Format email tidak valid.';
      isValid = false;
    }
    
    if (messageInput.value.trim() === '') {
      document.getElementById('message-error').textContent = 'Pesan tidak boleh kosong.';
      isValid = false;
    }

    if (isValid) {
      // Simulate successful submission
      formSuccess.classList.remove('hidden');
      contactForm.reset();
    }
  });

  // 6. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 7. Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
      themeToggleBtn.textContent = 'Light Mode';
      themeToggleBtn.setAttribute('aria-label', 'Ganti Tema Terang');
    } else {
      themeToggleBtn.textContent = 'Dark Mode';
      themeToggleBtn.setAttribute('aria-label', 'Ganti Tema Gelap');
    }
  });
});
