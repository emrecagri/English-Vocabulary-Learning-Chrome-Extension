import { defaultWords } from './data.js';
import { getNextReview } from './srs.js';

let activeWord = null;
let progress = {};
let customWords = [];
let activeCategory = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  setupI18n();

  // Verileri Çek
  const data = await chrome.storage.local.get(['progress', 'customWords', 'currentWord', 'selectedCategory']);
  progress = data.progress || {};
  customWords = data.customWords || [];
  activeCategory = data.selectedCategory || 'all';

  // Kategori Listesini Doldur
  populateCategories();

  // Kelimeyi Yükle (Eğer hafızada 'currentWord' varsa onu göster, yoksa yeni seç)
  if (data.currentWord) {
    activeWord = data.currentWord;
    renderWord(activeWord);
  } else {
    pickNewWord();
  }

  // Event Listeners
  document.getElementById('btnKnow').addEventListener('click', () => handleAction('known'));
  document.getElementById('btnLearn').addEventListener('click', () => handleAction('learned'));
  document.getElementById('btnIgnore').addEventListener('click', () => handleAction('ignored'));
  
  // Header Butonları
  document.getElementById('openOptionsBtn').addEventListener('click', () => chrome.runtime.openOptionsPage());
  document.getElementById('categoryFilter').addEventListener('change', (e) => {
    activeCategory = e.target.value;
    chrome.storage.local.set({ selectedCategory: activeCategory });
    // Kategori değişince mevcut kelimeyi sıfırla ve yeni getir
    pickNewWord();
  });

  // Kelime Ekleme UI
  const addForm = document.getElementById('addWordForm');
  document.getElementById('toggleAddBtn').addEventListener('click', () => addForm.classList.remove('hidden'));
  document.getElementById('cancelAddBtn').addEventListener('click', () => addForm.classList.add('hidden'));
  document.getElementById('saveWordBtn').addEventListener('click', saveNewWord);

  // Diğer UI
  document.getElementById('translationBox').addEventListener('click', (e) => {
    e.currentTarget.classList.remove('blur');
    e.currentTarget.classList.add('no-blur');
  });
  
  document.getElementById('wordDisplay').addEventListener('click', () => {
    if(activeWord) chrome.tts.speak(activeWord.word, { lang: 'en-US' });
  });
});

function setupI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => el.innerText = chrome.i18n.getMessage(el.dataset.i18n));
  document.querySelectorAll('[data-placeholder]').forEach(el => el.placeholder = chrome.i18n.getMessage(el.dataset.placeholder));
}

function getAllWords() {
  return [...defaultWords, ...customWords];
}

function populateCategories() {
  const words = getAllWords();
  const cats = new Set(words.map(w => w.cat));
  const select = document.getElementById('categoryFilter');
  
  select.innerHTML = `<option value="all">${chrome.i18n.getMessage("lblAllCategories")}</option>`;
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.innerText = c;
    if(c === activeCategory) opt.selected = true;
    select.appendChild(opt);
  });
  
  // Datalist for input
  const dl = document.getElementById('catList');
  cats.forEach(c => {
    const op = document.createElement('option');
    op.value = c;
    dl.appendChild(op);
  });
}

function pickNewWord() {
  const now = Date.now();
  const allWords = getAllWords();
  
  // 1. Kategori Filtresi
  let pool = activeCategory === 'all' ? allWords : allWords.filter(w => w.cat === activeCategory);

  // 2. SRS Zamanı Gelenler (Learning)
  let candidates = pool.filter(w => {
    const p = progress[w.id];
    return p && p.status === 'learning' && p.nextReview <= now;
  });

  // 3. Yeni Kelimeler
  if (candidates.length === 0) {
    candidates = pool.filter(w => !progress[w.id]);
  }

  // 4. Eğer hiç kelime kalmadıysa (hepsi Known/Ignored)
  if (candidates.length === 0 && pool.length > 0) {
     // Belki 'Known' olanları tekrar göster? Şimdilik boş ekran.
     document.querySelector('.card').innerHTML = "<h3>No words left in this category!</h3>";
     return;
  } else if(pool.length === 0) {
     document.querySelector('.card').innerHTML = "<h3>Category is empty.</h3>";
     return;
  }

  // Rastgele Seç
  activeWord = candidates[Math.floor(Math.random() * candidates.length)];
  
  // SEÇİLENİ KAYDET (Persistence)
  chrome.storage.local.set({ currentWord: activeWord });
  renderWord(activeWord);
}

function renderWord(w) {
  document.getElementById('wordDisplay').innerText = w.word;
  document.getElementById('sentenceDisplay').innerText = w.sentence || "";
  document.getElementById('translationDisplay').innerText = w.tr;
  document.getElementById('dictLink').href = `https://dictionary.cambridge.org/dictionary/english/${w.word.toLowerCase()}`;
  
  const box = document.getElementById('translationBox');
  box.classList.remove('no-blur');
  box.classList.add('blur');
}

async function handleAction(action) {
  if(!activeWord) return;
  const id = activeWord.id;
  let p = progress[id] || { status: 'new', reps: 0, level: 0 };

  if(action === 'known') {
    p.status = 'known';
    showToast(chrome.i18n.getMessage("toastKnow"));
  } else if (action === 'ignored') {
    p.status = 'ignored';
  } else if (action === 'learned') {
    p.status = 'learning';
    p.reps = (p.reps || 0) + 1;
    const srs = getNextReview(p.level);
    p.level = srs.level;
    p.nextReview = srs.time;
    showToast(chrome.i18n.getMessage("toastLearn") + srs.label);
  }

  progress[id] = p;
  // İşlem bitince storage'dan currentWord'ü sil ki sonraki açılışta yeni gelsin
  await chrome.storage.local.set({ progress, currentWord: null });
  
  pickNewWord();
}

async function saveNewWord() {
  const w = document.getElementById('newWord').value;
  const t = document.getElementById('newTr').value;
  const s = document.getElementById('newSentence').value;
  const c = document.getElementById('newCat').value || 'General';

  if(!w || !t) return alert("Word and Translation required!");

  const newObj = {
    id: 'c_' + Date.now(), // Unique ID
    word: w,
    tr: t,
    sentence: s,
    cat: c
  };

  customWords.push(newObj);
  await chrome.storage.local.set({ customWords });
  
  // UI Temizle
  document.getElementById('newWord').value = "";
  document.getElementById('newTr').value = "";
  document.getElementById('newSentence').value = "";
  document.getElementById('addWordForm').classList.add('hidden');
  
  showToast(chrome.i18n.getMessage("msgAdded"));
  
  // Listeleri güncelle
  populateCategories();
  
  // Eğer şu an boş ekrandaysak yeni kelimeyi yüklemeyi dene
  if(!activeWord) pickNewWord();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.innerText = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}