// Proteção contra carregamento múltiplo do script
if (window.__scriptGiovanniLoaded) {
    console.warn('Script já foi carregado anteriormente, ignorando...');
} else {
    window.__scriptGiovanniLoaded = true;

// O cliente Supabase é criado diretamente no HTML quando o script carrega
// Não precisa de inicialização complexa aqui

// ⚠️ CONFIGURAÇÃO: URL do webhook do n8n
const N8N_WEBHOOK_URL = 'https://n8n00-vini-n8n.hq6fn5.easypanel.host/webhook/giovani_captura_bem_vindo';

// Normalizar telefone: remover formatação e deixar apenas números
function normalizePhone(telefone) {
    if (!telefone) return '';
    // Remove todos os caracteres não numéricos
    return telefone.replace(/\D/g, '');
}

// Formatar telefone para webhook: adiciona código do país (55) se não tiver
function formatPhoneForWebhook(telefone) {
    const telefoneNormalizado = normalizePhone(telefone);
    if (!telefoneNormalizado) return '';
    
    // Se já começar com 55, retorna como está
    if (telefoneNormalizado.startsWith('55')) {
        return telefoneNormalizado;
    }
    
    // Caso contrário, adiciona 55 no início
    return '55' + telefoneNormalizado;
}

// Formatar telefone para Supabase: garante formato 55DD9XXXXXXXX
function formatPhoneForSupabase(telefone) {
    // Remove toda formatação, deixando apenas números
    const telefoneNormalizado = normalizePhone(telefone);
    if (!telefoneNormalizado) return '';
    
    let telefoneFormatado = telefoneNormalizado;
    
    // Se já começar com 55, remove para processar o número nacional
    if (telefoneFormatado.startsWith('55')) {
        telefoneFormatado = telefoneFormatado.substring(2);
    }
    
    // Garantir formato: DDD (2 dígitos) + 9 + número (8 dígitos) = 11 dígitos
    // Se tiver 10 dígitos (DD + 8 dígitos - formato antigo), adiciona o 9
    if (telefoneFormatado.length === 10) {
        // Formato antigo: DDD + 8 dígitos -> adiciona 9 após o DDD
        const ddd = telefoneFormatado.substring(0, 2);
        const numero = telefoneFormatado.substring(2);
        telefoneFormatado = ddd + '9' + numero;
    }
    // Se tiver 11 dígitos (DD + 9 + 8 dígitos), está correto
    // Se tiver 9 dígitos (DD + 7 dígitos), pode estar incompleto, mas vamos processar
    // Se tiver menos de 9, pode estar muito incompleto
    
    // Adiciona o código do país 55 no início
    return '55' + telefoneFormatado;
}

// Enviar webhook para o n8n com email e telefone
async function sendWebhookToN8N(email, telefone) {
    try {
        const telefoneFormatado = formatPhoneForWebhook(telefone);
        console.log('=== ENVIANDO WEBHOOK PARA N8N ===');
        console.log('URL:', N8N_WEBHOOK_URL);
        console.log('Dados:', { email, telefone: telefoneFormatado });

        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.trim(),
                telefone: telefoneFormatado
            })
        });

        const responseText = await response.text();
        console.log('Status HTTP:', response.status);
        console.log('Resposta do n8n (texto):', responseText);

        if (!response.ok) {
            // Tentar parsear como JSON se possível para ver o erro detalhado
            let errorDetails = responseText;
            try {
                const errorJson = JSON.parse(responseText);
                errorDetails = JSON.stringify(errorJson, null, 2);
            } catch (e) {
                // Se não for JSON, usar o texto como está
            }
            throw new Error(`Erro HTTP ${response.status}: ${errorDetails}`);
        }

        console.log('✅✅✅ WEBHOOK ENVIADO COM SUCESSO PARA O N8N!');
        
        // Tentar parsear resposta como JSON se possível
        try {
            const responseData = JSON.parse(responseText);
            console.log('Resposta do n8n (JSON):', responseData);
        } catch (e) {
            console.log('Resposta do n8n não é JSON, mas foi enviado com sucesso');
        }

    } catch (error) {
        // Não bloquear o fluxo se o webhook falhar
        console.error('❌ ERRO ao enviar webhook para n8n:', error);
        console.error('Mensagem de erro:', error.message);
        console.error('O formulário continuará normalmente mesmo com erro no webhook');
    }
}

