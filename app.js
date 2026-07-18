const form = document.getElementById('patientForm');
const qrBox = document.getElementById('qrcode');
let qr;

function values() {
  const data = Object.fromEntries(new FormData(form).entries());
  data.updated = new Date().toLocaleDateString('es-MX');
  return data;
}
function encode(data) { return btoa(unescape(encodeURIComponent(JSON.stringify(data)))); }
function emergencyURL() {
  const base = new URL('emergency.html', window.location.href);
  base.searchParams.set('d', encode(values()));
  return base.href;
}
function updateQR() {
  const data = values();
  document.getElementById('cardName').textContent = data.name || 'Paciente';
  document.getElementById('topName').textContent = data.name || 'Paciente';
  qrBox.innerHTML = '';
  if (window.QRCode) qr = new QRCode(qrBox, { text: emergencyURL(), width: 142, height: 142, correctLevel: QRCode.CorrectLevel.M });
}
form.addEventListener('input', updateQR);
form.addEventListener('change', updateQR);
form.addEventListener('submit', event => { event.preventDefault(); localStorage.setItem('monitoria-profile', JSON.stringify(values())); document.getElementById('savedMessage').textContent = 'Perfil guardado. El QR contiene la ficha actual.'; });
document.getElementById('downloadQR').addEventListener('click', () => { const img = qrBox.querySelector('img'); if (!img) return; const a = document.createElement('a'); a.href = img.src; a.download = 'qr-emergencia.png'; a.click(); });
window.addEventListener('load', () => { const saved = localStorage.getItem('monitoria-profile'); if (saved) { const data = JSON.parse(saved); Object.entries(data).forEach(([key,value]) => { const el = form.elements[key]; if(el) el.value = value; }); } updateQR(); });
