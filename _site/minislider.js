(function() {
  var MiniSlider;

  if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/(\s*)(.*?)(\s*)/mi, '$2');
    };
  }

  MiniSlider = (function() {
    var animation_fade, animation_slide, extend;

    function MiniSlider(conf) {
      var f, i, images, totalImages;
      this.options = {
        delay: 3,
        slideStep: 5
      };
      if (typeof conf === 'string') {
        this.el = document.getElementById(conf);
      } else {
        this.el = document.getElementById(conf['element']);
        this.options = extend(this.options, conf);
      }
      if (this.el == null) {
        throw new Exception('Could not find element with given ID');
      }
      images = this.el.getElementsByTagName('img');
      if (images.length < 2) {
        throw new Exception('Cannot initiate minislider with less than two images');
      }
      i = 0;
      totalImages = images.length;
      while (i < totalImages) {
        images[i].style.zIndex = '0';
        images[i].style.left = '0px';
        images[i].next = images[(i + 1) % totalImages];
        i++;
      }
      this.currentImage = images[0];
      this.currentImage.style.zIndex = '100';
      this.currentImage.next.style.zIndex = '50';
      this.el.setAttribute('class', (this.el.getAttribute('class') || '' + ' minislider').trim());
      f = animation_fade;
      if (this.options.animation === 'slide') {
        f = animation_slide;
      }
      setTimeout((function(_this) {
        return function() {
          return f({
            current: _this.currentImage,
            options: _this.options
          });
        };
      })(this), this.options.delay * 1000);
    }

    animation_slide = function(data) {
      var left;
      left = parseInt(data.current.style.left.replace('px'), 10);
      if (left > data.current.width * -1) {
        data.current.style.left = (left - data.options.slideStep) + 'px';
        return setTimeout(function() {
          return animation_slide(data);
        }, 5);
      } else {
        data.current.style.zIndex = '0';
        data.current.style.left = '0px';
        data.current.next.style.zIndex = '100';
        data.current = data.current.next;
        data.current.next.style.zIndex = '50';
        return setTimeout(function() {
          return animation_slide(data);
        }, data.options.delay * 1000);
      }
    };

    animation_fade = function(data) {
      var fadeSpeed, fadeStep, opacity;
      if ((data.opacity != null)) {
        opacity = data.opacity;
      } else {
        data.opacity = opacity = 100;
      }
      fadeStep = 5;
      fadeSpeed = 15;
      if (opacity - fadeStep >= 0) {
        opacity -= fadeStep;
        data.current.style.opacity = opacity / 100;
        data.current.style.filter = 'alpha(opacity=' + opacity + ')';
        data.opacity = opacity;
        return setTimeout(function() {
          return animation_fade(data);
        }, fadeSpeed);
      } else {
        data.current.style.zIndex = '0';
        data.current.style.opacity = 1;
        data.current.style.filter = 'alpha(opacity=100)';
        data.current.next.style.zIndex = '100';
        data.current = data.current.next;
        data.current.next.style.zIndex = '50';
        data.opacity = 100;
        return setTimeout(function() {
          return animation_fade(data);
        }, data.options.delay * 1000);
      }
    };

    extend = function(a, b) {
      var key, output, value;
      output = {};
      for (key in a) {
        value = a[key];
        output[key] = value;
      }
      for (key in b) {
        value = b[key];
        output[key] = value;
      }
      return output;
    };

    return MiniSlider;

  })();

  window.minislider = function(conf) {
    return new MiniSlider(conf);
  };

}).call(this);