// Tentar salvar no Supabase - agora aguarda o resultado
async function trySaveToSupabase(email, telefone) {
    console.log('=== TENTANDO SALVAR NO SUPABASE ===');
    console.log('Dados:', { email, telefone });
    
    // Usar o cliente que foi criado no HTML
    const cliente = window.supabaseClient;
    
    console.log('Cliente Supabase disponível?', !!cliente);
    
    let clienteFinal = cliente;
    
    if (!clienteFinal) {
        console.log('⚠️ Supabase não disponível, aguardando...');
        console.log('window.supabaseClient:', window.supabaseClient);
        // Aguardar um pouco para garantir que o cliente seja criado
        await new Promise(resolve => setTimeout(resolve, 1000));
        clienteFinal = window.supabaseClient;
        if (!clienteFinal) {
            throw new Error('Supabase não disponível após tentativa');
        }
    }
    
    // Formatar telefone para o formato correto do Supabase: 55DD9XXXXXXXX
    const telefoneFormatado = formatPhoneForSupabase(telefone);
    console.log('Telefone original:', telefone);
    console.log('Telefone formatado para Supabase:', telefoneFormatado);
    
    console.log('Enviando dados para Supabase...');
    const { data, error } = await clienteFinal
        .from('interesse_giovanni')
        .insert([{ email, telefone: telefoneFormatado }]);
    
    if (error) {
        console.error('❌ ERRO ao salvar no Supabase:', error);
        console.error('Código:', error.code);
        console.error('Mensagem:', error.message);
        console.error('Detalhes:', error.details);
        throw error;
    }
    
    console.log('✅✅✅ DADOS SALVOS COM SUCESSO NO SUPABASE!');
    console.log('ID do registro:', data?.[0]?.id);
    console.log('Dados salvos:', data);
    
    return data;
}

// Máscara de telefone brasileira: (DD) D DDDD-DDDD
function maskPhone(value) {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    
    // Se tiver 11 dígitos (DD + 9 + 8 dígitos): (DD) D DDDD-DDDD
    if (value.length === 11) {
        value = value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, '($1) $2 $3-$4');
    }
    // Se tiver 10 dígitos (DD + 8 dígitos - formato antigo): (DD) DDDD-DDDD
    else if (value.length === 10) {
        value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
    }
    // Durante a digitação
    else if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{1})(\d{0,4})(\d{0,4}).*/, '($1) $2 $3-$4');
    }
    else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
    }
    else if (value.length > 0) {
        value = value.replace(/^(\d{0,2}).*/, '($1');
    }
    
    return value.trim();
}

// Scroll suave até o formulário fixo (função global) - DEFINIDA IMEDIATAMENTE
function scrollToForm() {
    const formElement = document.getElementById('topo-form');
    if (formElement) {
        formElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        // Focar no primeiro campo após o scroll
        setTimeout(() => {
            const nomeInput = document.getElementById('nomeFixed');
            if (nomeInput) {
                nomeInput.focus();
            }
        }, 500);
    }
}

// Fechar modal (mantido para compatibilidade com modal de sucesso) - DEFINIDA IMEDIATAMENTE
function closeModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Garantir que funções estejam disponíveis globalmente IMEDIATAMENTE
window.scrollToForm = scrollToForm;
window.closeModal = closeModal;

