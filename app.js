const STORAGE_KEY = "kis-dashboard-nieuwe-situatie-v1";

const roleLabels = {
  huisarts: "Huisarts",
  longarts: "Longarts",
  fysiotherapeut: "Fysiotherapeut"
};

const roleDescriptions = {
  huisarts: "Regie buiten ziekenhuis • beoordeling, follow-up en verwijzing",
  longarts: "Specialistische zorg • diagnostiek, GOLD-classificatie en behandeladvies",
  fysiotherapeut: "Longrevalidatie • belastbaarheid, bewegen en voortgang"
};

const defaultState = {
  currentRole: null,
  activeTab: "overzicht",
  selectedPatientId: "p001",
  patients: [
    {
      id: "p001",
      name: "Mevrouw De Vries",
      age: 68,
      diagnosis: "COPD GOLD 3",
      risk: "Verhoogde ziektelast",
      complaints: "Toename benauwdheid bij inspanning, meer hoesten in de ochtend, vermoeidheid.",
      history: "COPD sinds 2018, rookverleden 35 pack-years, hypertensie, eerdere ziekenhuisopname wegens longaanval.",
      exacerbations: "2 exacerbaties in afgelopen 12 maanden, laatste opname 18-04-2026.",
      medication: "LAMA/LABA onderhoud, salbutamol zo nodig, inhalatie-instructie herhalen.",
      movementGoals: "3 keer per week wandelen, traplopen met minder pauzes, ademhalingstechniek oefenen.",
      limitations: "Lage inspanningstolerantie, benauwdheid bij traplopen, onzekerheid bij inspanning.",
      exertionComplaints: "MRC 3, kortademig bij matige inspanning, herstel na inspanning duurt langer.",
      tests: [
        { date: "2026-04-18", source: "Huisarts", type: "Spirometrie", fev1: 42, spo2: 94, ccq: 2.8, complaintScore: 7, note: "Na longaanval, duidelijke toename klachten." },
        { date: "2026-05-12", source: "POH", type: "Controle", fev1: 45, spo2: 95, ccq: 2.4, complaintScore: 6, note: "Klachten iets stabieler, nog lage belastbaarheid." },
        { date: "2026-06-04", source: "Huisarts", type: "Controle", fev1: 43, spo2: 94, ccq: 2.7, complaintScore: 7, note: "Opnieuw meer benauwdheid bij inspanning." }
      ],
      diagnostics: [
        { date: "2026-05-20", source: "Longarts", title: "Specialistische beoordeling", gold: "GOLD 3", medication: "Huidige inhalatiemedicatie continueren", note: "Controle inhalatietechniek en revalidatieadvies." }
      ],
      physioEvaluations: [
        { date: "2026-05-28", distance: 280, borg: 6, note: "6MWT laag, pauzes nodig bij wandelen." }
      ]
    },
    {
      id: "p002",
      name: "Meneer Bakker",
      age: 72,
      diagnosis: "COPD GOLD 3",
      risk: "Stabiel met risico op terugval",
      complaints: "Chronische kortademigheid, weinig sputum, sneller moe na wandelen.",
      history: "COPD sinds 2016, diabetes type 2, geen opname in laatste 12 maanden.",
      exacerbations: "1 exacerbatie in afgelopen 12 maanden, behandeld met prednisonkuur thuis.",
      medication: "ICS/LABA, salbutamol zo nodig, therapietrouw wisselend.",
      movementGoals: "Conditie behouden, 20 minuten wandelen zonder extra pauze.",
      limitations: "Beperkte conditie, onzekerheid bij buiten wandelen.",
      exertionComplaints: "MRC 2-3, lichte toename klachten bij koud weer.",
      tests: [
        { date: "2026-04-02", source: "Huisarts", type: "Controle", fev1: 49, spo2: 96, ccq: 2.1, complaintScore: 5, note: "Stabiel beeld." },
        { date: "2026-05-16", source: "POH", type: "Controle", fev1: 48, spo2: 95, ccq: 2.3, complaintScore: 5, note: "Lichte toename kortademigheid." }
      ],
      diagnostics: [],
      physioEvaluations: [
        { date: "2026-05-30", distance: 330, borg: 5, note: "Wandelt zelfstandig, tempo laag." }
      ]
    }
  ],
  tasks: [
    { id: "t001", role: "huisarts", patientId: "p001", title: "Beoordeel actuele klachten", status: "open", process: "Signalering", due: "2026-06-10", note: "Controleer klachten, testresultaten, voorgeschiedenis en exacerbaties." },
    { id: "t002", role: "huisarts", patientId: "p001", title: "Verwijzing naar longarts voorbereiden", status: "terugkoppelen", process: "Verwijzing", due: "2026-06-10", note: "Gebruik de vaste invullijst met spirometrie, voorgeschiedenis en klachtenontwikkeling." },
    { id: "t003", role: "longarts", patientId: "p001", title: "Beoordeel verwijzing en bepaal GOLD-classificatie", status: "open", process: "Diagnostiek", due: "2026-06-11", note: "Controleer spirometrie, klachtenontwikkeling en relevante voorgeschiedenis." },
    { id: "t004", role: "longarts", patientId: "p001", title: "Behandeladvies terugkoppelen", status: "terugkoppelen", process: "Zorgplan", due: "2026-06-11", note: "Gebruik de vaste opzet voor longfunctie, diagnose, beperkingen en doelen." },
    { id: "t005", role: "fysiotherapeut", patientId: "p001", title: "Belastbaarheid beoordelen", status: "open", process: "Behandeling", due: "2026-06-12", note: "Bekijk longfunctie, beweegdoelen, fysieke beperkingen en klachten bij inspanning." },
    { id: "t006", role: "fysiotherapeut", patientId: "p001", title: "Voortgang revalidatie terugkoppelen", status: "afgerond", process: "Monitoring", due: "2026-06-08", note: "Eerste 6MWT en inspanningsklachten vastgelegd." }
  ],
  messages: [
    { id: "m001", patientId: "p001", from: "huisarts", to: "longarts", type: "Verwijzing", subject: "Verzoek specialistische beoordeling", body: "Patiënt heeft toenemende benauwdheid en dalende FEV1. Graag beoordeling en behandeladvies.", date: "2026-06-04T09:30:00", secure: true, read: false },
    { id: "m002", patientId: "p001", from: "fysiotherapeut", to: "huisarts", type: "Terugkoppeling", subject: "Voortgang belastbaarheid", body: "Patiënt ervaart nog veel benauwdheid bij traplopen. Advies: rustig opbouwen en inhalatietechniek opnieuw controleren.", date: "2026-06-05T14:10:00", secure: true, read: true }
  ],
  feedback: [],
  uat: {
    u1: "open",
    u2: "open",
    u3: "open",
    u4: "open",
    u5: "open",
    u6: "open",
    u7: "open",
    u8: "open",
    u9: "open"
  }
};

