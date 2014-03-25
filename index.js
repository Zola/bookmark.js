(function(d) {
  // development
  // var base = 'http://127.0.0.1:8000/me/bookmarks';
  // online
  var base = '//yuehu.io/me/bookmarks';

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

  var createElement = function(tag, className) {
    var el = d.createElement(tag);
    el.className = className;
  };

  var notice = d.createElement('div');
  notice.className = 'yuehu-bookmark-notice';
  notice.innerHTML = '<div class="yuehu-bookmark-loading"><span class="dot dot-0"></span><span class="dot dot-1"></span><span class="dot dot-2"></span></div>';

  var script = d.createElement('script');
  script.src = base + '?via=bookmark&url=' + pageURL;

  if (!d.getElementById('yuehu-bookmark-style')) {
    var link = d.createElement('link');
    link.id = 'yuehu-bookmark-style';
    link.href = '//dn-yuehu.qbox.me/assets/bookmark.css';
    d.body.appendChild(link);
  }

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
  d.body.appendChild(notice);
})(document);
