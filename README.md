# Wordmaster – SRS Vocabulary Builder 🧠

[![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-Available-blue?logo=google-chrome)](https://chromewebstore.google.com/detail/wordmaster-i%CC%87lk-1000-keli/pikeecfbmfendjkpgjdkepejoepdfajf)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

[**🇹🇷 Türkçe**](#proje-özeti) | [**🇬🇧 English**](#project-overview) | [**🇹🇷 Ekran Görüntüleri**](#ekran-görüntüleri) | [**🇬🇧 Screenshoots**](#screenshoots)

---

## Proje Özeti
**Wordmaster – Loruv**, kullanıcıların internette gezinirken İngilizce kelime dağarcıklarını geliştirmelerini sağlayan, bilimsel **Aralıklı Tekrar Sistemi (SRS)** tabanlı modern bir Google Chrome eklentisidir. Kullanıcıların unutma eğrisini aşarak kelimeleri kısa süreli hafızadan uzun süreli hafızaya aktarmalarını hedefler.

🔗 **Google Web Store İndirme Linki:** [Google Web Store](https://go.emrecb.com/wordmaster-ingilizce-1000-kelime-web-store)

### 🎯 Problem ve Çözüm
Dil öğrenenlerin en büyük sorunu, öğrenilen kelimelerin tekrar edilmediği için kısa sürede unutulmasıdır.
**Çözüm:** Wordmaster, tarayıcıya entegre çalışarak kullanıcıyı rahatsız etmeden, doğru zamanda doğru kelimeyi hatırlatan akıllı bir algoritma sunar. “Mikro öğrenme” yöntemiyle öğrenme sürecini gün içine yayar.

### 🚀 Temel Özellikler

#### 🧠 Bilimsel SRS Algoritması
* “Öğrendim” işaretlenen kelimeyi silmez.
* 10 dakika, 1 gün, 3 gün gibi artan aralıklarla tekrar sorarak kalıcı öğrenme sağlar.

#### ✍️ Kişiselleştirilebilir İçerik
* Kullanıcılar sadece hazır listelere (En çok kullanılan 1000 kelime) bağlı kalmaz.
* Kendi kelimelerini, çevirilerini ve örnek cümlelerini veritabanına ekleyebilir.

#### 💾 Kalıcı Veri Yönetimi (Persistence)
* Eklenti kapatılıp açılsa veya tarayıcı yeniden başlatılsa bile ekrandaki kelime ve kullanıcının ilerlemesi kaybolmaz (`chrome.storage` API).

#### 📊 Gelişmiş Raporlama ve Dışa Aktarma
* Kategori bazlı başarı oranlarını grafiksel olarak sunar.
* Tüm veriyi **Excel (.csv)** formatında dışa aktarma (export) imkanı verir.

#### 🌍 Erişilebilirlik ve Tasarım
* **Çok Dilli:** Türkçe ve İngilizce arayüz desteği.
* **Sesli Okuma (TTS):** Kelimelerin doğru telaffuzunu dinleme imkanı.
* **Modern UI:** Göz yormayan “Midnight Blue” temalı, kullanıcı deneyimi odaklı arayüz.

### 💻 Kullanılan Teknolojiler
* **JavaScript (ES6+):** Asenkron veri yönetimi ve SRS algoritma mantığı.
* **Chrome Extension API (Manifest V3):** `storage`, `tts`, `i18n` ve `background service workers`.
* **CSS3:** Modern değişkenler, Flexbox/Grid ve responsive tasarım.
* **HTML5:** Semantik yapı.

---

<a name="project-overview"></a>
## Project Overview
**Wordmaster – Loruv** is a modern Google Chrome extension designed to help users master English vocabulary using the scientific **Spaced Repetition System (SRS)**. It integrates seamlessly into the browser environment, allowing users to convert passive browsing time into active learning sessions.

🔗 **Google Web Store Download Link:** [Google Web Store](https://go.emrecb.com/wordmaster-english-1000-word-web-store)

### 🎯 The Challenge & Solution
The biggest hurdle in language acquisition is the “Forgetting Curve.” Words learned today are often forgotten within days if not reviewed.
**The Solution:** Wordmaster acts as an intelligent assistant that automates the review process. It uses a custom algorithm to resurface words at optimal intervals, ensuring they move from short-term to long-term memory without overwhelming the user.

### 🚀 Key Features

#### 🧠 Smart SRS Algorithm
* Instead of discarding learned words, the system schedules reviews.
* Reviews occur at increasing intervals (10 mins, 1 hour, 1 day, etc.) based on memory science.

#### ✍️ User-Generated Content
* Users are not limited to pre-built lists.
* The database can be extended by adding custom words, translations, categories, and context sentences via a built-in form.

#### 💾 State Persistence
* Utilizing the `chrome.storage` API, the extension maintains the state of the current word and user progress across browser sessions and restarts.

#### 📊 Analytics & Export
* Provides detailed mastery levels by category.
* Allows users to download their entire learning history as an **Excel (.csv)** file.

#### 🌍 Accessibility & UI
* **i18n Support:** Full support for multiple languages (TR/EN).
* **Text-to-Speech (TTS):** Integrated pronunciation practice.
* **Modern UI:** Designed with a professional “Midnight Blue” theme focused on readability.

### 💻 Tech Stack
* **JavaScript (ES6+):** Handling asynchronous operations, SRS logic, and DOM manipulation.
* **Chrome Extension API (Manifest V3):** Leveraging `storage`, `tts`, `i18n`, and `service workers`.
* **CSS3:** Utilizing CSS variables, Flexbox, and Grid.
* **HTML5:** Semantic markup.

## 📄 License
This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

---

## Ekran Görüntüleri
## Screenshoots

![image](screenshot/1.png)
![image](screenshot/2.png)
![image](screenshot/3.png)
![image](screenshot/4.png)
![image](screenshot/5.png)