let state = loadState();

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(defaultState));
}

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return cloneDefaultState();
    const parsed = JSON.parse(stored);
    return { ...cloneDefaultState(), ...parsed };
  } catch (error) {
    console.warn("Kon lokale prototypegegevens niet laden", error);
    return cloneDefaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function login(username, password) {
  const normalizedUsername = username.trim().toLowerCase();
  const user = demoUsers[normalizedUsername];

  if (!user || user.password !== password) {
    showLoginError("Gebruikersnaam of wachtwoord is onjuist.");
    return;
  }

  state.isAuthenticated = true;
  state.loggedInUser = {
    username: normalizedUsername,
    name: user.name
  };
  state.currentRole = user.role;
  state.activeTab = "overzicht";

  saveState();
  render();
}

function logout() {
  state.isAuthenticated = false;
  state.loggedInUser = null;
  state.currentRole = null;
  state.activeTab = "overzicht";

  saveState();
  render();
}

function showLoginError(message) {
  const errorBox = document.getElementById("login-error");
  if (errorBox) {
    errorBox.textContent = message;
    errorBox.classList.remove("hidden");
  }
}

function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  state = cloneDefaultState();
  showToast("Demo opnieuw ingesteld.");
  render();
}

function setRole(role) {
  state.currentRole = role;
  state.activeTab = "overzicht";
  saveState();
  render();
}

function setTab(tab) {
  state.activeTab = tab;
  saveState();
  render();
}

function selectedPatient() {
  return state.patients.find(patient => patient.id === state.selectedPatientId) || state.patients[0];
}

function setPatient(patientId) {
  state.selectedPatientId = patientId;
  saveState();
  render();
}

function uid(prefix) {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(value));
}

function formatDateTime(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function render() {
  const app = document.getElementById("app");

  if (!state.isAuthenticated) {
    app.innerHTML = loginPageTemplate();

    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", event => {
      event.preventDefault();

      const form = new FormData(loginForm);
      login(form.get("username"), form.get("password"));
    });

    return;
  }

  app.innerHTML = layoutTemplate();
  bindBaseEvents();
  renderTab();
}

  app.innerHTML = layoutTemplate();
  bindBaseEvents();
  renderTab();
}

function loginPageTemplate() {
  return `
    <main class="login-shell">
      <section class="login-card">
        <div class="brand-row">
          <div class="brand-mark">KIS</div>
          <div>
            <p class="eyebrow">Beveiligde demo-omgeving</p>
            <h1>Inloggen KIS-dashboard</h1>
          </div>
        </div>

        <p class="lead">
          Log in met een testaccount om toegang te krijgen tot de rolgerichte demo van het COPD-ketenzorgdashboard.
        </p>

        <form id="login-form" class="form-grid">
          <label>Gebruikersnaam
            <input 
              name="username" 
              type="text" 
              autocomplete="username"
              placeholder="Bijvoorbeeld: huisarts" 
              required 
            />
          </label>

          <label>Wachtwoord
            <input 
              name="password" 
              type="password" 
              autocomplete="current-password"
              placeholder="demo123" 
              required 
            />
          </label>

          <p id="login-error" class="notice hidden"></p>

          <div class="actions">
            <button class="primary-button" type="submit">Inloggen</button>
          </div>
        </form>

        <details class="demo-details">
          <summary>Demo-inloggegevens</summary>
          <p>
            Huisarts: <strong>huisarts</strong> / demo123<br>
            Longarts: <strong>longarts</strong> / demo123<br>
            Fysiotherapeut: <strong>fysio</strong> / demo123
          </p>
        </details>
      </section>
    </main>
  `;
}

function layoutTemplate() {
  const role = state.currentRole;

  return `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand-row">
          <div class="brand-mark">KIS</div>
          <div>
            <h2>${roleLabels[role]}</h2>
<p>${state.loggedInUser?.name || roleDescriptions[role]}</p>
          </div>
        </div>

        <nav class="nav" aria-label="Hoofdnavigatie">
          ${navButton("overzicht", "Patiëntoverzicht")}
          ${navButton("taken", "Taken")}
          ${navButton("berichten", role === "huisarts" ? "Berichten & verwijzing" : role === "longarts" ? "Berichten & advies" : "Berichten")}
          ${navButton("toevoegen", role === "huisarts" ? "Testgegevens toevoegen" : role === "longarts" ? "Diagnostiek toevoegen" : "Evaluatie toevoegen")}
          ${navButton("instructie", "Instructie")}
          ${navButton("feedback", "Feedback")}
          ${navButton("uat", "UAT-checklist")}
        </nav>

        <div class="sidebar-footer">
          <button class="ghost-button" id="switch-role">Uitloggen</button>
          <button class="ghost-button" id="reset-demo">Demo resetten</button>
        </div>
      </aside>

      <main class="content">
        <header class="topbar">
          <div>
            <p class="eyebrow">COPD GOLD 3 • ketenzorg</p>
            <h1>${tabTitle()}</h1>
            <p class="muted">Rolgericht prototype voor de nieuwe test-/praktijksituatie.</p>
          </div>

          <select class="patient-select" id="patient-select" aria-label="Patiënt selecteren">
            ${state.patients.map(patient => `
              <option value="${patient.id}" ${patient.id === state.selectedPatientId ? "selected" : ""}>
                ${patient.name} • ${patient.diagnosis}
              </option>
            `).join("")}
          </select>
        </header>

        <section id="tab-content"></section>
      </main>
    </div>
  `;
}

function navButton(tab, label) {
  return `<button class="${state.activeTab === tab ? "active" : ""}" data-tab="${tab}">${label}</button>`;
}

function tabTitle() {
  const titles = {
    overzicht: "Patiëntoverzicht",
    taken: "Takenoverzicht per stakeholder",
    berichten: "Beveiligde communicatie",
    toevoegen: "Gegevens toevoegen",
    instructie: "Korte gebruikersinstructie",
    feedback: "Feedback en verbeterpunten",
    uat: "UAT-checklist"
  };

  return titles[state.activeTab] || "Dashboard";
}

