## 🌐 Amazon UI Automation Framework 🚀

Welcome to the **Amazon UI Automation Framework**, a powerful end-to-end testing suite built with **Playwright**, **TypeScript**, and **Allure Reports** — tailored for automating and testing various scenarios on [Amazon.com](https://www.amazon.com) 🛒.

---

## ✨ Tech Stack

- ⚡ **Playwright** — Fast and reliable browser automation
- 📘 **TypeScript** — Type-safe, modern JavaScript
- 📊 **Allure Report** — Beautiful test reports
- 🧩 **Page Object Model (POM)** — Scalable & maintainable architecture
- 📂 **Modular Folder Structure** — Clean and well-organized

---
# ▶️ Getting Started
### 📦 Install dependencies
 - ```npm install```
### 🧪 Run all tests
 - ```npx playwright test```
### 📂 Run a specific test file
 - ```npx playwright test tests/login.spec.ts```
### 📊 Generate & View Allure Report
#### 1️⃣ Generate Allure result files:
 - ```npx playwright test --reporter=allure-playwright```
#### 2️⃣ Serve the report in your browser:
 - ```npx allure serve```

### 🔐 Environment Configuration
 - Base URL: https://www.amazon.com
 - You can customize it in src/pages/BasePage.ts.
### Folder Tree
    📦src
    ┣ 📂pages
    ┃ ┣ 📜BasePage.ts
    ┃ ┣ 📜HomePage.ts
    ┃ ┣ 📜LoginPage.ts
    ┃ ┗ 📜ProductPage.ts
    ┣ 📂tests
    ┃ ┣ 📜login.spec.ts
    ┃ ┗ 📜search.spec.ts
    ┣ 📂types
    ┗ 📂utils
    ┃ ┣ 📜browserUtils.ts
    ┃ ┣ 📜helpers.ts
    ┃ ┗ 📜logger.ts
### 📸 Screenshots & Logs
 - 📂 Screenshots are saved under ./screenshots
 - 📂 Execution logs are available in the ./logs folder
 - 📁 Project Structure

### 📃 License
MIT ©OzgeBuyuktorun

### 📌 Author Notes
“Test automation is not just writing scripts.
It’s building trust and quality into your product.” 💎

