package com.pes.recipe.repositories;

import com.pes.recipe.models.Favourite;
import com.pes.recipe.models.Review;
import org.springframework.data.repository.CrudRepository;

public interface ReviewRepository extends CrudRepository<Review, Long> {
}
