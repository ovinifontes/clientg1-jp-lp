// Proteção contra carregamento múltiplo do script
if (window.__scriptGiovanniLoaded) {
    console.warn('Script já foi carregado anteriormente, ignorando...');
} else {
    window.__scriptGiovanniLoaded = true;

// O cliente Supabase é criado diretamente no HTML quando o script carrega
// Não precisa de inicialização complexa aqui

// Tentar salvar no Supabase em background (não bloqueia o fluxo)
async function trySaveToSupabase(nome, telefone) {
    console.log('=== TENTANDO SALVAR NO SUPABASE ===');
    console.log('Dados:', { nome, telefone });
    
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
            .insert([{ nome, telefone }]);
        
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

// Função reutilizável para processar submissão do formulário
function processFormSubmission(nomeElementId, telefoneElementId, formElement) {
    const nome = document.getElementById(nomeElementId);
    const telefone = document.getElementById(telefoneElementId);
    
    if (!nome || !telefone) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }
    
    const nomeValue = nome.value.trim();
    const telefoneValue = telefone.value.trim();
    
    if (!nomeValue || !telefoneValue) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }
    
    // FECHAR MODAL DE FORMULÁRIO (se estiver aberto)
    const formModal = document.getElementById('formModal');
    if (formModal) {
        formModal.classList.remove('active');
    }
    
    // LIMPAR FORMULÁRIO
    if (formElement) {
        formElement.reset();
    }
    
    // ABRIR MODAL DE SUCESSO (sempre funciona)
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.classList.add('active');
    }
    
    // INICIAR COUNTDOWN DE REDIRECIONAMENTO (sempre funciona)
    startRedirectCountdown();
    
    // Tentar salvar no Supabase em background (não bloqueia)
    trySaveToSupabase(nomeValue, telefoneValue);
    
    return true;
}

// Countdown de redirecionamento
function startRedirectCountdown() {
    let seconds = 5;
    const countdownElement = document.getElementById('redirectCountdown');
    const secondsElement = document.getElementById('redirectSeconds');
    const whatsappLink = 'https://chat.whatsapp.com/J401aAtX0LbAFHzxwGbSf7';
    
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
    
    // Aplicar máscara no campo de telefone do modal
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            e.target.value = maskPhone(e.target.value);
        });
    }
    
    // Aplicar máscara no campo de telefone do formulário fixo
    const telefoneInputFixed = document.getElementById('telefoneFixed');
    if (telefoneInputFixed) {
        telefoneInputFixed.addEventListener('input', function(e) {
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
    
    // Submeter formulário do modal - FLUXO SIMPLIFICADO QUE SEMPRE FUNCIONA
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processFormSubmission('nome', 'telefone', leadForm);
        });
    }
    
    // Submeter formulário fixo - FLUXO SIMPLIFICADO QUE SEMPRE FUNCIONA
    const leadFormFixed = document.getElementById('leadFormFixed');
    if (leadFormFixed) {
        leadFormFixed.addEventListener('submit', function(e) {
            e.preventDefault();
            processFormSubmission('nomeFixed', 'telefoneFixed', leadFormFixed);
        });
    }
});

} // Fim da proteção contra carregamento múltiplo
