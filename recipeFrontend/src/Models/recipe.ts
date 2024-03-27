import { Review } from "./review"
export class Recipe {
    id:Number|null|undefined = 0;
    title:String|null|undefined = "";
    ingredients:String[]|null|undefined = []
    instructions:String[]|null|undefined = []
    cookingTime:Number|null|undefined = 0
    difficultyLevel:String|null|undefined =""
    averageRating:Number|null|undefined = 0
    reviews:Review[]|null|undefined = []
}
