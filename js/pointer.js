// Función mejorada para detectar si es PC
function isPC() {
    // Verificar características de PC vs móvil
    const hasMouse = window.matchMedia('(pointer: fine)').matches;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
    
    // Es PC si tiene mouse Y (no es móvil por pantalla o no tiene touch)
    return hasMouse && (!isMobileScreen || (!hasTouch && !isMobileUA));
}

// Usar así:
document.addEventListener('DOMContentLoaded', function() {
    if (!isPC()) {
        console.log('No es PC - Cursor personalizado desactivado');
        return;
    }
    const cursor = document.getElementById('custom-cursor');
    
    // Aplicar a <html> en lugar de <body>
    document.documentElement.classList.add('js-cursor-active');
    
    let isMouseDown = false;
    const pointerSelectors = 'a, button, .clickable, [role="button"]';
    
    // Mover cursor
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Verificar si el elemento bajo el cursor es clickeable
        const element = document.elementFromPoint(e.clientX, e.clientY);
        const isClickable = element && element.matches(pointerSelectors);
        
        updateCursorImage(isClickable);
    });
    
    function updateCursorImage(isClickable) {
        const basePath = '/assets/elements/';
        let cursorImage = 'sunset_web_elements_025.png';
        
        if (isMouseDown) {
            cursorImage = 'sunset_web_elements_027.png';
        } else if (isClickable) {
            cursorImage = 'sunset_web_elements_026.png';
        }
        
        cursor.style.backgroundImage = `url('${basePath}${cursorImage}')`;
    }
    
    // Eventos de clic
    document.addEventListener('mousedown', function() {
        isMouseDown = true;
        updateCursorImage(false);
    });
    
    document.addEventListener('mouseup', function(e) {
        isMouseDown = false;
        
        // En lugar de updateCursorImage(false), hacer:
        const element = document.elementFromPoint(e.clientX, e.clientY);
        const isClickable = element && (
            element.matches('a, button, .clickable') || 
            element.closest('a, button, .clickable')
        );
        
        updateCursorImage(isClickable);
    });
    
    // Ocultar cursor cuando el mouse sale de la ventana
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });

    // Mostrar cursor cuando el mouse entra a la ventana
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
    // Inicializar posición
    cursor.style.left = '0px';
    cursor.style.top = '0px';
});