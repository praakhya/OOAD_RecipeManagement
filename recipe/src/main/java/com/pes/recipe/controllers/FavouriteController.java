package com.pes.recipe.controllers;

import com.pes.recipe.models.Favourite;
import com.pes.recipe.models.Recipe;
import com.pes.recipe.services.FavouriteService;
import com.pes.recipe.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/favourite")
public class FavouriteController {
    @Autowired
    private FavouriteService favouriteService;
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Favourite> getAllFavourites() {
        return favouriteService.getAllFavourites();
    }
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Favourite> getFavouriteByRecipeId(@PathVariable("id") Long id) {
        return favouriteService.getFavouriteByRecipeId(id);
    }
    @RequestMapping(value = "/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Favourite addFavourite(@PathVariable Long id) {
        return favouriteService.addFavourite(id);
    }
    @RequestMapping(value="/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteFavourite(@PathVariable Long id) {
        favouriteService.deleteFavourite(id);
    }

}