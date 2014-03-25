(function(d) {
  // development
  // var base = 'http://127.0.0.1:8000/me/bookmarks';
  // online
  var base = '//yuehu.io/me/bookmarks';

  if (!d.getElementById('yuehu-bookmark-style')) {
    var link = d.createElement('link');
    link.id = 'yuehu-bookmark-style';
    link.rel = 'stylesheet';
    var t = parseInt(new Date().valueOf() / 100000);
    link.href = '//dn-yuehu.qbox.me/assets/bookmark.css?t=' + t;
    d.body.appendChild(link);
  }

  var notice = d.createElement('div');
  notice.className = 'yuehu-bookmark-notice';
  notice.innerHTML = '<div class="yuehu-bookmark-loading"><span class="dot dot-0"></span><span class="dot dot-1"></span><span class="dot dot-2"></span></div>';
  d.body.appendChild(notice);

  // find page url
  var pageURL = location.href;
  var links = d.getElementsByTagName('link');
  for (var i=0; i<links.length; i++) {
    if (links[i].getAttribute('rel') === 'canonical') {
      pageURL = links[i].getAttribute('href');
    }
  }
  if (pageURL.charAt(0) === '/') {
    pageURL = location.hostname + pageURL;
  }
  if (!/^https?\:\/\//.test(pageURL)) {
    pageURL = 'http://' + pageURL;
  }

  var script = d.createElement('script');
  script.src = base + '?via=bookmark&url=' + pageURL;

  // bookmark callback
  window._yuehu_bookmark = function(resp) {
    if (resp.location) {
      location.href = resp.location;
    } else {
      notice.innerHTML = resp.message;
      setTimeout(function() {
        if (notice.parentNode) {
          notice.parentNode.removeChild(notice);
        }
      }, 2000);
    }
    d.body.removeChild(script);
  };

  d.body.appendChild(script);
})(document);
