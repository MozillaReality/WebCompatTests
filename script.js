(function () {
  let hiddenSections = {};
  try {
    JSON.parse(localStorage.hidden_sections || '[]').forEach(sectionId => {
      hiddenSections[sectionId] = true;
      const sectionEl = document.getElementById(sectionId);
      if (!sectionEl) {
        return;
      }
      const sectionListEl = sectionEl.querySelector('ol, ul');
      if (!sectionListEl) {
        return;
      }
      sectionListEl.hidden = true;
    });
  } catch (err) {
  }
  window.addEventListener('click', evt => {
    const target = evt.target;
    if (!target || !target.closest('h2')) {
      return;
    }
    const targetSectionEl = target.closest('section');
    if (!targetSectionEl) {
      return;
    }
    const targetSectionListEl = targetSectionEl.querySelector('ol, ul');
    targetSectionListEl.hidden = !targetSectionListEl.hidden;
    const isNowHidden = targetSectionEl.dataset.hidden = targetSectionListEl.hidden;
    hiddenSections[targetSectionEl.id] = isNowHidden;
    try {
      localStorage.hidden_sections = JSON.stringify(Object.keys(hiddenSections).filter(key => hiddenSections[key] === true));
    } catch (err) {
    }
  });
})();
