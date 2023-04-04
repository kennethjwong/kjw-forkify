// https://forkify-api.herokuapp.com/v2
import View from './View';
///////////////////////////////////////
class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const res = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return res;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
