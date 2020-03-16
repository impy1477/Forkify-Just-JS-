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
    
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const newIngredients = this.ingredients.map(el => {
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            const arrIng = ingredient.split(" ");
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));
            let objIng;
            if(unitIndex > -1) {
                const arrCount = arrIng.slice(0, unitIndex);
                
                let count;
                if (arrCount.lenght === 1) {
                    count = arrIng[0];
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' '),
                };
                
            } else if (parseInt(arrIng[0], 10)) {
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit : "",
                    ingredient: arrIng.slice(1).join(" ")
                }
            } else if (unitIndex === -1) {
                objIng = {
                    count: 1,
                    unit: "",
                    ingredient: ingredient,
                }
            }
            return objIng;
        });
        this.ingredients = newIngredients;
    }
}
