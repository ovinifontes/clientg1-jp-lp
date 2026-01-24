document.addEventListener("DOMContentLoaded", () => {
    // Função para atualizar URLs dos botões baseado no parâmetro da URL
    function updateButtonUrls() {
      const urlParams = new URLSearchParams(window.location.search);
      const param = urlParams.get('param');
      
      // URLs de destino baseadas no parâmetro
      const urls = {
        '1': 'https://pay.hotmart.com/D103319341G',
        '2': 'https://www.google.com?zx=1763405694246&no_sw_cr=1'
      };
      
      // Se o parâmetro existe e tem uma URL correspondente
      if (param && urls[param]) {
        const targetUrl = urls[param];
        
        // Atualizar os 3 botões
        const btnOffer = document.querySelector('.btn-offer');
        const btnTestimonials = document.querySelector('.btn-testimonials');
        const footerCta = document.querySelector('.footer__cta');
        
        if (btnOffer) {
          btnOffer.href = targetUrl;
        }
        
        if (btnTestimonials) {
          btnTestimonials.href = targetUrl;
        }
        
        if (footerCta) {
          footerCta.href = targetUrl;
        }
      }
    }
    
    // Executar a função ao carregar a página
    updateButtonUrls();
  
    const ctas = document.querySelectorAll('a[href^="#"]');
  
    ctas.forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href")?.slice(1);
        const target = targetId ? document.getElementById(targetId) : null;
  
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          target.addEventListener(
            "blur",
            () => target.removeAttribute("tabindex"),
            { once: true }
          );
        }
      });
    });
  
    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        const faqItem = this.closest('.faq-item');
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
          if (item !== faqItem) {
            item.classList.remove('active');
            const otherQuestion = item.querySelector('.faq-question');
            otherQuestion.setAttribute('aria-expanded', 'false');
          }
        });
        
        // Toggle current FAQ item
        if (isExpanded) {
          faqItem.classList.remove('active');
          this.setAttribute('aria-expanded', 'false');
        } else {
          faqItem.classList.add('active');
          this.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });
  