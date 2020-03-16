import axios from "axios";
export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getrecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.url = res.data.recipe.spurce_url;
            this.ingredients = res.data.recipe.ingredients;
            //console.log(res.data.recipe.image_url);
        } catch (err) {
            console.log(err);
            alert(err);
        }
    }
    calcTime() {
        const numIng = this.ingredients.lenght;
        const periods = Math.ceil(numIng /3);
        this.time = periods * 15;
    }
    calcServings() {
        this.servings = 4;
    }
}
