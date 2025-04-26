# Build Night #1

## Participant Information

- Name: Camilo Alonso Huerta Huerta
- GitHub: https://github.com/CamiloPolit
- LinkedIn: https://www.linkedin.com/in/camilopolit

Welcome to Build Night #1! This repository has been created for you to work on your project.

--

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Primero, ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Luego, abre [http://localhost:3000](http://localhost:3000) Con tu navegador para ver el resultado.

---

## 📄 Datos de Departamentos

El archivo [`src/data/departments.json`](src/data/departments.json) contiene el listado de departamentos de la Facultad de Ingeniería.

### 🛠️ Obtención de los datos

- Los datos fueron extraídos manualmente desde el HTML de un formulario desplegable (`<select>`) utilizado en el portal oficial de la facultad.
- Se le indicó a un llm que mapee los atributos `value` de cada etiqueta `<option>` al nombre visible del departamento.
- El propósito de este archivo es disponer de un listado estático, confiable y actualizado, evitando la necesidad de consultar fuentes externas en tiempo de ejecución.

### 📂 Ubicación

El archivo se encuentra en:

src/data/departments.json

y puede ser importado directamente donde sea requerido:

```tsx
import departments from "@/data/departments.json";
```

## 🔍 Obtención de cursos desde UCampus

La información de los cursos de la Facultad de Ciencias Físicas y Matemáticas (FCFM) se puede obtener scrapeando el catálogo público de UCampus disponible en:

https://ucampus.uchile.cl/m/fcfm_catalogo/

El sitio permite consultar los cursos filtrando por **semestre** y **departamento**, mediante parámetros en la URL.

### 🛠️ Parámetros relevantes

- `semestre`: Define el período académico. Tiene el formato `AAAA1` o `AAAA2`, donde:

  - `AAAA` es el año (por ejemplo, `2024`).
  - El dígito final indica el semestre:
    - `1`: **Semestre de Otoño** (primer semestre del año).
    - `2`: **Semestre de Primavera** (segundo semestre del año).

- `depto`: Identificador numérico del departamento académico. Corresponde al valor `value` extraído del formulario de selección en UCampus (por ejemplo, `303` para la Escuela de Postgrado).

- `force`: Parámetro opcional que puede forzar la recarga de los datos (por defecto `0`).

### 🧩 Ejemplos de URLs

- **Semestre de Otoño 2024** (primer semestre):

https://ucampus.uchile.cl/m/fcfm_catalogo/?semestre=20241&depto=303&force=0

- **Semestre de Primavera 2024** (segundo semestre):

https://ucampus.uchile.cl/m/fcfm_catalogo/?semestre=20242&depto=303&force=0

### 📋 Observaciones

- Cambiando el valor de `depto`, se pueden consultar los cursos de diferentes departamentos.
- Cambiando el valor de `semestre`, se puede acceder a la oferta académica de distintos años y períodos.

---

# Documentación del Scraper de Catálogo de Cursos UCampus

Este proyecto incluye un script en Python que extrae automáticamente la oferta de cursos de la FCFM en UCampus, para varios semestres y departamentos, y guarda los resultados en archivos JSON organizados.

## 📂 Estructura de carpetas

````text
project-root/
├── scripts/
│   ├── ucampus_scraper.py    # Clase UCampusScraper (fetch + parse)
│   └── fetch_catalog.py      # Runner: itera años/semestres/deptos y guarda JSON
│
├── src/
│   └── data/
│       ├── departments.json  # Mapeo { dept_code: dept_name }
│       └── catalog/          # JSON de salida: un archivo por semestre
│
├── .venv/                    # (opcional) Entorno virtual Python
├── package.json              # npm scripts (incluye “scrape:catalog”)
└── README.md                 # Esta documentación

## 1. Mapeo de Departamentos (`departments.json`)

Ubicación: `src/data/departments.json`

Formato:

```json
{
  "12060003": "AA - Área para el Aprendizaje de la Ingeniería y Ciencias A2IC",
  "3":        "AS - Departamento de Astronomía",
  "5":        "CC - Departamento de Ciencias de la Computación",
  …
  "307":      "QB - Departamento de Ingeniería Química y Biotecnología"
}



````

## 2. Script Principal (`fetch_catalog.py`)

**Ubicación:** `scripts/fetch_catalog.py`

### ¿Qué hace?

- Carga el mapeo de departamentos desde `departments.json`.
- Crea (si no existe) la carpeta de salida `src/data/catalog/`.
- Itera sobre:
  - Los últimos 5 años calendario (incluye el año actual).
  - Dos códigos de semestre:
    - `1` → Otoño (primer semestre)
    - `2` → Primavera (segundo semestre)
  - Todos los departamentos del mapeo.
- Usa la clase `UCampusScraper` para descargar y parsear cada página de catálogo.
- Agrupa los resultados en un diccionario que, por cada `dept_code`, contiene:

  ```json
  {
    "department": "<nombre del depto>",
    "courses": {
      "<course_code>": {
        "name":       "<nombre del curso>",
        "professors": ["Profesor A", "Profesor B", …]
      },
      …
    }
  }
  ```

# 📚 Documentación de Base de Datos

Este proyecto utiliza **Prisma ORM** con **SQLite** para gestionar las entidades y relaciones asociadas al sistema de reseñas de profesores y cursos universitarios.

---

## 🛠 Estructura de la Base de Datos

### Modelos Principales

#### **Professor**

- `id` (`String`): Identificador único del profesor (generado automáticamente).
- `name` (`String`): Nombre del profesor.
- `reviews` (`Review[]`): Lista de reseñas asociadas a este profesor.

#### **Course**

- `id` (`String`): Identificador único del curso (generado automáticamente).
- `code` (`String`): Código del curso (ejemplo: `"CC1002"`).
- `name` (`String`): Nombre oficial del curso.
- `reviews` (`Review[]`): Lista de reseñas asociadas a este curso.

#### **Review**

- `id` (`String`): Identificador único de la reseña.
- `createdAt` (`DateTime`): Fecha en que se creó la reseña.
- **Criterios de evaluación (escala 1-5)**:
  - `clarity`: Claridad al explicar.
  - `knowledge`: Dominio del contenido.
  - `helpfulness`: Disponibilidad para resolver dudas.
  - `difficulty`: Dificultad percibida del curso (1 = muy fácil, 5 = muy difícil).
  - `overall`: Evaluación global del profesor.
- `approximateMedian` (`Int?`): Mediana aproximada de notas reportada por el alumno (escala 1-7) _(opcional)_.
- `comment` (`String?`): Comentario libre del estudiante _(opcional)_.
- `semester` (`String`): Semestre al cual pertenece la reseña (por ejemplo `"20241"` para 2024 Otoño).
- `professorId` (`String`): Relación hacia el profesor evaluado.
- `courseId` (`String`): Relación hacia el curso evaluado.

---

## 🔗 Relaciones entre los modelos

- Un **Professor** puede tener **muchas** reseñas (**Review**).
- Un **Course** puede tener **muchas** reseñas (**Review**).
- Cada **Review** pertenece a **un único Professor** y **un único Course**.

Cada reseña está **ligada a un profesor, a un curso, y a un semestre**.

---

## 🎯 Objetivo de cada criterio de evaluación

- **clarity**: ¿Qué tan claro es el profesor al explicar los contenidos?
- **knowledge**: ¿Qué tanto dominio muestra sobre el tema?
- **helpfulness**: ¿Qué tan disponible está para resolver dudas?
- **difficulty**: ¿Qué tan difícil fueron las evaluaciones con este profesor?
- **overall**: Evaluación global del profesor en su rol docente.
- **approximateMedian**: Valor numérico estimado (1-7) que representa la mediana de notas del curso.
