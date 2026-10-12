/* =========================================================
   MAKERS — Interacciones mínimas
   1. Menú móvil
   2. Filtros de proyectos (proyectos.html)
   3. Pestañas de ordenar (proyectos.html)
   4. Galería (proyecto.html)
   5. Pestañas de información (proyecto.html)
   6. Botón "Guardar proyecto" (proyecto.html)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* 1. Menú móvil ---------------------------------------- */
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
  }

  /* 2. Filtros por categoría ----------------------------- */
  const filterPanel = document.getElementById("filter-panel");
  const cards = document.querySelectorAll(".project-card");
  const emptyMsg = document.getElementById("empty-msg");
  if (filterPanel && cards.length) {
    filterPanel.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      filterPanel.querySelectorAll("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");

      const filter = btn.dataset.filter;
      let visibles = 0;
      cards.forEach((card) => {
        const show = filter === "todos" || card.dataset.category === filter;
        card.hidden = !show;
        if (show) visibles++;
      });
      if (emptyMsg) emptyMsg.hidden = visibles > 0;
    });
  }

  /* 3. Pestañas de ordenar (solo cambian el estado visual) */
  const sortTabs = document.getElementById("sort-tabs");
  if (sortTabs) {
    sortTabs.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      sortTabs.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
    });
  }

  /* 4. Galería ------------------------------------------- */
  const mainImg = document.getElementById("gallery-main");
  const thumbs = document.querySelectorAll(".gallery__thumbs button");
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      mainImg.src = thumb.dataset.full;
      mainImg.alt = thumb.querySelector("img").alt;
      thumbs.forEach((t) => t.removeAttribute("aria-current"));
      thumb.setAttribute("aria-current", "true");
    });
  });

  /* 5. Pestañas de información --------------------------- */
  const tabs = document.querySelectorAll(".tabs__tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        const active = t === tab;
        t.setAttribute("aria-selected", String(active));
        t.tabIndex = active ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !active;
      });
    });
  });

  /* 6. Guardar proyecto ---------------------------------- */
  const saveBtn = document.getElementById("save-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const saved = saveBtn.getAttribute("aria-pressed") === "true";
      saveBtn.setAttribute("aria-pressed", String(!saved));
      saveBtn.textContent = saved ? "Guardar proyecto" : "Proyecto guardado";
    });
  }
});
