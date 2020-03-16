import axios from 'axios';

async function getResults(query) {
    try {
        const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
        const recipe = res.data.recipe;
        console.log(recipe);
    } catch (err) {
        alert(err);
    }
}
getResults('pasta');