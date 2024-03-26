package com.pes.recipe.services;

import com.pes.recipe.models.Favourite;
import com.pes.recipe.models.Recipe;
import com.pes.recipe.repositories.FavouriteRepository;
import com.pes.recipe.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Favourite> getFavouriteByRecipeId(Long id) {
        Optional<Favourite> optionalFavourite = favouriteRepository.getFavouriteFromRecipeId(id);
        return optionalFavourite.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    public Favourite addFavourite(Long id) {
        Recipe recipe = recipeRepository.findById(id).orElseThrow(()->new RuntimeException("Recipe does not exist"));
        Favourite favourite = new Favourite();
        favourite.setRecipe(recipe);
        return favouriteRepository.save(favourite);
    }
    public void deleteFavourite(Long id) {
        Favourite favourite = favouriteRepository.getFavouriteFromRecipeId(id).orElseThrow(() -> new RuntimeException(String.format("Favorite not found %d", id)));
        favouriteRepository.delete(favourite);
    }

}