function bindBaseEvents() {
  document.querySelectorAll("[data-tab]").forEach(button => {
    button.addEventListener("click", () => setTab(button.dataset.tab));
  });

document.getElementById("switch-role").addEventListener("click", logout);

  document.getElementById("reset-demo").addEventListener("click", resetState);

  document.getElementById("patient-select").addEventListener("change", event => {
    setPatient(event.target.value);
  });
}

function renderTab() {
  const content = document.getElementById("tab-content");
  const role = state.currentRole;
  const tab = state.activeTab;

  if (tab === "overzicht") content.innerHTML = renderOverview(role);
  if (tab === "taken") content.innerHTML = renderTasks();
  if (tab === "berichten") content.innerHTML = renderMessages(role);
  if (tab === "toevoegen") content.innerHTML = renderAddData(role);
  if (tab === "instructie") content.innerHTML = renderInstruction(role);
  if (tab === "feedback") content.innerHTML = renderFeedback();
  if (tab === "uat") content.innerHTML = renderUat();

  bindTabEvents();
  drawCharts();
}

function renderOverview(role) {
  const patient = selectedPatient();

  if (role === "huisarts") return huisartsOverview(patient);
  if (role === "longarts") return longartsOverview(patient);
  return fysioOverview(patient);
}

function patientSummaryCards(patient) {
  const latest = patient.tests.at(-1);

  return `
    <div class="grid grid-3">
      <article class="card kpi">
        <span class="muted">Laatste FEV1</span>
        <strong>${latest?.fev1 ?? "-"}% voorspeld</strong>
        <span>${latest ? formatDate(latest.date) : "Geen meting"}</span>
      </article>

      <article class="card kpi">
        <span class="muted">SpO2</span>
        <strong>${latest?.spo2 ?? "-"}%</strong>
        <span>Laatste bekende waarde</span>
      </article>

      <article class="card kpi">
        <span class="muted">Risico</span>
        <strong>${escapeHtml(patient.risk)}</strong>
        <span>${escapeHtml(patient.diagnosis)}</span>
      </article>
    </div>
  `;
}

function huisartsOverview(patient) {
  return `
    <div class="grid">
      ${patientSummaryCards(patient)}

      <div class="grid grid-2">
        <article class="card">
          <div class="card-header">
            <h2>Medisch patiëntoverzicht huisarts</h2>
            <span class="badge">Eis 1</span>
          </div>

          <ul class="info-list">
            <li><span>Actuele klachten</span><strong>${escapeHtml(patient.complaints)}</strong></li>
            <li><span>Voorgeschiedenis</span><strong>${escapeHtml(patient.history)}</strong></li>
            <li><span>Exacerbaties</span><strong>${escapeHtml(patient.exacerbations)}</strong></li>
            <li><span>Medicatie</span><strong>${escapeHtml(patient.medication)}</strong></li>
          </ul>
        </article>

        <article class="card canvas-wrap">
          <div class="card-header">
            <h2>Trend meetwaarden</h2>
            <span class="badge success">Grafiek</span>
          </div>
          <canvas id="chart-fev1" data-chart="fev1"></canvas>
        </article>
      </div>

      <article class="card">
        <div class="card-header">
          <h2>Eerdere testresultaten</h2>
          <button class="secondary-button" data-tab-direct="toevoegen">Nieuw testresultaat toevoegen</button>
        </div>
        ${testTable(patient.tests)}
      </article>

      ${processFlowCard()}
    </div>
  `;
}

function longartsOverview(patient) {
  const incoming = state.messages.filter(message => message.patientId === patient.id && message.to === "longarts");

  return `
    <div class="grid">
      ${patientSummaryCards(patient)}

      <div class="grid grid-2">
        <article class="card">
          <div class="card-header">
            <h2>Vakspecifiek overzicht longarts</h2>
            <span class="badge">Eis 5</span>
          </div>

          <ul class="info-list">
            <li><span>Verwijsinformatie</span><strong>${incoming[0] ? escapeHtml(incoming[0].body) : "Nog geen verwijzing ontvangen."}</strong></li>
            <li><span>Spirometrie</span><strong>FEV1-trend zichtbaar in grafiek en testtabel.</strong></li>
            <li><span>Voorgeschiedenis</span><strong>${escapeHtml(patient.history)}</strong></li>
            <li><span>Klachtenbeeld</span><strong>${escapeHtml(patient.complaints)}</strong></li>
          </ul>
        </article>

        <article class="card canvas-wrap">
          <div class="card-header">
            <h2>Spirometrie & klachtenontwikkeling</h2>
            <span class="badge success">Grafiek</span>
          </div>
          <canvas id="chart-fev1" data-chart="fev1"></canvas>
        </article>
      </div>

      <article class="card">
        <div class="card-header">
          <h2>Diagnostiek en GOLD-classificatie</h2>
          <button class="secondary-button" data-tab-direct="toevoegen">Diagnostiek toevoegen</button>
        </div>
        ${diagnosticsTable(patient.diagnostics)}
      </article>

      ${processFlowCard()}
    </div>
  `;
}

function fysioOverview(patient) {
  return `
    <div class="grid">
      ${patientSummaryCards(patient)}

      <div class="grid grid-2">
        <article class="card">
          <div class="card-header">
            <h2>Overzicht fysiotherapeut</h2>
            <span class="badge">Eis 8</span>
          </div>

          <ul class="info-list">
            <li><span>Longfunctie</span><strong>Laatste FEV1: ${patient.tests.at(-1)?.fev1 ?? "-"}% voorspeld.</strong></li>
            <li><span>Beweegdoelen</span><strong>${escapeHtml(patient.movementGoals)}</strong></li>
            <li><span>Fysieke beperkingen</span><strong>${escapeHtml(patient.limitations)}</strong></li>
            <li><span>Klachten bij inspanning</span><strong>${escapeHtml(patient.exertionComplaints)}</strong></li>
          </ul>
        </article>

        <article class="card canvas-wrap">
          <div class="card-header">
            <h2>Voortgang belastbaarheid</h2>
            <span class="badge success">Grafiek</span>
          </div>
          <canvas id="chart-physio" data-chart="physio"></canvas>
        </article>
      </div>

      <article class="card">
        <div class="card-header">
          <h2>Fysiotherapeutische evaluaties</h2>
          <button class="secondary-button" data-tab-direct="toevoegen">Evaluatie toevoegen</button>
        </div>
        ${physioTable(patient.physioEvaluations)}
      </article>

      ${processFlowCard()}
    </div>
  `;
}