// Função reutilizável para processar submissão do formulário
async function processFormSubmission(emailElementId, telefoneElementId, formElement) {
    const email = document.getElementById(emailElementId);
    const telefone = document.getElementById(telefoneElementId);
    
    if (!email || !telefone) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }
    
    const emailValue = email.value.trim();
    const telefoneValue = telefone.value.trim();
    
    if (!emailValue || !telefoneValue) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
        alert('Por favor, insira um email válido.');
        return false;
    }
    
    // Desabilitar botão para evitar múltiplos envios
    const submitButton = formElement.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
    }
    
    // Não há mais modal de formulário, apenas o formulário fixo
    
    try {
        // Aguardar salvamento no Supabase antes de redirecionar
        await trySaveToSupabase(emailValue, telefoneValue);
        
        // ✅ NOVO: Enviar webhook para o n8n após salvar no Supabase
        await sendWebhookToN8N(emailValue, telefoneValue);
        
        // Disparar evento de conversão do Meta Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead');
            console.log('✅ Evento Lead disparado no Meta Pixel');
        }
        
        // LIMPAR FORMULÁRIO
        if (formElement) {
            formElement.reset();
        }
        
        // Redirecionar diretamente para o link após salvar no Supabase
        window.location.href = 'https://jornadadaprosperidade.applive.com.br/justintimegiovani/lp';
        
    } catch (error) {
        console.error('Erro ao processar formulário:', error);
        // Mesmo com erro, redirecionar diretamente
        window.location.href = 'https://jornadadaprosperidade.applive.com.br/justintimegiovani/lp';
    }
    
    return true;
}

// Countdown de redirecionamento
function startRedirectCountdown() {
    // Ocultar indicador de carregamento
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
    
    let seconds = 15;
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

// Contador regressivo da live
function startLiveCountdown() {
    // Começar com 1 minuto e 56 segundos (116 segundos no total)
    let totalSeconds = 116; // 1 minuto (60s) + 56 segundos
    
    const hoursElement = document.getElementById('countdown-hours');
    const minutesElement = document.getElementById('countdown-minutes');
    const secondsElement = document.getElementById('countdown-seconds');
    const countdownTitle = document.querySelector('.countdown-title');
    const countdownContainer = document.querySelector('.countdown');
    
    function updateCountdown() {
        if (totalSeconds <= 0) {
            // Quando zerar, mostrar "A LIVE COMEÇOU"
            if (countdownTitle) {
                countdownTitle.textContent = 'A LIVE COMEÇOU';
                countdownTitle.classList.add('live-started');
            }
            if (countdownContainer) {
                countdownContainer.style.display = 'none';
            }
            const countdownWrapper = document.querySelector('.countdown-wrapper');
            if (countdownWrapper) {
                countdownWrapper.classList.add('live-started-wrapper');
            }
            return;
        }
        
        // Calcular horas, minutos e segundos
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        // Atualizar elementos
        if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
        if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
        if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');
        
        totalSeconds--;
    }
    
    // Atualizar imediatamente e depois a cada segundo
    updateCountdown();
    const interval = setInterval(() => {
        updateCountdown();
        if (totalSeconds < 0) {
            clearInterval(interval);
        }
    }, 1000);
}

// Inicializar tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // O cliente Supabase é criado diretamente no HTML, não precisa inicializar aqui
    
    // Iniciar contador regressivo da live
    startLiveCountdown();
    
    // Aplicar máscara no campo de telefone do formulário fixo
    const telefoneInputFixed = document.getElementById('telefoneFixed');
    if (telefoneInputFixed) {
        telefoneInputFixed.addEventListener('input', function(e) {
            e.target.value = maskPhone(e.target.value);
        });
    }
    
    // Fechar modal de sucesso ao clicar fora
    window.addEventListener('click', function(event) {
        const successModal = document.getElementById('successModal');
        if (event.target === successModal) {
            closeModal();
        }
    });
    
    // Submeter formulário fixo - FLUXO SIMPLIFICADO QUE SEMPRE FUNCIONA
    const leadFormFixed = document.getElementById('leadFormFixed');
    if (leadFormFixed) {
        leadFormFixed.addEventListener('submit', function(e) {
            e.preventDefault();
            processFormSubmission('emailFixed', 'telefoneFixed', leadFormFixed);
        });
    }
});

} // Fim da proteção contra carregamento múltiplo
