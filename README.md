
# News App

Aplicación de noticias híbrida desarrollada con **Ionic** y **Angular**, diseñada para mostrar artículos en tiempo real utilizando la **News API**. Compatible con **iOS**, **Android** y **web**, ofrece funcionalidades avanzadas como navegación integrada, filtrado por categoría y desplazamiento infinito. Los usuarios pueden visualizar noticias en formato de tarjeta, abrir artículos completos dentro de la aplicación o en el navegador, filtrar por temas (negocios, tecnología, etc.), y disfrutar de una experiencia continua de contenido gracias al desplazamiento infinito.

Además, permite almacenar favoritos localmente mediante **Ionic Storage**, compartir noticias con la funcionalidad nativa del dispositivo y acceder a ciertos contenidos offline con **Service Workers**. El proyecto integra múltiples tecnologías nativas utilizando **Capacitor**.

## **Componentes y Tecnologías Clave**
- **Ionic Framework:** Componentes de interfaz de usuario y navegación.
- **Angular:** Framework principal para la lógica y estructura de la aplicación.
- **News API:** Fuente de datos de noticias.
- **Capacitor:** Integración nativa para navegadores internos y funciones del dispositivo.
- **Ionic Storage:** Almacenamiento local de favoritos.
- **SCSS:** Estilización global y específica por componente.
- **Service Worker:** Funcionalidad offline.

## **Estructura del Proyecto**
- **src/app:** Componentes, servicios y módulos principales.
- **src/components:** Componentes reutilizables como `ArticleComponent` y `ArticlesComponent`.
- **src/pages:** Páginas y pestañas de la aplicación.
- **src/services:** Servicios para manejo de noticias y almacenamiento local.
- **src/environments:** Configuración de entorno para claves API y producción.
- **android e ios:** Archivos específicos de plataforma.


## **Despliegue**
- **Despliegue:** Utiliza **Firebase Hosting** para la versión web.
- **URL:** https://ionic-news-d2221.web.app/

## **Cómo Ejecutar el Proyecto**

1. **Clonar el repositorio:**  
```bash
   git clone https://github.com/ramon-molinero/news-app.git && cd news-app
```

2. **Instalar dependencias:**  
```bash
   npm install
```

3. **Configurar claves de la API de News:**  
- Edita `src/environments/environment.ts` y `src/environments/environment.prod.ts` con la clave de la API.

4. **Iniciar el servidor de desarrollo:**  
```bash
   ionic serve
```

5. **Construir para móviles:**  
  - **Android**  
```bash
  ionic capacitor build android
```

  - **iOS**  
```bash
  ionic capacitor build ios
```

6. **Sincronizar cambios con Capacitor:**  
```bash
   ionic capacitor sync
```
