# Build Night #1

## Participant Information

- Name: Camilo Alonso Huerta Huerta
- GitHub: https://github.com/CamiloPolit
- LinkedIn: https://www.linkedin.com/in/camilopolit

Welcome to Build Night #1! This repository has been created for you to work on your project.

--

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📄 Datos de Departamentos

El archivo [`src/data/departments.json`](src/data/departments.json) contiene el listado de departamentos de la Facultad de Ingeniería.

### 🛠️ Obtención de los datos

- Los datos fueron extraídos manualmente desde el HTML de un formulario desplegable (`<select>`) utilizado en el portal oficial de la facultad.
- Se mapearon los atributos `value` de cada etiqueta `<option>` al nombre visible del departamento.
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
