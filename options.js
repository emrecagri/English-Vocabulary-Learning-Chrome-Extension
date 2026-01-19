import { defaultWords } from './data.js';

document.addEventListener('DOMContentLoaded', async () => {
  setupI18n();
  const data = await chrome.storage.local.get(['progress', 'customWords']);
  const progress = data.progress || {};
  const customWords = data.customWords || [];
  const allWords = [...defaultWords, ...customWords];

  renderTables(allWords, progress);

  document.getElementById('btnExport').addEventListener('click', () => exportExcel(allWords, progress));
});

function setupI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => el.innerText = chrome.i18n.getMessage(el.dataset.i18n));
}

function renderTables(words, progress) {
  // 1. Kategori Analizi
  const cats = {};
  words.forEach(w => {
    if(!cats[w.cat]) cats[w.cat] = { total: 0, known: 0 };
    cats[w.cat].total++;
    if(progress[w.id] && progress[w.id].status === 'known') cats[w.cat].known++;
  });

  const catBody = document.getElementById('catBody');
  Object.keys(cats).forEach(c => {
    const row = `<tr>
      <td><span style="background:#334155; padding:4px 8px; border-radius:6px; font-size:0.85rem;">${c}</span></td>
      <td>${cats[c].total}</td>
      <td style="color:var(--success); font-weight:bold;">${cats[c].known}</td>
    </tr>`;
    catBody.innerHTML += row;
  });

  // 2. Full Liste
  const fullBody = document.getElementById('fullBody');
  words.forEach(w => {
    const p = progress[w.id] || { status: '-', reps: 0 };
    let color = '#fff';
    if(p.status === 'known') color = 'var(--success)';
    if(p.status === 'ignored') color = 'var(--danger)';
    if(p.status === 'learning') color = 'var(--warning)';

    const row = `<tr>
      <td><strong>${w.word}</strong> <br><small style="color:var(--text-muted)">${w.tr}</small></td>
      <td>${w.cat}</td>
      <td style="color:${color}; text-transform:uppercase; font-size:0.8rem; font-weight:bold;">${p.status}</td>
      <td>${p.reps}</td>
    </tr>`;
    fullBody.innerHTML += row;
  });
}

function exportExcel(words, progress) {
  // BOM for Excel to read UTF-8 correctly
  let csvContent = "\uFEFF"; 
  csvContent += "Category;Word;Translation;Sentence;Status;Repetitions\n"; // Header with semi-colon for Excel

  words.forEach(w => {
    const p = progress[w.id] || { status: 'New', reps: 0 };
    // Hücreleri temizle (noktalı virgül varsa kaldır)
    const clean = (txt) => (txt || "").replace(/;/g, ",");
    
    csvContent += `${clean(w.cat)};${clean(w.word)};${clean(w.tr)};${clean(w.sentence)};${p.status};${p.reps}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "Wordmaster_Report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}