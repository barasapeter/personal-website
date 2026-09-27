(function () {
      function settle(img, failed) {
        var box = img.parentElement;
        if (box && box.classList.contains('media')) {
          box.classList.add(failed ? 'is-error' : 'is-loaded');
        }
      }

      var imgs = document.querySelectorAll('.media > img');

      Array.prototype.forEach.call(imgs, function (img) {
        if (img.complete) {
          settle(img, img.naturalWidth === 0);
          return;
        }

        img.addEventListener('load', function () { settle(img, false); }, { once: true });
        img.addEventListener('error', function () { settle(img, true); }, { once: true });
      });
    })();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        document.documentElement.classList.remove('fonts-loading');
      });
    } else {
      document.documentElement.classList.remove('fonts-loading');
    }

    (function () {
      var header = document.querySelector('header.nav');
      if (!header) return;

      function sync() {
        document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
      }

      sync();
      window.addEventListener('load', sync);
      window.addEventListener('orientationchange', sync);

      if ('ResizeObserver' in window) {
        new ResizeObserver(sync).observe(header);
      } else {
        window.addEventListener('resize', sync);
      }
    })();

    (function () {
      var menuBtn = document.getElementById('menuBtn');
      var sidebar = document.getElementById('sidebar');
      var overlay = document.getElementById('sidebarOverlay');
      var body = document.body;

      function openMenu() {
        sidebar.classList.add('open');
        overlay.classList.add('open');
        sidebar.setAttribute('aria-hidden', 'false');
        menuBtn.setAttribute('aria-expanded', 'true');
        menuBtn.setAttribute('aria-label', 'Close menu');
        body.classList.add('sidebar-locked');
      }

      function closeMenu() {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        sidebar.setAttribute('aria-hidden', 'true');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open menu');
        body.classList.remove('sidebar-locked');
      }

      menuBtn.addEventListener('click', function () {
        sidebar.classList.contains('open') ? closeMenu() : openMenu();
      });

      overlay.addEventListener('click', closeMenu);

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });

      sidebar.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });
    })();

    (function () {
      var links = Array.prototype.slice.call(document.querySelectorAll('nav.links a'));
      if (!links.length) return;

      var localLinks = links.filter(function (link) {
        return new URL(link.href, window.location.href).pathname === window.location.pathname;
      });

      function setActive(link) {
        links.forEach(function (item) { item.classList.remove('active'); });
        if (link) link.classList.add('active');
      }

      if (!localLinks.length) {
        var projectsLink = links.find(function (link) {
          return new URL(link.href, window.location.href).pathname.endsWith('/projects.html');
        });
        setActive(projectsLink);
        return;
      }

      function activeFromHash() {
        var hash = window.location.hash;
        var match = hash && localLinks.find(function (link) {
          return new URL(link.href, window.location.href).hash === hash;
        });
        setActive(match || localLinks[0]);
      }

      activeFromHash();
      window.addEventListener('hashchange', activeFromHash);

      var targets = localLinks.map(function (link) {
        var id = new URL(link.href, window.location.href).hash.slice(1);
        return { link: link, element: id && document.getElementById(id) };
      }).filter(function (item) { return item.element; });

      if (!targets.length || !('IntersectionObserver' in window)) return;

      var visible = [];
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var item = targets.find(function (target) { return target.element === entry.target; });
          if (!item) return;
          if (entry.isIntersecting) {
            if (visible.indexOf(item) === -1) visible.push(item);
          } else {
            visible = visible.filter(function (target) { return target !== item; });
          }
        });
        if (visible[0]) setActive(visible[0].link);
      }, { rootMargin: '-18% 0px -68% 0px' });

      targets.forEach(function (item) { observer.observe(item.element); });
    })();