function processFlowCard() {
  return `
    <article class="card soft">
      <div class="card-header">
        <h2>Proceslijn SOLL</h2>
        <span class="badge">Taakverdeling</span>
      </div>

      <div class="timeline">
        <div class="timeline-item"><strong>1. Signalering</strong><span>Huisarts/POH beoordeelt klachten, voorgeschiedenis, meetwaarden en exacerbaties.</span></div>
        <div class="timeline-item"><strong>2. Diagnostiek</strong><span>Longarts beoordeelt verwijzing, spirometrie, klachtenontwikkeling en GOLD-classificatie.</span></div>
        <div class="timeline-item"><strong>3. Zorgplan</strong><span>Behandeladvies wordt via vaste structuur gedeeld met huisarts en ketenpartners.</span></div>
        <div class="timeline-item"><strong>4. Revalidatie</strong><span>Fysiotherapeut gebruikt longfunctie, beweegdoelen, beperkingen en inspanningsklachten.</span></div>
        <div class="timeline-item"><strong>5. Monitoring</strong><span>Taken en berichten laten zien wat openstaat, afgerond is of teruggekoppeld moet worden.</span></div>
      </div>
    </article>
  `;
}

function testTable(tests) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Bron</th>
            <th>Type</th>
            <th>FEV1</th>
            <th>SpO2</th>
            <th>CCQ</th>
            <th>Klachtenscore</th>
            <th>Notitie</th>
          </tr>
        </thead>
        <tbody>
          ${tests.map(test => `
            <tr>
              <td>${formatDate(test.date)}</td>
              <td>${escapeHtml(test.source)}</td>
              <td>${escapeHtml(test.type)}</td>
              <td>${test.fev1}%</td>
              <td>${test.spo2}%</td>
              <td>${test.ccq}</td>
              <td>${test.complaintScore}/10</td>
              <td>${escapeHtml(test.note)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function diagnosticsTable(diagnostics) {
  if (!diagnostics.length) {
    return `<p class="muted">Nog geen diagnostische gegevens toegevoegd.</p>`;
  }

  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Bron</th>
            <th>Onderdeel</th>
            <th>GOLD</th>
            <th>Medicatie</th>
            <th>Notitie</th>
          </tr>
        </thead>
        <tbody>
          ${diagnostics.map(item => `
            <tr>
              <td>${formatDate(item.date)}</td>
              <td>${escapeHtml(item.source)}</td>
              <td>${escapeHtml(item.title)}</td>
              <td>${escapeHtml(item.gold)}</td>
              <td>${escapeHtml(item.medication)}</td>
              <td>${escapeHtml(item.note)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function physioTable(evaluations) {
  if (!evaluations.length) {
    return `<p class="muted">Nog geen fysiotherapeutische evaluaties toegevoegd.</p>`;
  }

  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Datum</th>
            <th>6MWT</th>
            <th>Borg-score</th>
            <th>Rapportage</th>
          </tr>
        </thead>
        <tbody>
          ${evaluations.map(item => `
            <tr>
              <td>${formatDate(item.date)}</td>
              <td>${item.distance} meter</td>
              <td>${item.borg}/10</td>
              <td>${escapeHtml(item.note)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderTasks() {
  const patient = selectedPatient();
  const allForPatient = state.tasks.filter(task => task.patientId === patient.id);
  const ownTasks = allForPatient.filter(task => task.role === state.currentRole);

  return `
    <div class="grid">
      <article class="card">
        <div class="card-header">
          <div>
            <h2>Eigen taken voor ${roleLabels[state.currentRole]}</h2>
            <p class="muted">Openstaand, afgerond en terug te koppelen worden apart zichtbaar gemaakt.</p>
          </div>
          <span class="badge">Eis 9</span>
        </div>
        ${taskTable(ownTasks, true)}
      </article>

      <article class="card soft">
        <h2>Totale taakverdeling rond deze patiënt</h2>
        ${taskTable(allForPatient, false)}
      </article>
    </div>
  `;
}

function taskTable(tasks, editable) {
  if (!tasks.length) {
    return `<p class="muted">Geen taken gevonden voor deze selectie.</p>`;
  }

  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Stakeholder</th>
            <th>Proces</th>
            <th>Actie</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Toelichting</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${tasks.map(task => `
            <tr>
              <td>${roleLabels[task.role]}</td>
              <td>${escapeHtml(task.process)}</td>
              <td><strong>${escapeHtml(task.title)}</strong></td>
              <td>${statusBadge(task.status)}</td>
              <td>${formatDate(task.due)}</td>
              <td>${escapeHtml(task.note)}</td>
              <td>${editable ? `<button class="secondary-button" data-task-toggle="${task.id}">${task.status === "afgerond" ? "Heropen" : "Afronden"}</button>` : ""}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function statusBadge(status) {
  const classes = {
    open: "warning",
    afgerond: "success",
    terugkoppelen: "danger"
  };

  const labels = {
    open: "Openstaand",
    afgerond: "Afgerond",
    terugkoppelen: "Terugkoppeling nodig"
  };

  return `<span class="badge ${classes[status] || ""}">${labels[status] || status}</span>`;
}

function renderMessages(role) {
  const patient = selectedPatient();

  const messages = state.messages
    .filter(message => message.patientId === patient.id && (message.to === role || message.from === role))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return `
    <div class="grid grid-2">
      <article class="card">
        <div class="card-header">
          <div>
            <h2>Beveiligde berichtfunctie</h2>
            <p class="muted">Prototypeweergave: berichten blijven binnen het dashboard en worden aan patiënt en rol gekoppeld.</p>
          </div>
          <span class="badge">Eis 4</span>
        </div>

        <form id="message-form" class="form-grid">
          <label>Ontvanger
            <select name="to" required>
              ${Object.entries(roleLabels)
                .filter(([key]) => key !== role)
                .map(([key, label]) => `<option value="${key}">${label}</option>`)
                .join("")}
            </select>
          </label>

          <label>Type bericht
            <select name="type" required>
              <option>Verwijzing</option>
              <option>Terugkoppeling</option>
              <option>Vraag</option>
              <option>Behandeladvies</option>
            </select>
          </label>

          <label>Onderwerp
            <input name="subject" required placeholder="Bijvoorbeeld: Verwijzing specialistische beoordeling" />
          </label>

          <label>Bericht
            <textarea name="body" required placeholder="Beschrijf kort wat de andere stakeholder moet weten of doen."></textarea>
          </label>

          <div class="notice">
            🔒 In dit prototype wordt beveiliging gesimuleerd. Voor echte zorgpraktijk zijn autorisatie, logging en gegevensbeveiliging nodig.
          </div>

          <div class="actions">
            <button class="primary-button" type="submit">Bericht versturen</button>
          </div>
        </form>
      </article>

      <article class="card">
        <h2>Inbox en verzonden berichten</h2>
        <div class="messages-list">
          ${messages.length ? messages.map(messageCard).join("") : `<p class="muted">Geen berichten gevonden voor deze patiënt en rol.</p>`}
        </div>
      </article>

      ${role === "huisarts" ? huisartsReferralForm(patient) : ""}
      ${role === "longarts" ? treatmentAdviceForm(patient) : ""}
    </div>
  `;
}

function messageCard(message) {
  return `
    <div class="message-card">
      <div class="message-meta">
        <span>${message.secure ? "🔒" : ""} ${escapeHtml(message.type)} • ${formatDateTime(message.date)}</span>
        <span>${roleLabels[message.from]} → ${roleLabels[message.to]}</span>
      </div>
      <h3>${escapeHtml(message.subject)}</h3>
      <p>${escapeHtml(message.body)}</p>
    </div>
  `;
}

function huisartsReferralForm(patient) {
  const latest = patient.tests.at(-1);

  return `
    <article class="card">
      <div class="card-header">
        <div>
          <h2>Vaste invullijst verwijzing huisarts → longarts</h2>
          <p class="muted">Verplichte structuur voor spirometrie, voorgeschiedenis en klachtenontwikkeling.</p>
        </div>
        <span class="badge">Eis 3</span>
      </div>

      <form id="referral-form" class="form-grid two">
        <label>Spirometriegegevens
          <textarea name="spirometry" required>${latest ? `FEV1 ${latest.fev1}% voorspeld, SpO2 ${latest.spo2}%, CCQ ${latest.ccq}` : ""}</textarea>
        </label>

        <label>Relevante voorgeschiedenis
          <textarea name="history" required>${escapeHtml(patient.history)}</textarea>
        </label>

        <label>Ontwikkeling klachten
          <textarea name="complaints" required>${escapeHtml(patient.complaints)} Laatste klachtenscore: ${latest?.complaintScore ?? "-"}/10.</textarea>
        </label>

        <label>Vraag aan longarts
          <textarea name="question" required>Graag specialistische beoordeling, GOLD-classificatie controleren en behandeladvies terugkoppelen.</textarea>
        </label>

        <div class="actions">
          <button class="primary-button" type="submit">Verwijzing delen met longarts</button>
        </div>
      </form>
    </article>
  `;
}

function treatmentAdviceForm(patient) {
  const latest = patient.tests.at(-1);

  return `
    <article class="card">
      <div class="card-header">
        <div>
          <h2>Vaste opzet behandeladvies longarts</h2>
          <p class="muted">Leg minimaal longfunctie, diagnose/GOLD, beperkingen en doelen/aandachtspunten vast.</p>
        </div>
        <span class="badge">Eis 7</span>
      </div>

      <form id="advice-form" class="form-grid two">
        <label>Longfunctie
          <textarea name="lungFunction" required>${latest ? `Laatste FEV1 ${latest.fev1}% voorspeld. SpO2 ${latest.spo2}%.` : ""}</textarea>
        </label>

        <label>Diagnose / GOLD-classificatie
          <textarea name="gold" required>${escapeHtml(patient.diagnosis)}</textarea>
        </label>

        <label>Fysieke en mentale beperkingen
          <textarea name="limitations" required>${escapeHtml(patient.limitations)} Mentale aandachtspunten: onzekerheid bij benauwdheid en inspanning.</textarea>
        </label>

        <label>Doelen / aandachtspunten vervolgbehandeling
          <textarea name="goals" required>Inhalatietechniek controleren, revalidatie blijven volgen, bij toename klachten laagdrempelig terugkoppelen.</textarea>
        </label>

        <div class="actions">
          <button class="primary-button" type="submit">Behandeladvies delen met huisarts</button>
        </div>
      </form>
    </article>
  `;
}

function renderAddData(role) {
  const patient = selectedPatient();

  if (role === "huisarts") return addHuisartsData(patient);
  if (role === "longarts") return addLongartsData(patient);
  return addFysioData(patient);
}

function addHuisartsData(patient) {
  return `
    <div class="grid grid-2">
      <article class="card">
        <div class="card-header">
          <div>
            <h2>Nieuw testresultaat toevoegen</h2>
            <p class="muted">Nieuwe gegevens worden direct zichtbaar in het patiëntoverzicht en in de grafiek.</p>
          </div>
          <span class="badge">Eis 2</span>
        </div>

        <form id="test-form" class="form-grid two">
          <label>Datum
            <input type="date" name="date" required value="${new Date().toISOString().slice(0, 10)}" />
          </label>

          <label>Type meting
            <input name="type" required value="Controle" />
          </label>

          <label>FEV1 % voorspeld
            <input type="number" name="fev1" min="10" max="120" required />
          </label>

          <label>SpO2 %
            <input type="number" name="spo2" min="70" max="100" required />
          </label>

          <label>CCQ-score
            <input type="number" step="0.1" name="ccq" min="0" max="6" required />
          </label>

          <label>Klachtenscore /10
            <input type="number" name="complaintScore" min="0" max="10" required />
          </label>

          <label>Notitie
            <textarea name="note" required placeholder="Bijvoorbeeld: meer benauwdheid bij traplopen."></textarea>
          </label>

          <div class="actions">
            <button class="primary-button" type="submit">Opslaan in patiëntoverzicht</button>
          </div>
        </form>
      </article>

      <article class="card canvas-wrap">
        <h2>Controle op terugvinden</h2>
        <p class="muted">Na opslaan staat de meting in deze tabel én in het huisarts-overzicht.</p>
        ${testTable(patient.tests)}
      </article>
    </div>
  `;
}

function addLongartsData(patient) {
  return `
    <div class="grid grid-2">
      <article class="card">
        <div class="card-header">
          <div>
            <h2>Diagnostische gegevens toevoegen</h2>
            <p class="muted">Veld voor GOLD-classificatie, aanvullende diagnostiek en medicatiegegevens.</p>
          </div>
          <span class="badge">Eis 6</span>
        </div>

        <form id="diagnostic-form" class="form-grid two">
          <label>Datum
            <input type="date" name="date" required value="${new Date().toISOString().slice(0, 10)}" />
          </label>

          <label>Onderdeel
            <input name="title" required value="Aanvullende diagnostiek" />
          </label>

          <label>GOLD-classificatie
            <input name="gold" required value="GOLD 3" />
          </label>

          <label>Medicatiegegevens
            <input name="medication" required placeholder="Bijvoorbeeld: LAMA/LABA continueren" />
          </label>

          <label>Diagnostische notitie
            <textarea name="note" required placeholder="Beschrijf de specialistische conclusie."></textarea>
          </label>

          <div class="actions">
            <button class="primary-button" type="submit">Diagnostiek opslaan</button>
          </div>
        </form>
      </article>

      <article class="card">
        <h2>Terugvinden in overzicht longarts</h2>
        ${diagnosticsTable(patient.diagnostics)}
      </article>
    </div>
  `;
}

function addFysioData(patient) {
  return `
    <div class="grid grid-2">
      <article class="card">
        <div class="card-header">
          <div>
            <h2>Fysiotherapeutische evaluatie toevoegen</h2>
            <p class="muted">Ondersteunende functie voor voortgang en terugkoppeling.</p>
          </div>
          <span class="badge warning">Should/Could</span>
        </div>

        <form id="physio-form" class="form-grid two">
          <label>Datum
            <input type="date" name="date" required value="${new Date().toISOString().slice(0, 10)}" />
          </label>

          <label>6MWT afstand in meters
            <input type="number" name="distance" min="0" max="1000" required />
          </label>

          <label>Borg-score /10
            <input type="number" name="borg" min="0" max="10" required />
          </label>

          <label>Rapportage
            <textarea name="note" required placeholder="Bijvoorbeeld: minder pauzes nodig bij wandelen."></textarea>
          </label>

          <div class="actions">
            <button class="primary-button" type="submit">Evaluatie opslaan</button>
          </div>
        </form>
      </article>

      <article class="card">
        <h2>Terugvinden in fysiotherapie-overzicht</h2>
        ${physioTable(patient.physioEvaluations)}
      </article>
    </div>
  `;
}

function renderInstruction(role) {
  const roleSpecific = {
    huisarts: [
      "Controleer of de juiste patiënt is geselecteerd.",
      "Bekijk klachten, testresultaten, voorgeschiedenis en exacerbaties in het patiëntoverzicht.",
      "Voeg nieuwe testgegevens toe wanneer er een controle is uitgevoerd.",
      "Gebruik de vaste verwijslijst om spirometrie, voorgeschiedenis en klachtenontwikkeling mee te sturen.",
      "Controleer taken en rond deze pas af nadat de actie echt is uitgevoerd."
    ],
    longarts: [
      "Controleer of de juiste patiënt is geselecteerd.",
      "Open de verwijzing en bekijk spirometrie, klachtenontwikkeling en voorgeschiedenis.",
      "Voeg diagnostische gegevens, GOLD-classificatie en medicatiegegevens toe.",
      "Gebruik de vaste opzet voor het behandeladvies.",
      "Deel het behandeladvies met de huisarts en controleer je takenoverzicht."
    ],
    fysiotherapeut: [
      "Controleer of de juiste patiënt is geselecteerd.",
      "Bekijk longfunctie, beweegdoelen, beperkingen en klachten bij inspanning.",
      "Gebruik het takenoverzicht om openstaande acties te volgen.",
      "Voeg eventueel een evaluatie toe om voortgang zichtbaar te maken.",
      "Stuur terugkoppeling naar de huisarts of longarts wanneer relevante verandering zichtbaar is."
    ]
  };

  return `
    <div class="grid grid-2">
      <article class="card">
        <div class="card-header">
          <div>
            <h2>Instructie voor ${roleLabels[role]}</h2>
            <p class="muted">De gebruiker moet zelfstandig patiëntinformatie vinden, taken opvolgen, berichten gebruiken en feedback registreren.</p>
          </div>
          <span class="badge">Eis 4</span>
        </div>

        <ol class="checklist">
          ${roleSpecific[role].map(item => `
            <li class="checklist-item">
              <span class="badge success">Stap</span>
              <span>${item}</span>
            </li>
          `).join("")}
        </ol>
      </article>

      <article class="card soft">
        <h2>Algemene aandachtspunten</h2>

        <ul class="info-list">
          <li><span>Juiste patiënt</span><strong>Controleer altijd eerst de patiëntselectie bovenin.</strong></li>
          <li><span>Rolgericht</span><strong>Gebruik alleen informatie en acties die bij je rol horen.</strong></li>
          <li><span>Taken</span><strong>Rond taken pas af wanneer de actie daadwerkelijk is uitgevoerd.</strong></li>
          <li><span>Berichten</span><strong>Stuur verwijzingen en terugkoppelingen naar de juiste stakeholder.</strong></li>
          <li><span>Feedback</span><strong>Leg onduidelijkheden direct vast in de feedbackfunctie.</strong></li>
          <li><span>Spoed</span><strong>Bij acute verslechtering gaat het zorgprotocol altijd vóór het dashboard.</strong></li>
        </ul>
      </article>
    </div>
  `;
}

function renderFeedback() {
  const patient = selectedPatient();

  return `
    <div class="grid grid-2">
      <article class="card">
        <div class="card-header">
          <div>
            <h2>Feedback registreren</h2>
            <p class="muted">Voor knelpunten, ontbrekende informatie of verbeterpunten tijdens de acceptatietest.</p>
          </div>
          <span class="badge">Eis 5</span>
        </div>

        <form id="feedback-form" class="form-grid">
          <label>Categorie
            <select name="category" required>
              <option>Onduidelijke functie</option>
              <option>Ontbrekende informatie</option>
              <option>Taakverdeling</option>
              <option>Berichten/verwijzing</option>
              <option>Gebruiksvriendelijkheid</option>
              <option>Overig verbeterpunt</option>
            </select>
          </label>

          <label>Prioriteit
            <select name="priority" required>
              <option>Laag</option>
              <option>Middel</option>
              <option>Hoog</option>
            </select>
          </label>

          <label>Verbeterpunt
            <textarea name="body" required placeholder="Beschrijf wat onduidelijk is of wat beter moet."></textarea>
          </label>

          <div class="actions">
            <button class="primary-button" type="submit">Feedback opslaan</button>
          </div>
        </form>
      </article>

      <article class="card">
        <h2>Geregistreerde feedback</h2>

        ${state.feedback.length ? `
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Rol</th>
                  <th>Patiënt</th>
                  <th>Categorie</th>
                  <th>Prioriteit</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                ${state.feedback.map(item => `
                  <tr>
                    <td>${formatDateTime(item.date)}</td>
                    <td>${roleLabels[item.role]}</td>
                    <td>${escapeHtml(state.patients.find(patient => patient.id === item.patientId)?.name || patient.name)}</td>
                    <td>${escapeHtml(item.category)}</td>
                    <td>${escapeHtml(item.priority)}</td>
                    <td>${escapeHtml(item.body)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        ` : `<p class="muted">Nog geen feedback geregistreerd.</p>`}
      </article>
    </div>
  `;
}

function renderUat() {
  const uatItems = [
    ["u1", "Huisarts vindt klachten, testresultaten, voorgeschiedenis en exacerbaties binnen één minuut."],
    ["u2", "Huisarts voegt minimaal één nieuw testresultaat toe en vindt dit terug."],
    ["u3", "Huisarts vult de vaste verwijslijst volledig in."],
    ["u4", "Bericht of verwijzing wordt verstuurd en is terug te vinden bij de ontvangende rol."],
    ["u5", "Longarts vindt spirometriegegevens, klachtenontwikkeling en voorgeschiedenis binnen één minuut."],
    ["u6", "Longarts voegt diagnostisch gegeven toe en vindt dit terug."],
    ["u7", "Longarts vult behandeladvies in en deelt dit met de huisarts."],
    ["u8", "Fysiotherapeut vindt longfunctie, beweegdoelen, beperkingen en inspanningsklachten binnen één minuut."],
    ["u9", "Huisarts, longarts en fysiotherapeut vinden hun eigen openstaande en afgeronde acties terug."]
  ];

  return `
    <article class="card">
      <div class="card-header">
        <div>
          <h2>Gebruikersacceptatietest</h2>
          <p class="muted">Gebruik deze checklist tijdens de test om te laten zien dat de nieuwe interface aansluit op de eisen.</p>
        </div>
        <span class="badge success">UAT</span>
      </div>

      <div class="checklist">
        ${uatItems.map(([key, text], index) => `
          <div class="checklist-item">
            <span class="badge">${index + 1}</span>
            <div>
              <strong>${text}</strong>
              <div class="actions">
                <span class="status-pill" data-uat="${key}">
                  ${uatButton(key, "open", "Open")}
                  ${uatButton(key, "deels", "Deels gelukt")}
                  ${uatButton(key, "gelukt", "Gelukt")}
                  ${uatButton(key, "niet", "Niet gelukt")}
                </span>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </article>
  `;
}

function uatButton(key, value, label) {
  return `<button class="${state.uat[key] === value ? "active" : ""}" data-uat-key="${key}" data-uat-value="${value}">${label}</button>`;
}

function bindTabEvents() {
  document.querySelectorAll("[data-tab-direct]").forEach(button => {
    button.addEventListener("click", () => setTab(button.dataset.tabDirect));
  });

  document.querySelectorAll("[data-task-toggle]").forEach(button => {
    button.addEventListener("click", () => toggleTask(button.dataset.taskToggle));
  });

  document.querySelectorAll("[data-uat-key]").forEach(button => {
    button.addEventListener("click", () => {
      state.uat[button.dataset.uatKey] = button.dataset.uatValue;
      saveState();
      renderTab();
    });
  });

  const messageForm = document.getElementById("message-form");
  if (messageForm) messageForm.addEventListener("submit", handleMessageSubmit);

  const referralForm = document.getElementById("referral-form");
  if (referralForm) referralForm.addEventListener("submit", handleReferralSubmit);

  const adviceForm = document.getElementById("advice-form");
  if (adviceForm) adviceForm.addEventListener("submit", handleAdviceSubmit);

  const testForm = document.getElementById("test-form");
  if (testForm) testForm.addEventListener("submit", handleTestSubmit);

  const diagnosticForm = document.getElementById("diagnostic-form");
  if (diagnosticForm) diagnosticForm.addEventListener("submit", handleDiagnosticSubmit);

  const physioForm = document.getElementById("physio-form");
  if (physioForm) physioForm.addEventListener("submit", handlePhysioSubmit);

  const feedbackForm = document.getElementById("feedback-form");
  if (feedbackForm) feedbackForm.addEventListener("submit", handleFeedbackSubmit);
}

function toggleTask(taskId) {
  const task = state.tasks.find(item => item.id === taskId);
  if (!task) return;

  task.status = task.status === "afgerond" ? "open" : "afgerond";
  saveState();

  showToast(task.status === "afgerond" ? "Taak afgerond." : "Taak heropend.");
  renderTab();
}

function handleMessageSubmit(event) {
  event.preventDefault();

  const form = new FormData(event.currentTarget);

  state.messages.push({
    id: uid("m"),
    patientId: state.selectedPatientId,
    from: state.currentRole,
    to: form.get("to"),
    type: form.get("type"),
    subject: form.get("subject"),
    body: form.get("body"),
    date: new Date().toISOString(),
    secure: true,
    read: false
  });

  addTaskForMessage(form.get("to"), form.get("type"), form.get("subject"));

  saveState();
  showToast("Bericht opgeslagen en zichtbaar voor de ontvangende rol.");
  renderTab();
}

function handleReferralSubmit(event) {
  event.preventDefault();

  const form = new FormData(event.currentTarget);

  const body = [
    `Spirometrie: ${form.get("spirometry")}`,
    `Voorgeschiedenis: ${form.get("history")}`,
    `Klachtenontwikkeling: ${form.get("complaints")}`,
    `Vraag: ${form.get("question")}`
  ].join("\n\n");

  state.messages.push({
    id: uid("m"),
    patientId: state.selectedPatientId,
    from: "huisarts",
    to: "longarts",
    type: "Verwijzing",
    subject: "Vaste verwijzing huisarts naar longarts",
    body,
    date: new Date().toISOString(),
    secure: true,
    read: false
  });

  state.tasks.push({
    id: uid("t"),
    role: "longarts",
    patientId: state.selectedPatientId,
    title: "Nieuwe verwijzing beoordelen",
    status: "open",
    process: "Diagnostiek",
    due: new Date().toISOString().slice(0, 10),
    note: "Verwijzing via vaste invullijst ontvangen. Beoordeel spirometrie, voorgeschiedenis en klachtenontwikkeling."
  });

  state.uat.u3 = "gelukt";
  state.uat.u4 = "gelukt";

  saveState();
  showToast("Verwijzing gedeeld met longarts en taak aangemaakt.");
  renderTab();
}

function handleAdviceSubmit(event) {
  event.preventDefault();

  const form = new FormData(event.currentTarget);

  const body = [
    `Longfunctie: ${form.get("lungFunction")}`,
    `Diagnose/GOLD: ${form.get("gold")}`,
    `Beperkingen: ${form.get("limitations")}`,
    `Doelen/aandachtspunten: ${form.get("goals")}`
  ].join("\n\n");

  state.messages.push({
    id: uid("m"),
    patientId: state.selectedPatientId,
    from: "longarts",
    to: "huisarts",
    type: "Behandeladvies",
    subject: "Behandeladvies longarts",
    body,
    date: new Date().toISOString(),
    secure: true,
    read: false
  });

  state.tasks.push({
    id: uid("t"),
    role: "huisarts",
    patientId: state.selectedPatientId,
    title: "Behandeladvies longarts verwerken",
    status: "terugkoppelen",
    process: "Zorgplan",
    due: new Date().toISOString().slice(0, 10),
    note: "Controleer behandeladvies en bepaal follow-up in de eerstelijn."
  });

  state.uat.u7 = "gelukt";

  saveState();
  showToast("Behandeladvies gedeeld met huisarts.");
  renderTab();
}

function handleTestSubmit(event) {
  event.preventDefault();

  const form = new FormData(event.currentTarget);
  const patient = selectedPatient();

  patient.tests.push({
    date: form.get("date"),
    source: "Huisarts",
    type: form.get("type"),
    fev1: Number(form.get("fev1")),
    spo2: Number(form.get("spo2")),
    ccq: Number(form.get("ccq")),
    complaintScore: Number(form.get("complaintScore")),
    note: form.get("note")
  });

  patient.tests.sort((a, b) => new Date(a.date) - new Date(b.date));

  state.uat.u2 = "gelukt";

  saveState();
  showToast("Nieuw testresultaat toegevoegd aan patiëntoverzicht.");
  renderTab();
}

function handleDiagnosticSubmit(event) {
  event.preventDefault();

  const form = new FormData(event.currentTarget);
  const patient = selectedPatient();

  patient.diagnostics.push({
    date: form.get("date"),
    source: "Longarts",
    title: form.get("title"),
    gold: form.get("gold"),
    medication: form.get("medication"),
    note: form.get("note")
  });

  patient.diagnostics.sort((a, b) => new Date(a.date) - new Date(b.date));

  state.uat.u6 = "gelukt";

  saveState();
  showToast("Diagnostisch gegeven toegevoegd aan longarts-overzicht.");
  renderTab();
}

function handlePhysioSubmit(event) {
  event.preventDefault();

  const form = new FormData(event.currentTarget);
  const patient = selectedPatient();

  patient.physioEvaluations.push({
    date: form.get("date"),
    distance: Number(form.get("distance")),
    borg: Number(form.get("borg")),
    note: form.get("note")
  });

  patient.physioEvaluations.sort((a, b) => new Date(a.date) - new Date(b.date));

  saveState();
  showToast("Fysiotherapeutische evaluatie opgeslagen.");
  renderTab();
}

function handleFeedbackSubmit(event) {
  event.preventDefault();

  const form = new FormData(event.currentTarget);

  state.feedback.unshift({
    id: uid("f"),
    patientId: state.selectedPatientId,
    role: state.currentRole,
    category: form.get("category"),
    priority: form.get("priority"),
    body: form.get("body"),
    date: new Date().toISOString()
  });

  saveState();
  showToast("Feedback geregistreerd.");
  renderTab();
}

function addTaskForMessage(role, type, subject) {
  state.tasks.push({
    id: uid("t"),
    role,
    patientId: state.selectedPatientId,
    title: `${type} bekijken: ${subject}`,
    status: "open",
    process: "Communicatie",
    due: new Date().toISOString().slice(0, 10),
    note: `Nieuw bericht ontvangen van ${roleLabels[state.currentRole]}.`
  });
}

function drawCharts() {
  document.querySelectorAll("canvas[data-chart]").forEach(canvas => {
    const patient = selectedPatient();

    if (canvas.dataset.chart === "fev1") {
      drawLineChart(
        canvas,
        patient.tests.map(test => ({
          label: formatDate(test.date).slice(0, 5),
          value: Number(test.fev1),
          second: Number(test.complaintScore)
        })),
        "FEV1 %",
        "Klachtenscore"
      );
    }

    if (canvas.dataset.chart === "physio") {
      drawLineChart(
        canvas,
        patient.physioEvaluations.map(item => ({
          label: formatDate(item.date).slice(0, 5),
          value: Number(item.distance),
          second: Number(item.borg) * 40
        })),
        "6MWT meter",
        "Borg x40"
      );
    }
  });
}

function drawLineChart(canvas, points, labelA, labelB) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(rect.width, 320);
  const height = 230;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);

  const padding = 34;
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  ctx.strokeStyle = "#d9e2ec";
  ctx.lineWidth = 1;

  for (let i = 0; i <= 4; i += 1) {
    const y = padding + (plotHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  ctx.fillStyle = "#65758b";
  ctx.font = "12px system-ui";
  ctx.fillText(labelA, padding, 16);
  ctx.fillText(labelB, padding + 96, 16);

  if (points.length === 0) {
    ctx.fillText("Geen gegevens beschikbaar", padding, height / 2);
    return;
  }

  const values = points.flatMap(point => [point.value, point.second]).filter(Number.isFinite);
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 100);
  const range = Math.max(max - min, 1);

  const xFor = index => points.length === 1 ? width / 2 : padding + (plotWidth / (points.length - 1)) * index;
  const yFor = value => padding + plotHeight - ((value - min) / range) * plotHeight;

  drawSeries(ctx, points.map((point, index) => [xFor(index), yFor(point.value)]), "#176b87");
  drawSeries(ctx, points.map((point, index) => [xFor(index), yFor(point.second)]), "#7d6fb2");

  points.forEach((point, index) => {
    const x = xFor(index);
    ctx.fillStyle = "#65758b";
    ctx.fillText(point.label, x - 14, height - 8);
  });
}

function drawSeries(ctx, series, color) {
  if (!series.length) return;

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;

  ctx.beginPath();

  series.forEach(([x, y], index) => {
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();

  series.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3200);
}

render();
