package com.pes.recipe.services;

import com.pes.recipe.models.Recipe;
import com.pes.recipe.models.Review;
import com.pes.recipe.repositories.FavouriteRepository;
import com.pes.recipe.repositories.RecipeRepository;
import com.pes.recipe.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private RecipeRepository recipeRepository;
    public Iterable<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }
    public Review addReview(Long id, Review review) {
        if (review.getId() == null) {
            Recipe recipe = recipeRepository.findById(id).orElseThrow(()->new RuntimeException("Recipe does not exist"));
            review.setRecipe(recipe);
            if (recipe.getReviews() == null) {
                recipe.setReviews(new ArrayList<>());
            }
            Review reviewNew = reviewRepository.save(review);
            recipe.getReviews().add(reviewNew);
            recipeRepository.save(recipe);
            return reviewNew;
        }
        else throw new RuntimeException("Review with this ID already exists");
    }
    public void deleteReview(Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found."));
        reviewRepository.deleteById(id);
/*        if (review.getId() == null) {
            Recipe recipe = recipeRepository.findById(id).orElseThrow(()->new RuntimeException("Recipe does not exist"));
            if (recipe.getReviews() == null) {
                recipe.setReviews(new ArrayList<>());
            }
            Review reviewNew = reviewRepository.save(review);
            recipe.getReviews().add(reviewNew);
            recipeRepository.save(recipe);
            return reviewNew;
        }*/
    }

}
