class DisclosureButtonLinks {

  constructor(domNode) {

    this.domNode       = domNode;
    this.buttonNode    = domNode.querySelector('button');
    this.containerNode = domNode.querySelector('ul');

    this.buttonNode.addEventListener('click', this.onButtonClick.bind(this));
    this.buttonNode.addEventListener('blur', this.onBlur.bind(this));

    const links = this.containerNode.querySelectorAll('a');
    for (let i = 0; i < links.length; i += 1) {
      links[i].addEventListener('keydown', this.onLinkKeyDown.bind(this));
      links[i].addEventListener('blur', this.onBlur.bind(this));
    }
    window.addEventListener('mousedown', this.onBackgroundMousedown.bind(this), true);
  }

  // Container methods

  openContainer() {
    this.containerNode.style.display = 'block';
    this.buttonNode.setAttribute('aria-expanded', 'true');
  }

  closeContainer() {
    if (this.isOpen()) {
      this.buttonNode.setAttribute('aria-expanded', 'false');
      this.containerNode.style.display = 'none';
    }
  }

  isOpen() {
    return this.buttonNode.getAttribute('aria-expanded') === 'true';
  }

  onButtonClick(event) {
    if (this.isOpen()) {
      this.closeContainer();
    }
    else {
      this.openContainer();
    }

    event.stopPropagation();
    event.preventDefault();
  }

  onLinkKeyDown(event) {
    if (event.key === 'Esc' || event.key === 'Escape') {
      this.closeContainer();
      this.buttonNode.focus();
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onBlur(event) {
    if (!this.domNode.contains(event.relatedTarget)) {
      if (this.isOpen()) {
        this.closeContainer();
      }
    }
  }

  onBackgroundMousedown(event) {
    if (!this.domNode.contains(event.target)) {
      if (this.isOpen()) {
        this.closeContainer();
        this.buttonNode.focus();
      }
    }
  }
}

// Initialize navigation disclosure buttons

window.addEventListener('load', function () {
  const disclosureButtons = document.querySelectorAll('.disclosure-button-links');
  for(let i = 0; i < disclosureButtons.length; i += 1) {
    new DisclosureButtonLinks(disclosureButtons[i]);
  }
});
