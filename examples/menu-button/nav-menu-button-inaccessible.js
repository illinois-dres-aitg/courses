class MenuButtonLinks {

  constructor(domNode) {

    this.domNode       = domNode;
    this.buttonNode    = domNode.querySelector('button');
    this.menuNode      = domNode.querySelector('ul');

    this.buttonNode.addEventListener('click', this.onButtonClick.bind(this));
    this.buttonNode.addEventListener('blur', this.onBlur.bind(this));

    const links = domNode.querySelectorAll('a');
    for (let i = 0; i < links.length; i += 1) {
      links[i].addEventListener('blur', this.onBlur.bind(this));
    }
    window.addEventListener('mousedown', this.onBackgroundMousedown.bind(this), true);
  }

  // Popup menu methods

  openPopup() {
    var rect = this.menuNode.getBoundingClientRect();
    this.menuNode.style.display = 'block';
    this.buttonNode.classList.add('open');
  }

  closePopup() {
    if (this.isOpen()) {
      this.buttonNode.classList.remove('open');
      this.menuNode.style.display = 'none';
    }
  }

  isOpen() {
    return this.buttonNode.classList.contains('open');
  }

  onButtonClick(event) {
    if (this.isOpen()) {
      this.closePopup();
    }
    else {
      this.openPopup();
    }

    event.stopPropagation();
    event.preventDefault();
  }

  onBlur(event) {
    if (!this.domNode.contains(event.relatedTarget)) {
      if (this.isOpen()) {
        this.closePopup();
      }
    }
  }

  onBackgroundMousedown(event) {
    if (!this.domNode.contains(event.target)) {
      if (this.isOpen()) {
        this.closePopup();
        this.buttonNode.focus();
      }
    }
  }
}

// Initialize navigation menu buttons

window.addEventListener('load', function () {
  var menuButtons = document.querySelectorAll('.menu-button-links');
  for(var i=0; i < menuButtons.length; i++) {
    var menuButton = new MenuButtonLinks(menuButtons[i]);
  }
});
