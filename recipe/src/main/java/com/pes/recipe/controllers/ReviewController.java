package com.pes.recipe.controllers;

import com.pes.recipe.models.Favourite;
import com.pes.recipe.models.Review;
import com.pes.recipe.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Optional<Review> getReviewById(@PathVariable("id") Long id) {
        return reviewService.getReviewById(id);
    }
    @RequestMapping(value= "/{recipeid}",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Review addReview(@PathVariable("recipeid") Long recipeId, @RequestBody Review review) {
        return reviewService.addReview(recipeId, review);
    }
    @RequestMapping(value="/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteFavourite(@PathVariable Long id) {
        reviewService.deleteReview(id);
    }

}