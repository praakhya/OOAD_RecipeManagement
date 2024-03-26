package com.pes.recipe.repositories;

import com.pes.recipe.models.Favourite;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface FavouriteRepository extends CrudRepository<Favourite, Long> {
    @Query("select f from Favourite f where f.recipe.id = :id")
    Optional<Favourite> getFavouriteFromRecipeId(Long id);
}
