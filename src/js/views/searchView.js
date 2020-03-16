import {elements} from './Base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = '';
export const clearResults = () => elements.searchResultList.innerHTML = "";

const renderRecipes = (recipe) => {
    const markup = `
    <li>
        <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipesTitle(recipe.title)}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                </div>
        </a>
    </li>`;
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

const limitRecipesTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.lengh > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.lengh <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.lengh;
        }, 0)
        return `${newTitle.join(' ')}...`;
    }
    return title;
}

export const renderResults = (recipes) => {
    recipes.forEach(renderRecipes);
}