// Proteção contra carregamento múltiplo do script
if (window.__scriptGiovanniLoaded) {
    console.warn('Script já foi carregado anteriormente, ignorando...');
} else {
    window.__scriptGiovanniLoaded = true;

// O cliente Supabase é criado diretamente no HTML quando o script carrega
// Não precisa de inicialização complexa aqui

// Tentar salvar no Supabase em background (não bloqueia o fluxo)
async function trySaveToSupabase(nome, email, telefone) {
    console.log('=== TENTANDO SALVAR NO SUPABASE ===');
    console.log('Dados:', { nome, email, telefone });
    
    // Usar o cliente que foi criado no HTML
    const cliente = window.supabaseClient;
    
    console.log('Cliente Supabase disponível?', !!cliente);
    
    if (!cliente) {
        console.log('⚠️ Supabase não disponível, pulando salvamento');
        console.log('window.supabaseClient:', window.supabaseClient);
        return;
    }
    
    try {
        console.log('Enviando dados para Supabase...');
        const { data, error } = await cliente
            .from('interesse_giovanni')
            .insert([{ nome, email, telefone }]);
        
        if (error) {
            console.error('❌ ERRO ao salvar no Supabase:', error);
            console.error('Código:', error.code);
            console.error('Mensagem:', error.message);
            console.error('Detalhes:', error.details);
            return;
        }
        
        console.log('✅✅✅ DADOS SALVOS COM SUCESSO NO SUPABASE!');
        console.log('ID do registro:', data?.[0]?.id);
        console.log('Dados salvos:', data);
    } catch (error) {
        console.error('❌ ERRO ao tentar salvar:', error);
    }
}

// Máscara de telefone brasileira
function maskPhone(value) {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    if (value.length <= 10) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else {
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    }
    return value;
}

// Abrir modal de formulário (função global) - DEFINIDA IMEDIATAMENTE
function openFormModal() {
    const modal = document.getElementById('formModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Fechar modal - DEFINIDA IMEDIATAMENTE
function closeModal() {
    const formModal = document.getElementById('formModal');
    const successModal = document.getElementById('successModal');
    
    if (formModal) formModal.classList.remove('active');
    if (successModal) successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Garantir que funções estejam disponíveis globalmente IMEDIATAMENTE
window.openFormModal = openFormModal;
window.closeModal = closeModal;

// Countdown timer da página - 20/01/2026 às 20h (America/Cuiaba)
function startCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        setTimeout(startCountdown, 100);
        return;
    }
    
    // Definir data alvo: 20 de janeiro de 2026 às 20:00 (horário de Cuiabá - UTC-4)
    const targetDate = new Date('2026-01-20T20:00:00-04:00');
    
    function updateCountdown() {
        const now = new Date();
        const distance = targetDate.getTime() - now.getTime();
        
        if (distance <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Countdown de redirecionamento
function startRedirectCountdown() {
    let seconds = 5;
    const countdownElement = document.getElementById('redirectCountdown');
    const secondsElement = document.getElementById('redirectSeconds');
    const whatsappLink = 'https://chat.whatsapp.com/LbXIDOzWmMGG3civVKxiOb?mode=hqrt1';
    
    if (countdownElement) countdownElement.textContent = seconds;
    if (secondsElement) secondsElement.textContent = seconds;
    
    const interval = setInterval(() => {
        seconds--;
        if (countdownElement) countdownElement.textContent = seconds;
        if (secondsElement) secondsElement.textContent = seconds;
        
        if (seconds <= 0) {
            clearInterval(interval);
            window.location.href = whatsappLink;
        }
    }, 1000);
}

// Inicializar tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // O cliente Supabase é criado diretamente no HTML, não precisa inicializar aqui
    
    // Aplicar máscara no campo de telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            e.target.value = maskPhone(e.target.value);
        });
    }
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(event) {
        const formModal = document.getElementById('formModal');
        const successModal = document.getElementById('successModal');
        
        if (event.target === formModal) {
            closeModal();
        }
        if (event.target === successModal) {
            closeModal();
        }
    });
    
    // Submeter formulário - FLUXO SIMPLIFICADO QUE SEMPRE FUNCIONA
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const telefone = document.getElementById('telefone');
            
            if (!nome || !email || !telefone) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            const nomeValue = nome.value.trim();
            const emailValue = email.value.trim();
            const telefoneValue = telefone.value.trim();
            
            if (!nomeValue || !emailValue || !telefoneValue) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // FECHAR MODAL DE FORMULÁRIO (sempre funciona)
            const formModal = document.getElementById('formModal');
            if (formModal) {
                formModal.classList.remove('active');
            }
            
            // LIMPAR FORMULÁRIO
            leadForm.reset();
            
            // ABRIR MODAL DE SUCESSO (sempre funciona)
            const successModal = document.getElementById('successModal');
            if (successModal) {
                successModal.classList.add('active');
            }
            
            // INICIAR COUNTDOWN DE REDIRECIONAMENTO (sempre funciona)
            startRedirectCountdown();
            
            // Tentar salvar no Supabase em background (não bloqueia)
            trySaveToSupabase(nomeValue, emailValue, telefoneValue);
        });
    }
    
    // Iniciar countdown da página
    startCountdown();
});

// Inicialização alternativa caso o DOMContentLoaded já tenha passado
if (document.readyState !== 'loading') {
    startCountdown();
}

} // Fim da proteção contra carregamento múltiplo
