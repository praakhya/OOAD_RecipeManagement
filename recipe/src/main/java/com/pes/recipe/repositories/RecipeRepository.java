package com.pes.recipe.repositories;

import com.pes.recipe.models.Recipe;
import org.springframework.data.repository.CrudRepository;

public interface RecipeRepository extends CrudRepository<Recipe, Long> {
}
