(() => {
  const catalog = document.getElementById('courseCatalog');
  const courses = Array.isArray(window.courseCatalogData) ? window.courseCatalogData : [];
  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);

  if (!courses.length) {
    catalog.innerHTML = '<article class="course-empty reveal in"><span class="eyebrow">sin contenidos publicados</span><h3>Pronto podrás encontrar los cursos aquí</h3><p>La estructura ya está lista para incorporar las portadas, la información y las lecciones con sus enlaces de Bunny.</p></article>';
    return;
  }

  catalog.innerHTML = courses.map((course, courseIndex) => {
    const lessons = Array.isArray(course.lessons) ? course.lessons : [];
    const cover = course.coverImage ? `<img src="${escapeHtml(course.coverImage)}" alt="Portada de ${escapeHtml(course.title)}">` : '<div class="course-cover-placeholder" aria-label="Portada pendiente">Portada pendiente</div>';
    return `<article class="course-card reveal in"><div class="course-cover">${cover}</div><div class="course-card-content"><span class="eyebrow">${escapeHtml(course.modality || 'Modalidad por confirmar')}</span><h3>${escapeHtml(course.title)}</h3><p>${escapeHtml(course.description)}</p><div class="lesson-list">${lessons.map((lesson, lessonIndex) => `<button class="lesson-button" type="button" data-course="${courseIndex}" data-lesson="${lessonIndex}"><span>${escapeHtml(lesson.number || lessonIndex + 1)}</span><div><b>${escapeHtml(lesson.title)}</b>${lesson.description ? `<small>${escapeHtml(lesson.description)}</small>` : ''}</div><i aria-hidden="true">▶</i></button>`).join('')}</div></div></article>`;
  }).join('');

  catalog.addEventListener('click', event => {
    const button = event.target.closest('.lesson-button');
    if (!button) return;
    const lesson = courses[Number(button.dataset.course)].lessons[Number(button.dataset.lesson)];
    if (!lesson.bunnyUrl) return;
    const player = document.createElement('iframe');
    player.className = 'bunny-player'; player.src = lesson.bunnyUrl; player.title = lesson.title; player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture'; player.allowFullscreen = true;
    const current = catalog.querySelector('.bunny-player'); if (current) current.remove();
    button.insertAdjacentElement('afterend', player);
  });
})();
