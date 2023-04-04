import View from './View';
import icons from 'url:../../img/icons.svg'; // for parcel 2, preceed with url:

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMsg = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
  _msg = ``;

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(res) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
        <a class="preview__link ${
          res.id === id ? 'preview__link--active' : ''
        }" href="#${res.id}">
        <figure class="preview__fig">
            <img src="${res.image}" alt="${res.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${res.title}</h4>
            <p class="preview__publisher">${res.publisher}</p>
            <div class="preview__user-generated ${res.key ? '' : 'hidden'}">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg>
            </div>
        </div>
        </a>
    </li>
    `;
  }
}

export default new BookmarkView();
