import Search from './models/Search';
import {elements} from './views/Base';
import * as searchView from './views/searchView';
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

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});