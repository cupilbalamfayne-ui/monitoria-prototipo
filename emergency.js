function decode(encoded) { try { return JSON.parse(decodeURIComponent(escape(atob(encoded)))); } catch { return null; } }
const data = decode(new URLSearchParams(location.search).get('d') || '');
const card = document.getElementById('medicalCard');
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
const clean = (v) => escapeHTML(v && String(v).trim() ? String(v) : 'No especificado');
if (!data) {
  document.getElementById('alert').textContent = 'No fue posible leer la información de este código QR.';
  card.innerHTML = '<section><h2>Ficha no disponible</h2><p>Solicita al tutor un código QR actualizado.</p></section>';
} else {
  card.innerHTML = `<header><h2>${clean(data.name)}</h2><p>${clean(data.age)} años · ${clean(data.gender)}</p></header>
  <section class="critical"><h3>⚠ Datos médicos críticos</h3><div class="data-grid"><div class="data-item"><span>Tipo de sangre</span><strong>${clean(data.blood)}</strong></div><div class="data-item"><span>Alergias</span><strong>${clean(data.allergies)}</strong></div></div></section>
  <section><h3>Información médica</h3><div class="data-grid"><div class="data-item"><span>Condiciones médicas</span><strong>${clean(data.conditions)}</strong></div><div class="data-item"><span>Medicamentos actuales</span><strong>${clean(data.medications)}</strong></div><div class="data-item"><span>Dispositivos médicos</span><strong>${clean(data.devices)}</strong></div><div class="data-item"><span>Seguro social</span><strong>${clean(data.insurance)}</strong></div></div></section>
  <section><h3>Contacto de emergencia</h3><div class="data-item"><strong>${clean(data.emergency)}</strong></div></section>`;
}
