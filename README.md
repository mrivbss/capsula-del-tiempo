# ⏳ Cápsula del Tiempo Full Stack

Una aplicación web interactiva que permite a los usuarios "enterrar" mensajes o metas para el futuro. Los mensajes permanecen bloqueados y ocultos bajo un efecto de desenfoque (blur) hasta que el temporizador llega a cero.

## 🚀 Demo
Puedes ver la aplicación en vivo aquí: [https://capsula-del-tiempo-ivory.vercel.app/](https://capsula-del-tiempo-ivory.vercel.app/)

## 🛠️ Tecnologías Utilizadas
Este proyecto fue desarrollado utilizando un stack moderno para garantizar persistencia y velocidad:

*   **Frontend:** HTML5, CSS3 (Custom Properties y filtros dinámicos) y JavaScript Vanilla.
*   **Backend:** [Supabase](https://supabase.com/) (PostgreSQL) para la gestión de datos en tiempo real.
*   **Despliegue:** [Vercel](https://vercel.com/) para el hosting y CI/CD.

## 📋 Características
*   **Persistencia Real:** Los mensajes se guardan en una base de datos en la nube, no se borran al recargar la página.
*   **Contador Dinámico:** Lógica de tiempo real que calcula días, horas, minutos y segundos restantes.
*   **Privacidad Visual:** Uso de filtros de CSS para ocultar el contenido de las cápsulas bloqueadas, manteniendo el contador legible para el usuario.
*   **Responsive Design:** Optimizado para ser utilizado tanto en desktop como en dispositivos móviles.

## 🔧 Instalación y Configuración
Si quieres correr este proyecto localmente:

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/mrivbss/capsula-del-tiempo.git](https://github.com/mrivbss/capsula-del-tiempo.git)
