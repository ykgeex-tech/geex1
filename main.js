document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('active');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
        // Close mobile menu if open
        nav.classList.remove('active');
      }
    });
  });

  // Search Tabs Interaction
  const tabs = document.querySelectorAll('.search-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      this.classList.add('active');
    });
  });

  /**
   * Helper function for Accordion behavior
   * @param {NodeList} elements - List of elements to likely behave as accordion
   * @param {boolean} exclusive - If true, only one item can be open at a time
   */
  function setupAccordion(elements, exclusive = true) {
    elements.forEach(item => {
      item.addEventListener('click', function(e) {
        // Prevent event bubbling if clicking nested interactive elements (like links/buttons)
        // unless it's the item itself or a generic container
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
          // allow default action
        } else {
           // Exclusive behavior: Close others
           if (exclusive) {
             elements.forEach(otherItem => {
               if (otherItem !== item && otherItem.id !== item.id) {
                 otherItem.classList.remove('active');
               }
             });
           }
           // Toggle current
           item.classList.toggle('active');
        }
      });
    });
  }

  // Interactive Reason Cards (Accordion Style)
  const reasonCards = document.querySelectorAll('.reason-card');
  setupAccordion(reasonCards, true);

  // Interactive Service Cards (Accordion Style)
  const serviceCards = document.querySelectorAll('.service-card');
  setupAccordion(serviceCards, true);

  // Interactive Flow Steps (Accordion Style)
  const flowSteps = document.querySelectorAll('.flow-step');
  setupAccordion(flowSteps, true);

  // Corporate FAQ Accordion (Accordion Style)
  const faqItems = document.querySelectorAll('.faq-item');
  setupAccordion(faqItems, true);

  // Contact Form Mailto Implementation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get values
      const company = document.getElementById('company-name').value;
      const name = document.getElementById('name').value;
      const tel = document.getElementById('tel').value;
      const email = document.getElementById('email').value;
      const subjectInput = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Construct email content
      const subject = `【HPよりお問い合わせ】${subjectInput} (${name}様)`;
      const body = `
--------------------------------------------------
【会社名】 ${company}
【担当者名】 ${name}
【電話番号】 ${tel}
【メールアドレス】 ${email}
【件名】 ${subjectInput}
--------------------------------------------------

【相談内容】
${message}
      `.trim();

      // Create mailto link
      const mailtoLink = `mailto:yk.geex@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open mailer
      window.location.href = mailtoLink;

      // Optional: Alert to confirm action to user (since mailto can be subtle if no mailer configured)
      // alert('メーラーを起動します。送信ボタンを押して完了させてください。');
    });
  }
});
