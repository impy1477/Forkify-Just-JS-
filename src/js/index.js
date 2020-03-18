import Search from './models/Search';
import {elements} from './views/Base';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import List from './models/List';
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

const controlList = () => {
    if (!state.list) state.list = new List();
    state.recipe.ingredients.forEach (el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

const controlRecipe = async ()  => {
    const id = window.location.hash.replace('#', '');
    console.log(id);
    if (id) {
        try {
            recipeView.clearRecipe();
            state.recipe = new Recipe(id);
            await state.recipe.getrecipe();
            state.recipe.parseIngredients();
            state.recipe.calcTime();
            state.recipe.calcServings();
            recipeView.renderRecipe(state.recipe);
        } catch (err) {
            console.log(err);
        }
    }
}

elements.shopping.addEventListener('click', e=> {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    } 
})

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if(state.recipe.servings > 1) {
            state.recipe.updateServeings('dec');
            recipeView.updateSertingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServeings('inc');
        recipeView.updateSertingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    }
    
});
