# Pruebas Automatizadas para HTML Export

Este documento describe las pruebas automatizadas implementadas para verificar el correcto funcionamiento de la API HTML Export.

## Estructura de Pruebas

Se han implementado tres tipos de pruebas:

1. **Pruebas Unitarias para el Servicio**: Verifican el funcionamiento del `PuppeteerService` utilizando mocks para simular las respuestas de Puppeteer.
2. **Pruebas Unitarias para el Controlador**: Verifican que el `PuppeteerController` maneje correctamente las solicitudes y respuestas.
3. **Pruebas de Integración**: Verifican que los endpoints de la API funcionen correctamente en un entorno real.

## Ejecutar las Pruebas

### Pruebas Unitarias

Para ejecutar todas las pruebas unitarias:

```bash
npm run test
```

Para ejecutar las pruebas con cobertura:

```bash
npm run test:cov
```

Para ejecutar las pruebas en modo watch (útil durante el desarrollo):

```bash
npm run test:watch
```

### Pruebas de Integración

Para ejecutar las pruebas de integración:

```bash
npm run test:e2e
```

## Detalles de Implementación

### Mocks Utilizados

Para las pruebas unitarias, se han utilizado mocks para:

- **puppeteer-core**: Simulando el navegador y la página.
- **chrome-aws-lambda**: Simulando la configuración de Chrome.
- **Express Response**: Simulando las respuestas HTTP.

### Consideraciones para las Pruebas de Integración

Las pruebas de integración requieren:

1. Una conexión a Internet activa para acceder a sitios web externos.
2. Tiempos de espera más largos (configurados a 30 segundos) para dar tiempo a la carga de páginas.
3. Pueden ser desactivadas en entornos CI añadiendo `.skip` a los tests que requieren conexión externa.

## Cobertura de Pruebas

Las pruebas cubren los siguientes escenarios:

### Para el Servicio
- Obtención de contenido HTML
- Captura de pantalla con dimensiones predeterminadas
- Captura de pantalla con dimensiones personalizadas

### Para el Controlador
- Manejo de URLs válidas e inválidas
- Manejo de parámetros faltantes
- Manejo de errores del servicio
- Configuración correcta de cabeceras HTTP

### Para los Endpoints
- Respuestas correctas para URLs válidas
- Manejo de errores para URLs inválidas o faltantes
- Verificación de tipos de contenido correctos
- Manejo de parámetros opcionales (ancho y alto para capturas)