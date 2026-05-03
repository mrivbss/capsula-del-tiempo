// CONFIGURACIÓN DE SUPABASE
const SUPABASE_URL = 'https://adapsrjjnrvmgoqvfhtl.supabase.co';
const SUPABASE_KEY = 'sb_publishable_XGRETPgpQUcfNaH_Fd6s9Q_kUAGpf2a';
const _db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 1. CARGAR CÁPSULAS DESDE LA DB
async function cargarCapsulas() {
    const { data, error } = await _db
        .from('capsulas')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error al cargar:', error.message);
    } else {
        mostrarCapsulas(data);
    }
}

// 2. GUARDAR NUEVA CÁPSULA
async function guardarCapsula() {
    const t = document.getElementById('titulo').value;
    const m = document.getElementById('mensaje').value;
    const f = document.getElementById('fecha').value;

    if (!t || !m || !f) return alert("Rellena todos los campos, fiera");

    const { error } = await _db
        .from('capsulas')
        .insert([{ 
            "título": t, 
            "mensaje": m, 
            "fecha_desbloqueo": f 
        }]);

    if (error) {
        alert('Error al guardar: ' + error.message);
    } else {
        alert('¡Cápsula enterrada! ⏳');
        // Limpiar formulario
        document.getElementById('titulo').value = '';
        document.getElementById('mensaje').value = '';
        document.getElementById('fecha').value = '';
        cargarCapsulas(); 
    }
}

// 3. MOSTRAR EN EL HTML
function mostrarCapsulas(capsulas) {
    const contenedor = document.getElementById('contenedor-capsulas');
    contenedor.innerHTML = '';
    const ahora = new Date();

    capsulas.forEach(c => {
        const fechaDesbloqueo = new Date(c.fecha_desbloqueo);
        const ahora = new Date();
        const estaBloqueada = fechaDesbloqueo.getTime() > ahora.getTime();

        contenedor.innerHTML += `
            <div class="capsula ${estaBloqueada ? 'bloqueado' : ''}">
                <h3>${c["título"] || c.titulo} ${estaBloqueada ? '🔒' : '🔓'}</h3>
                <p id="texto-${c.id}">
                    ${estaBloqueada ? 'Contenido oculto...' : c.mensaje}
                </p>
                ${estaBloqueada ? `<div class="contador" data-fecha="${c.fecha_desbloqueo}">Cargando...</div>` : ''}
                <small>Creado el: ${new Date(c.created_at).toLocaleDateString()}</small>
            </div>
        `;
    });
}

// 4. LÓGICA DEL CONTADOR (CADA 1 SEGUNDO)
setInterval(() => {
    const ahora = new Date().getTime();
    const contadores = document.querySelectorAll('.contador');

    contadores.forEach(div => {
        const fechaMeta = new Date(div.dataset.fecha).getTime();
        const ahora = new Date().getTime();
        const distancia = fechaMeta - ahora;

        if (distancia < 0) {
            div.innerHTML = "¡LISTO PARA ABRIR! Refresca la página.";
            div.style.color = "#3ecf8e";
            return;
        }

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        div.innerHTML = `Faltan: ${dias}d ${horas}h ${minutos}m ${segundos}s`;
    });
}, 1000);

// INICIAR APP
cargarCapsulas();