/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
export default class Popup {
  constructor() {
    this.hidePopup = this.hidePopup.bind(this);
    this.createPopup = this.createPopup.bind(this);
  }

  createPopup() {
    this.popupContainer = document.createElement('div');
    this.popupContainer.classList.add('popup');

    this.popupContainer.innerHTML = `
      <div class="popup__body">
        <div class="popup__content">
          <h3 class="popup__title">Добавить тикет</h3>
          <form class="form">
            <div class="form__row">
              <label class="form__group">
                <span class="form-group__hint">Краткое описание</span>
                <input type="text" class="form-group__field" required>
              </label>
            </div>
            <div class="form__row">
              <label class="form__group">
                  <span class="form-group__hint">Подробное описание</span>
                  <textarea type="text" class="form-group__field form-group__textbox"></textarea>
              </label>
            </div>
            <div class="form__row">
              <div class="form__control">
                <button class="form-control__button button button__cancel">Отмена</button>
                <button class="form-control__button button button__save">Ok</button>
              </div>
            </div>
          </form> 
        </div>
      </div>
    `;

    this.form = this.popupContainer.querySelector('form');
    this.title = this.form.querySelector('input.form-group__field');
    this.description = this.form.querySelector('textarea.form-group__field');
    this.cancelBtn = this.form.querySelector('.button__cancel');
    this.saveBtn = this.form.querySelector('.button__save');

    this.popupContainer.addEventListener('click', this.onClickOver.bind(this));
  }

  showPopup(fn, elem) {
    document.body.appendChild(this.popupContainer);
    this.cancelBtn.addEventListener('click', this.hidePopup);

    if (elem) {
      this.title.value = elem.title;
      this.description.value = elem.description;
    }

    this.form.addEventListener('submit', this.check.bind(this, fn));
  }

  createWarning(fn) {
    this.popupContainer = document.createElement('div');
    this.popupContainer.classList.add('popup');

    this.popupContainer.innerHTML = `
      <div class="popup__body">
        <div class="popup__content">
            <h3 class="popup__title">Удалить тикет</h3>
            <span class="form-group__hint">Вы уверены, что хотите удалить тикет? Это действие необратимо.</span>
            <div class="form__row">
              <div class="form__control">
                <button class="form-control__button button button__cancel">Отмена</button>
                <button class="form-control__button button button__save">Ok</button>
              </div>
            </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.popupContainer);
    this.cancelBtn = this.popupContainer.querySelector('.button__cancel');
    this.saveBtn = this.popupContainer.querySelector('.button__save');

    this.cancelBtn.addEventListener('click', this.hidePopup);
    this.saveBtn.addEventListener('click', fn);
    this.popupContainer.addEventListener('click', this.onClickOver.bind(this));
  }

  hidePopup() {
    this.popupContainer.remove();
  }

  check(fn, e) {
    e.preventDefault();
    if (!this.title.value && !this.description.value) return;
    fn();
  }

  onClickOver(e) {
    if (!e.target.classList.contains('popup__body')) return;

    e.preventDefault();
    this.hidePopup();
  }
}