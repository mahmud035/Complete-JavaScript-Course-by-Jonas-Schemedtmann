// API: https://forkify-api.herokuapp.com/v2

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';

const controlRecipes = async () => {
  try {
    const recipeId = location.hash.slice(1);

    if (!recipeId) return;

    recipeView.renderSpinner();

    // 1. Loading recipe
    await model.loadRecipe(recipeId);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();

    // 1. Get search query
    const query = searchView.getQuery();

    if (!query) return;

    // 2. Load search results
    await model.loadSearchResult(query);

    // 3. Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1));
  } catch (error) {
    console.error(error);
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
