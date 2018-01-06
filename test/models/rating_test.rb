require 'test_helper'

class RatingTest < ActiveSupport::TestCase
  setup do
    @user = users(:user1)
    @movie = movies(:star_wars)
  end

  test 'succesuffuly creates rating' do
    rating = @movie.ratings.new(user: @user)
    assert rating.save
  end

  test "validates user's presence" do
    rating = @movie.ratings.new
    refute rating.save
  end

  test "validates movie's presence" do
    rating = Rating.new(user: @user)
    refute rating.save
  end

  test 'validates uniqueness within user and score scope' do
    rating = @movie.ratings.new(user: @user, score: 5)
    refute rating.save
  end

  test 'update_movie_rating should calculate mean rating of the movie' do
    ratings(:five_stars).update_attribute(:score, 1)
    @movie.reload
    assert_equal 1, @movie.mean_rating
  end
end
