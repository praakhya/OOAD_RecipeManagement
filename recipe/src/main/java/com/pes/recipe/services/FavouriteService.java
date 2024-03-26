package com.pes.recipe.services;

import com.pes.recipe.models.Favourite;
import com.pes.recipe.models.Recipe;
import com.pes.recipe.repositories.FavouriteRepository;
import com.pes.recipe.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FavouriteService {
    @Autowired
    private FavouriteRepository favouriteRepository;
    @Autowired
    private RecipeRepository recipeRepository;
    public Iterable<Favourite> getAllFavourites() {
        return favouriteRepository.findAll();
    }
    public Optional<Favourite> getFavouriteById(Long id) {
        return favouriteRepository.findById(id);
    }
    public Favourite addFavourite(Long id) {
        Recipe recipe = recipeRepository.findById(id).orElseThrow(()->new RuntimeException("Recipe does not exist"));
        Favourite favourite = new Favourite();
        favourite.setRecipe(recipe);
        return favouriteRepository.save(favourite);
    }
    public void deleteFavourite(Long id) {
        Favourite favourite = favouriteRepository.getFavouriteFromRecipeId(id);
        favouriteRepository.delete(favourite);
    }

}
