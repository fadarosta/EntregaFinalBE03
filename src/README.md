# Entrega Final - BackEnd Avanzado 03

API para gestión de adopciones de mascotas.

## Imagen en Docker Hub

La imagen de la app está disponible en:

🔗 [fadarosta/entregafinal-be03](https://hub.docker.com/r/fadarosta/entregafinal-be03)

### Cómo ejecutar la app con Docker

1. Ejecutar **MongoDB localmente** en el puerto `27017`.
2. Ejecutar el contenedor:

```bash
docker run -p 8080:8080 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/petadoption \
  fadarosta/entregafinal-be03