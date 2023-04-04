// import icons from 'url:../img/icons.svg'; // for parcel 2
import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import { DEBUG } from './config.js';

// const recipeContainer = document.querySelector('.recipe');

// if (module.hot) module.hot.accept();

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    // 1 Update results view to mark selected search item
    resultView.render(model.getSearchResultsPage());
    // resultView.update(model.getSearchResultsPage());
    // 2 updating bookmark view
    bookmarkView.update(model.state.bookmarks);
    // 3 Loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;
    // 4 Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // console.log(resultView);
    // 1 Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2 load search results
    await model.loadSearchResults(query);
    // 3 render results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage());
    // 4 render init pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = function (goToPage) {
  resultView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (serv) {
  // update recipe serving (in state)
  model.updateServings(serv);
  // update recipe view
  recipeView.render(model.state.recipe);
  // recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1  Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2 update recipe view
  recipeView.update(model.state.recipe);
  // 3 render bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();
    // upload new recipe data
    await model.uploadRecipe(newRecipe);
    if (DEBUG) console.log(model.state.recipe);
    // render recipe
    recipeView.render(model.state.recipe);
    // success message
    addRecipeView.renderMsg();

    // render bookmark view
    bookmarkView.render(model.state.bookmarks);
    // change url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
    // reload page
    location.reload();
  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
