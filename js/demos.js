/**
 * BySoft - Ingeniería de Software y Procesos
 * Descripción: Control de pestañas del portafolio, muestra interactiva del motor matemático de Nómina, calculadora de comisiones y simulador de tickets a WhatsApp.
 */

/* ==========================================================================
   1. SISTEMA DE PESTAÑAS (CASOS REALES VS. DEMOS COMERCIALES)
   ========================================================================== */
function switchPortfolioTab(tab) {
  const casosContent = document.getElementById('tab-content-casos');
  const demosContent = document.getElementById('tab-content-demos');
  const btnCasos = document.getElementById('tab-btn-casos');
  const btnDemos = document.getElementById('tab-btn-demos');

  if (!casosContent || !demosContent || !btnCasos || !btnDemos) return;

  const activeClasses = "px-4 py-2.5 rounded-lg font-brand font-bold text-xs uppercase tracking-wider transition bg-sky-600 text-white shadow-sm flex items-center gap-2";
  const inactiveClasses = "px-4 py-2.5 rounded-lg font-brand font-bold text-xs uppercase tracking-wider transition text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-2";

  if (tab === 'casos') {
    casosContent.classList.remove('hidden');
    demosContent.classList.add('hidden');
    btnCasos.className = activeClasses;
    btnDemos.className = inactiveClasses;
  } else {
    demosContent.classList.remove('hidden');
    casosContent.classList.add('hidden');
    btnDemos.className = activeClasses;
    btnCasos.className = inactiveClasses;
  }
}

/* Formateador de moneda en Pesos Colombianos (COP) */
function formatCOP(num) {
  return '$' + Math.round(num).toLocaleString('es-CO');
}

/* ==========================================================================
   2. MUESTRA DEL MOTOR DE LIQUIDACIÓN (CASO Nómina)
   ========================================================================== */
function calcularNominaDemo() {
  const salarioInput = document.getElementById('nomina-salario');
  const extrasInput = document.getElementById('nomina-extras');
  if (!salarioInput || !extrasInput) return;

  const salario = parseFloat(salarioInput.value) || 1800000;
  const horasExtras = parseInt(extrasInput.value) || 0;

  const extrasValLabel = document.getElementById('nomina-extras-val');
  if (extrasValLabel) extrasValLabel.textContent = `${horasExtras} hrs`;

  // Auxilio de transporte para salarios hasta 2 SMMLV
  const auxilio = salario <= 2850000 ? 200000 : 0;
  const valorHoraOrdinaria = salario / 230;
  const pagoExtras = valorHoraOrdinaria * 1.25 * horasExtras;

  const baseCotizacion = salario + pagoExtras;
  const deduccionesSaludPension = baseCotizacion * 0.08;
  const provisionPrestaciones = (salario + auxilio + pagoExtras) * 0.2183;
  const netoPagar = salario + auxilio + pagoExtras - deduccionesSaludPension;

  document.getElementById('out-auxilio').textContent = formatCOP(auxilio);
  document.getElementById('out-extras').textContent = '+' + formatCOP(pagoExtras);
  document.getElementById('out-deducciones').textContent = '-' + formatCOP(deduccionesSaludPension);
  document.getElementById('out-prestaciones').textContent = formatCOP(provisionPrestaciones);
  document.getElementById('out-neto').textContent = formatCOP(netoPagar) + ' COP';
}

/* ==========================================================================
   3. DEMO 01: CALCULADORA DE AHORRO EN COMISIONES DE PLATAFORMAS
   ========================================================================== */
function updateCommissionDemo() {
  const salesSlider = document.getElementById('comm-sales-slider');
  const rateSlider = document.getElementById('comm-rate-slider');
  if (!salesSlider || !rateSlider) return;

  const sales = parseFloat(salesSlider.value);
  const rate = parseFloat(rateSlider.value);

  document.getElementById('comm-sales-label').textContent = formatCOP(sales) + ' COP';
  document.getElementById('comm-rate-label').textContent = rate + '%';

  const monthlyLoss = sales * (rate / 100);
  const yearlySave = monthlyLoss * 12;

  document.getElementById('comm-month-loss').textContent = formatCOP(monthlyLoss);
  document.getElementById('comm-year-save').textContent = formatCOP(yearlySave);
}

/* ==========================================================================
   4. DEMO 02: SIMULADOR DE ORDEN ESTRUCTURADA A WHATSAPP
   ========================================================================== */
function updateWaSimulator() {
  const itemSelect = document.getElementById('wa-sim-item');
  const zoneSelect = document.getElementById('wa-sim-zone');
  const previewBox = document.getElementById('wa-ticket-preview');
  if (!itemSelect || !zoneSelect || !previewBox) return;

  const rawItem = itemSelect.value.split('|');
  const zone = zoneSelect.value;

  const ticket = [
    'ORDEN WEB ESTRUCTURADA - BYSOFT',
    '----------------------------------',
    `Concepto : ${rawItem[0]}`,
    `Valor    : ${rawItem[1]}`,
    `Ubicación: ${zone}`,
    'Estado   : Datos verificados',
    '----------------------------------',
    'Generado directamente desde la plataforma web.'
  ].join('\n');

  previewBox.textContent = ticket;
}

/* Exposición global para eventos inline en index.html */
window.switchPortfolioTab = switchPortfolioTab;
window.calcularNominaDemo = calcularNominaDemo;
window.updateCommissionDemo = updateCommissionDemo;
window.updateWaSimulator = updateWaSimulator;

document.addEventListener('DOMContentLoaded', () => {
  calcularNominaDemo();
  updateCommissionDemo();
  updateWaSimulator();
});