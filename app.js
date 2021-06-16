var timeInterval = '5000'; // Time between slides
var slider = document.querySelector('#slides-items');
var items = document.querySelectorAll('.slide-item');
var exitBtn = document.querySelector('#exitBtn');
var rotationBtn = document.querySelector('#rotationBtn');

if (
  slider !== undefined &&
  items !== undefined &&
  slider !== null &&
  items !== null
) {
  var btnprev = document.querySelector('.slides-prev');
  var btnnext = document.querySelector('.slides-next');
  var itemscount = items.length;

  if (itemscount > 1) {
    //Create display pagination
    var paginationIndex = 1;
    var paginationDisplay = document.createElement('div');
    paginationDisplay.classList.add('slides-items__number');
    slider.parentNode.insertBefore(paginationDisplay, slider.nextSibling);
    paginationDisplay.insertAdjacentHTML(
      'beforeend',
      `${paginationIndex}/${itemscount}`
    );

    var pagination = document.querySelector('.slides-items__number');
    var playpause = null;

    function slidenext() {
      var itemcurrent = document.querySelector('.slideactive');
      var nextslide = itemcurrent.nextElementSibling;
      if (nextslide === null) {
        nextslide = items[0];
        paginationIndex = 0; // Reset pagination Index to 0
      }
      // Refresh UI pagination && Clean UI
      pagination.innerHTML = '';
      paginationIndex++;
      paginationDisplay.insertAdjacentHTML(
        'beforeend',
        `${paginationIndex}/${itemscount}`
      );
      // Remove current
      itemcurrent.classList.remove('slideactive');

      // Add Next
      nextslide.classList.add('slideactive');
    }

    function slideprev() {
      var itemcurrent = document.querySelector('.slideactive');
      var prevslide = itemcurrent.previousElementSibling;
      if (prevslide === null) {
        prevslide = items[itemscount - 1];
        paginationIndex = itemscount + 1; // Reset pagination Index to items.length + 1
      }
      // Refresh UI pagination && Clean UI
      pagination.innerHTML = '';
      paginationIndex--;
      paginationDisplay.insertAdjacentHTML(
        'beforeend',
        `${paginationIndex}/${itemscount}`
      );

      // Remove current
      itemcurrent.classList.remove('slideactive');

      // Add Next
      prevslide.classList.add('slideactive');
    }

    function slidepause() {
      clearInterval(playpause);
      playpause = null;
      slider.setAttribute('aria-live', 'polite');
    }
    function slideplay() {
      playpause = setInterval(slidenext, timeInterval);
      slider.removeAttribute('aria-live');
    }

    // Navigate
    btnprev.addEventListener('click', slideprev);
    btnnext.addEventListener('click', slidenext);

    // Keyboard Navigate
    slider.addEventListener('keydown', keyHandler);
    function keyHandler(e) {
      // Left Arrow
      if (e.keyCode === 37 || (e.ctrlKey && e.keyCode === 37)) {
        e.preventDefault();
        slideprev();
      }
      // Right Arrow
      if (e.keyCode === 39 || (e.ctrlKey && e.keyCode === 39)) {
        e.preventDefault();
        slidenext();
      }
      // Space
      if (e.keyCode === 32) {
        e.preventDefault();
        // slideplaypause();
      }
    }

    // Animate Slides
    playpause = setInterval(slidenext, timeInterval);

    // Stop slider on keyboard/mouse focus only when slider auto-rotating
    function slidefocusstop() {
      if (!slider.classList.contains('btnpressed')) {
        slidepause();
      }
    }
    function slidefocusplay() {
      if (!slider.classList.contains('btnpressed')) {
        slideplay();
      }
    }

    // function displayFullScreen() {
    //   var sliderContainer = document.querySelector('.slides');
    //   var wrapper = document.createElement('div');

    //   //Add to DOM Full screen div
    //   wrapper.classList.add('full-view');
    //   document.querySelector('.slides-control__exitbtn').style.display =
    //     'block';
    //   document.querySelector('.slides-control__rotation').style.display =
    //     'block';
    //   sliderContainer.parentNode.insertBefore(wrapper, sliderContainer);
    //   wrapper.appendChild(sliderContainer);
    // }

    var elem = document.querySelector('.slides');

    // function escapeFullView() {
    //   var target = document.querySelector('.full-view');
    //   target.parentNode.removeChild(target);
    //   exitBtn.insertAdjacentElement('afterend', elem);
    //   exitBtn.style.display = 'none';
    //   rotationBtn.style.display = 'none';
    // }

    slider.addEventListener('focusin', slidefocusstop);
    slider.addEventListener('focusout', slidefocusplay);
    slider.addEventListener('mouseover', slidefocusstop);
    slider.addEventListener('mouseout', slidefocusplay);

    // slider.addEventListener('click', displayFullScreen);

    // exitBtn.addEventListener('click', escapeFullView);
  } else {
    // if slider got only 1 slide remove buttons controls
    btnprev.parentNode.removeChild(btnprev);
    btnnext.parentNode.removeChild(btnnext);
  }

  //Swipe slider
  var touchstartX = 0;
  var touchendX = 0;

  function handleGesture() {
    if (touchendX < touchstartX) {
      this.slidenext();
    }
    if (touchendX > touchstartX) {
      this.slideprev();
    }
  }

  slider.addEventListener('touchstart', (e) => {
    touchstartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener('touchend', (e) => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
  });
}
