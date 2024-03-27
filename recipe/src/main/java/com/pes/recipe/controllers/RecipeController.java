package com.pes.recipe.controllers;

import com.pes.recipe.models.Recipe;
import com.pes.recipe.services.FavouriteService;
import com.pes.recipe.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;
    @Autowired
    private FavouriteService favouriteService;


    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @RequestMapping(value = "/rate/{id}/{rating}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public void rateRecipe(@PathVariable("id") Long id, @PathVariable("rating") double rating) {
        recipeService.rateRecipe(id,rating);
    }
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Optional<Recipe> getRecipeById(@PathVariable("id") Long id) {
        return recipeService.getRecipeById(id);
    }
    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        return recipeService.addRecipe(recipe);
    }
    @RequestMapping(value="/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteRecipe(@PathVariable Long id) {
        try {
            favouriteService.deleteFavourite(id);
        }
        catch (RuntimeException e){
        }
        recipeService.deleteRecipe(id);
    }
    @RequestMapping(value="/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public Recipe updateRecipe(@PathVariable("id") Long id, @RequestBody Recipe recipe) {
        return recipeService.modifyRecipe(id, recipe);
    }

}