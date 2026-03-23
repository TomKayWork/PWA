/* ===== Accordion Toggle ===== */
document.addEventListener('click', function(e) {
  var trigger = e.target.closest('.accordion__trigger');
  if (!trigger) return;
  var item = trigger.closest('.accordion__item');
  if (!item) return;
  item.classList.toggle('accordion__item--open');
});

/* ===== Tab Switching ===== */
document.addEventListener('click', function(e) {
  var tab = e.target.closest('.tabs__tab');
  if (!tab) return;
  var tabsContainer = tab.closest('.tabs');
  var target = tab.getAttribute('data-tab');

  tabsContainer.querySelectorAll('.tabs__tab').forEach(function(t) {
    t.classList.remove('tabs__tab--active');
  });
  tab.classList.add('tabs__tab--active');

  if (target) {
    document.querySelectorAll('.tab-panel').forEach(function(p) {
      p.classList.remove('tab-panel--active');
    });
    var targetPanel = document.getElementById(target);
    if (targetPanel) targetPanel.classList.add('tab-panel--active');
  }
});

/* ===== Dependant Pill Switching ===== */
document.addEventListener('click', function(e) {
  var pill = e.target.closest('.dependant-pill');
  if (!pill) return;
  var container = pill.closest('.dependant-pills');
  container.querySelectorAll('.dependant-pill').forEach(function(p) {
    p.classList.remove('dependant-pill--active');
  });
  pill.classList.add('dependant-pill--active');

  var target = pill.getAttribute('data-dependant');
  if (target) {
    document.querySelectorAll('.dependant-panel').forEach(function(dp) {
      dp.classList.remove('dependant-panel--active');
    });
    var targetPanel = document.getElementById(target);
    if (targetPanel) targetPanel.classList.add('dependant-panel--active');
  }
});

/* ===== Onboarding Carousel ===== */
function initCarousel() {
  var carousel = document.querySelector('.onboarding-carousel');
  if (!carousel) return;

  var slides = carousel.querySelectorAll('.carousel__slide');
  var dots = carousel.querySelectorAll('.carousel__dot');
  var nextBtn = carousel.querySelector('.carousel__next');
  var skipBtn = carousel.querySelector('.carousel__skip');
  var current = 0;

  function showSlide(index) {
    slides.forEach(function(s, i) {
      s.classList.toggle('carousel__slide--active', i === index);
    });
    dots.forEach(function(d, i) {
      d.classList.toggle('carousel__dot--active', i === index);
    });
    current = index;
    if (nextBtn) {
      if (current === slides.length - 1) {
        nextBtn.textContent = 'Get started';
      } else {
        nextBtn.innerHTML = 'Next <span class="arrow">\u2197</span>';
      }
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (current < slides.length - 1) {
        showSlide(current + 1);
      } else {
        window.location.href = 'terms.html';
      }
    });
  }

  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() { showSlide(i); });
  });

  if (skipBtn) {
    skipBtn.addEventListener('click', function() {
      window.location.href = 'terms.html';
    });
  }

  showSlide(0);
}

/* ===== Terms Acceptance ===== */
function initTerms() {
  var checkboxes = document.querySelectorAll('.terms-check');
  var acceptBtn = document.querySelector('.terms-accept');
  if (!acceptBtn || checkboxes.length === 0) return;

  function updateAccept() {
    var allChecked = Array.from(checkboxes).every(function(cb) { return cb.checked; });
    acceptBtn.disabled = !allChecked;
    acceptBtn.style.opacity = allChecked ? '1' : '0.5';
  }

  checkboxes.forEach(function(cb) {
    cb.addEventListener('change', updateAccept);
  });
  updateAccept();

  acceptBtn.addEventListener('click', function() {
    if (!acceptBtn.disabled) {
      window.location.href = 'dashboard.html';
    }
  });
}

/* ===== Signature Tabs ===== */
document.addEventListener('click', function(e) {
  var sigTab = e.target.closest('.signature-tabs button');
  if (!sigTab) return;
  var container = sigTab.closest('.signature-tabs');
  container.querySelectorAll('button').forEach(function(b) {
    b.classList.remove('active');
  });
  sigTab.classList.add('active');
});

/* ===== Member Radio Selector ===== */
document.addEventListener('change', function(e) {
  if (!e.target.matches('.member-radio input[type="radio"]')) return;
  var container = e.target.closest('.member-selector');
  container.querySelectorAll('.member-radio').forEach(function(mr) {
    mr.classList.remove('member-radio--active');
  });
  e.target.closest('.member-radio').classList.add('member-radio--active');
});

/* ===== Info Banner Dismiss ===== */
document.addEventListener('click', function(e) {
  var closeBtn = e.target.closest('.info-banner__close');
  if (!closeBtn) return;
  var banner = closeBtn.closest('.info-banner');
  if (banner) {
    banner.style.transition = 'opacity 0.2s, margin 0.2s';
    banner.style.opacity = '0';
    setTimeout(function() { banner.remove(); }, 200);
  }
});

/* ===== Policy Filter Toggle ===== */
document.addEventListener('click', function(e) {
  var filter = e.target.closest('.policy-filter');
  if (!filter) return;
  filter.classList.toggle('policy-filter--active');
});

/* ===== Mobile Sidebar Toggle ===== */
function initMobileSidebar() {
  var toggle = document.querySelector('.topbar__mobile-menu');
  var sidebar = document.querySelector('.sidebar');
  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', function() {
    sidebar.classList.toggle('sidebar--open');
  });
}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', function() {
  initCarousel();
  initTerms();
  initMobileSidebar();
});
