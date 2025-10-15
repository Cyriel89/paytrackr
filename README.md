# PayTrackr 🧾  
**Application de suivi des transactions — Architecture hexagonale & microservices**

---

## 🎯 Objectifs du projet  

Créer une application interne permettant aux équipes d'une entreprise de :  
- Consulter les transactions financières (montant, devise, statut…)  
- Ajouter de nouvelles transactions de manière sécurisée  
- Visualiser des statistiques globales  
- Structurer un socle technique **clair, maintenable et évolutif**

**PayTrackr n’est pas un simple prototype — c’est une base produit prête à évoluer**, pensée pour refléter un environnement réel (authentification, sécurité, documentation, front complet, microservices).

---

## 🛠️ Stack Technique

| Domaine          | Technologies utilisées |
|------------------|------------------------|
| Backend API      | **NestJS**, TypeScript, Prisma |
| Microservice     | **Symfony 7**, PHP      |
| Frontend         | **React**, Vite, TypeScript, TailwindCSS |
| Base de données  | **PostgreSQL**, Docker, Adminer |
| Documentation    | **Swagger (OpenAPI)**   |
| Sécurité         | JWT, Guards, Helmet, ValidationPipe |
| Architecture     | **Hexagonale / Domain Driven Design léger** |

---

## 🧭 Architecture du Projet

paytrackr/
├── infra/ → PostgreSQL + Adminer (Docker)
├── api/ → Backend NestJS (Hexagonale + Prisma)
├── service/ → Microservice Symfony (stats agrégées)
└── web/ → Frontend React (Vite + Tailwind)

---


### 🧱 Principes d’architecture (Backend NestJS)

- **Domain** : Entités & règles métier (indépendant de toute techno)
- **Application** : Use cases (CreateTransaction, ListTransactions…)
- **Infrastructure** : Prisma, connexion DB, repositories
- **Presentation** : Controllers HTTP (REST)

---

## 🔐 Sécurité & Authentification

- **JWT** (JSON Web Tokens)
- **Roles (RBAC)** : `ADMIN`, `ANALYST`, `VIEWER`
- **Guards NestJS** : protection des routes
- **Validation globale** : `ValidationPipe`, sanitisation des inputs
- **Helmet & CORS** (hardening léger production)

---

## 📌 Fonctionnalités principales

| Fonction | Description |
|----------|-------------|
| 🔐 Authentification | Connexion via JWT, rôles utilisateurs |
| 📄 Liste transactions | Consultation sécurisée |
| ➕ Création transaction | Formulaire + validation métier |
| 📊 Statistiques globales | Microservice Symfony (agrégats) |
| 🧭 Front complet | Login, liste, création, logout |

---

## 🧪 Microservice Symfony — Statistiques

GET /stats/summary → {
count: 42,
byStatus: { PAID: 28, PENDING: 10, FAILED: 4 },
byCurrency: { EUR: 30, USD: 12 }
}

Ce service consomme l’API Nest via HTTP → démontre la capacité à intégrer des microservices externes.

---

## 🧱 Roadmap (Lean / produit)

- [x] Authentification JWT
- [x] Architecture hexagonale (backend)
- [x] Transactions CRUD minimal
- [x] Microservice Symfony (stats)
- [x] Front React (login, liste, création)
- [ ] CI/CD GitHub Actions
- [ ] Pagination & filtres avancés
- [ ] Notifications / Emails
- [ ] Monitoring & observabilité

---

## 🚀 Installation & Lancement

### 1️⃣ Clone du projet

```bash
git clone https://github.com/ton-compte/paytrackr.git
cd paytrackr
```

### 2️⃣ Lancement des services Docker (DB + Adminer)

```bash
cd infra
docker-compose up -d
```

### 3️⃣ Backend (NestJS API)

```bash
cd api
npm install
npx prisma migrate dev
npm run start:dev
```
📍 Swagger → http://localhost:3000/api

### 4️⃣ Microservice Symfony

```bash
cd service
composer install
symfony server:start -d    # ou php -S localhost:8000 -t public
```
📍 Santé → http://localhost:8000/health

### 5️⃣ Frontend (React Vite)

```bash
cd web
npm install
npm run dev
```

---

## 🔑 Comptes de test (Seed)

| Rôle    | Email                                                     | Mot de passe |
| ------- | --------------------------------------------------------- | ------------ |
| Admin   | [admin@paytrackr.local](mailto:admin@paytrackr.local)     | Admin!123    |
| Analyst | [analyst@paytrackr.local](mailto:analyst@paytrackr.local) | Analyst!123  |
| Viewer  | [viewer@paytrackr.local](mailto:viewer@paytrackr.local)   | Viewer!123   |

---

## 🎯 Compétences Clés Démontrées

| Domaine       | Compétence démontrée                      |
| ------------- | ----------------------------------------- |
| Architecture  | Hexagonale, découplage Domain/Application |
| Backend       | NestJS, Prisma, JWT, Guards               |
| Frontend      | React TS, Axios, State management basique |
| Sécurité      | Auth, RBAC, Validation, CORS              |
| DevOps        | Docker (Postgres, Adminer)                |
| Documentation | Swagger, OpenAPI                          |
| Tests         | Validation métier & UseCases (Jest)       |
| Intégration   | Microservices (Symfony consommant Nest)   |

---

## 🏷️ Badges

![NestJS](https://img.shields.io/badge/API-NestJS-red)  
![React](https://img.shields.io/badge/Frontend-React-blue)  
![Symfony](https://img.shields.io/badge/Microservice-Symfony-black)  
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma)  
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1)  
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)

---

## ✍️ Auteur

Anthony Carrer
Développeur Fullstack