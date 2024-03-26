package com.pes.recipe.services;

import com.pes.recipe.models.Recipe;
import com.pes.recipe.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;
    public Iterable<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }
    public Optional<Recipe> getRecipeById(Long id) {
        return recipeRepository.findById(id);
    }
    public Recipe modifyRecipe(Long id, Recipe recipe) {
        if (recipeRepository.existsById(id)) {
            return recipeRepository.save(recipe);
        }
        else throw new RuntimeException("Entity not found");
    }
    public Recipe addRecipe(Recipe recipe) {
        if (recipe.getId() == null) {
            return recipeRepository.save(recipe);
        }
        else throw new RuntimeException("Entity already exists");
    }
    public void deleteRecipe(Long id) {
        recipeRepository.deleteById(id);
    }
    public void rateRecipe(Long id, double rating){
        Recipe recipe = recipeRepository.findById(id).orElseThrow();
        recipe.setAverageRating((recipe.getAverageRating() + rating) / 2);
        recipeRepository.save(recipe);
    }

}
