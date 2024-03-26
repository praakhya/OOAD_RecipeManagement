import { Review } from "./review"
export class Recipe {
    id:Number = 0;
    title:String = "";
    ingredients:String[] = []
    instructions:String[] = []
    cookingTime:Number = 0
    difficultyLevel:String =""
    averageRating:Number = 0
    reviews:Review[] = []
}
