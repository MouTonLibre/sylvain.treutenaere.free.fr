(function() {
  var n, navi;

  n = document.getElementById('navigation');

  navi = function() {
    var t;
    if (window.innerWidth < 720 && (document.getElementById("toggle-nav") == null)) {
      n.classList.add('is-closed');
      n.insertAdjacentHTML('afterBegin', '<div id="toggle-nav"><p class="visually-hidden">&#9776;</p></div>');
      t = document.getElementById('toggle-nav');
      t.onclick = function() {
        return n.classList.toggle('is-closed');
      };
    }
    if (window.innerWidth >= 720 && document.getElementById("toggle-nav")) {
      n.classList.remove('is-closed');
      return document.getElementById("toggle-nav").outerHTML = "";
    }
  };

  navi();

  window.addEventListener('resize', navi);

}).call(this);
