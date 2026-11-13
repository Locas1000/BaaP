# BaaPP WebApp (OviApp) — Portal de Escritorio y Auditoría Multi-Rancho

> **Panel central en la nube para Asociaciones Ganaderas, Técnicos Evaluadores y Productores**  
> **Proyecto Integrador — AgroTech Challenge (TECOWEEK Winter Edition 2026) · UAG**

---

## Descripción

**`BaaPP_webapp`** es la Single Page Application (SPA) de escritorio de la plataforma **BaaPP (OviApp)**. Mientras que los productores y encargados capturan eventos en el corral desde el celular Android con o sin internet, este portal web resuelve las tareas de alta densidad visual y auditoría en computadora para **AGLOT**, **PELIFOLK** y **Dueños de Rancho**.

> **Arquitectura Unificada:** Este portal consume el **mismo Backend API (Kotlin + Spring Boot 3.4) y base de datos PostgreSQL 16** documentados en el repositorio principal **[`BaaPP-app`](https://github.com/Baa-PP/BaaPP-app)**, donde también reside la especificación completa de reglas de negocio, modelo de datos y sincronización offline.

---

## Funcionalidades del Portal Web

1. **Selector de Contexto Multi-Rancho (Vista Asociación y Técnico):**
   * Permite a los superusuarios (`ASSOCIATION_SUPERUSER` y `VET_TECHNICIAN`) consultar el 100% de los ranchos afiliados (ej. *"Los Sauces"*, *"La Curva"*) desde un selector global en la barra superior.
   * Cambiar el rancho activo actualiza el encabezado HTTP `X-Active-Ranch-Id` e invalida/recarga automáticamente las cachés de **TanStack Query** sin cerrar sesión.
2. **Sábana Oficial Virtualizada de 24 Columnas (`A` a `X`):**
   * Tabla de alta densidad compatible con el formato oficial **`SABANA OCT 2026 DORPER.xlsx`** para rebaños de 1,000+ cabezas:
     * **Identificadores (`A–C`):** Folio interno (`A`), ADN (`B`), Chip oficial SINIIGA `484...` (`C`).
     * **Fechas y Edades (`D–G`, `X`):** Fecha de Nacimiento (`D`), Fecha de Destete (`E`), Edad en meses (`F`) y días (`G`) calculada dinámicamente respecto a la fecha de corte (`X`).
     * **Pesos y Mediciones (`H–M`):** Peso Nacimiento (`H`), 120 días (`I`), 150 días (`J`), Evaluación (`K`), Circunferencia Testicular en machos (`L`) y Peso al Destete (`M`).
     * **Genealogía y Fenotipo (`N–W`):** Tipo de Destete (`N`), Padre y Folio UNO Padre (`O–P`), Madre y Folio UNO Madre (`Q–R`), Raza (`S`), Tipo de Parto (`T`: Simple a Quíntuple), Método de Concepción (`U`: `MN`, `IA`, `TE`), Color (`V`) y Sexo (`W`).
   * Importación y descarga directa de archivos `.xlsx` generados en streaming por el backend (`GET /api/v1/reports/sabana`).
3. **Auditoría y Corrección de Nacimientos Bloqueados (Regla de 30 Días):**
   * Interfaz exclusiva para que la Asociación o el Técnico revisen solicitudes de corrección por "error de dedo" una vez cerrado el periodo de 30 días, visualizando la **fotografía de evidencia** almacenada en Amazon S3 y registrando el motivo en la bitácora inmutable (`/api/v1/association/audits`).
4. **Certificado Genealógico Interactivo (Hojas Rosa y Azul):**
   * Renderizado del árbol genealógico de **3 a 4 generaciones** (Padres, Abuelos y Bisabuelos) con **React Flow**, respetando el código oficial de color por sexo (**Rosa** para hembras, **Azul** para machos acompañado de etiquetas explícitas) y la distinción entre **Criador** y **Propietario Actual**.
5. **Analítica Productiva y Simulador de Dietas:**
   * **Tableros ECharts:** Curvas de Ganancia Diaria de Peso (GDP), tasas de mortalidad (meta 2–3%), detección de vientres improductivos para desecho y desglose de costos del ciclo productivo de 275 días (modelo del Mtro. Meléndez).
   * **Simulador Nutricional en Vivo:** Permite evaluar la sustitución de ingredientes (ej. cambiar sorgo por maíz quebrado) en las 5 etapas (*Lactancia, Crecimiento, Desarrollo, Engorda, Mantenimiento*), recalculando al instante el `% de proteína` aportado y el costo por kilo (`$/kg TCO`).

---

## Stack Tecnológico (`BaaPP_webapp`)

| Categoría | Tecnología | Propósito en el Portal |
| :--- | :--- | :--- |
| **Core & Build** | **React 19 + TypeScript + Vite** | SPA tipada de compilación rápida para escritorio. |
| **Data Grid** | **TanStack Table (v8) + TanStack Virtual** | Renderizado virtualizado a 60 FPS de las 24 columnas de la Sábana para 1,000+ ovinos. |
| **Estado y Caché Remota** | **TanStack Query + Zustand** | Sincronización con el API REST Spring Boot y gestión del contexto activo (`X-Active-Ranch-Id`). |
| **Visualización y Genealogía** | **Apache ECharts + React Flow** | Curvas productivas/financieras del ciclo de 275 días y árbol genealógico interactivo de 4 generaciones. |
| **UI & Estilos** | **Tailwind CSS + shadcn/ui** | Componentes accesibles de alto contraste con diferenciación visual Rosa/Azul y etiquetas claras. |
| **Hosting & CI/CD** | **AWS Amplify Hosting (CloudFront CDN)** | Despliegue continuo sin Docker (`npm run build`) conectado a la rama de GitHub dentro del AWS Free Tier. |

---

## Estructura Sugerida del Repositorio

```text
BaaPP_webapp/
├── src/
│   ├── api/                        # Cliente HTTP (Axios/Fetch) con inyección de JWT y X-Active-Ranch-Id
│   ├── store/                      # Estado global en Zustand (useRanchContextStore, sesión y permisos)
│   ├── features/
│   │   ├── sabana/                 # Tabla virtualizada de 24 columnas (A-X) e importación/exportación .xlsx
│   │   ├── animals/                # Ficha individual (Reseña), pesajes, sanidad y evaluación materna
│   │   ├── pedigree/               # Árbol genealógico de 4 generaciones en React Flow (certificados Rosa/Azul)
│   │   ├── birth-audits/           # Panel de Asociación/Técnico para corrección auditada de nacimientos con foto
│   │   ├── nutrition-simulator/    # Calculador de dietas (5 etapas) y simulador de sustitución de granos
│   │   └── analytics/              # Indicadores zootécnicos y proyección financiera en Apache ECharts
│   ├── components/ui/              # Componentes base reutilizables (shadcn/ui)
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```

---

## Equipo de Desarrollo

* **[Lucas Patrick Castineiras]** — Ingeniería de Software (5.º Semestre) · [GitHub](https://github.com/Locas1000)
* **[Carlo Virgilio Buelna]** — Ingeniería de Software (5.º Semestre) · [GitHub](https://github.com/carlovirgil)
* **[Carlos Abdel Parra Oliva]** — Ingeniería de Software (3.º Semestre) · [GitHub](https://github.com/0Chuck)
* **[César Conrado González Muñoz]** — Ingeniería de Software (3.º Semestre) · [GitHub](https://github.com/)
* **[Santiago Orozco Reynosa]** — Ingeniería de Software (3.º Semestre) · [GitHub](https://github.com/)
* **[Jonathan Enciso Jiménez]** — Ingeniería en Inteligencia Artificial (3.º Semestre) · [GitHub](https://github.com/Purpleskull3747)
