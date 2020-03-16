import Search from './models/Search';
import {elements} from './views/Base';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';
const state = {};
const controlSearch = async () => {
    const query = searchView.getInput();
    if (query) {
        state.search = new Search(query);
        await state.search.getResults();
        searchView.clearResults();
        searchView.renderResults(state.search.result);
        searchView.clearInput();
    }
}

const controlRecipe = async ()  => {
    const id = window.location.hash.replace('#', '');
    console.log(id);
    if (id) {
        try {
            state.recipe = new Recipe(id);
            await state.recipe.getrecipe();
            state.recipe.calcTime();
            state.recipe.calcServings();
            console.log(state.recipe);
        } catch (err) {
            console.log(err);
        }
    }
}

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});

