# Arquitectura de Instruments Manage 
El proyecto se construyo usando la arquitectura de micro-servicos usando 
Spring Boot de base de datos se uso MongoDB

## Database Schema

### Instrumentos DB

### Tags de Instrumentos DB
```json5
{
  TagsCollection: {
    _id: "id",
    tag: "string",
    description: "string",
    instrument: "id",
    unitProcess: "id",
    alarms: {
      HH: "number | nah",
      H: "number | nah",
      L: "number | nah",
      LL: "number | nah"
    },
    shutdown: "boolean"
  }
}
```