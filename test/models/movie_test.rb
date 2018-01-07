require 'test_helper'

class MovieTest < ActiveSupport::TestCase
  setup do
    @user = users(:user1)
    @category = categories(:action)
    @movie = movies(:star_wars)
  end

  test 'succesuffuly creates movie' do
    movie = @user.movies.new(title: 'any_title', category: @category)
    assert movie.save
  end

  test 'should not create movie with a blank title' do
    movie = @user.movies.new(title: '', category: @category)
    refute movie.save
  end

  test "validates user's presence" do
    movie = Movie.new(title: 'any_title', category: @category)
    refute movie.save
  end

  test "validates title's presence" do
    movie = Movie.new(user_id: 1, category: @category)
    refute movie.save
  end

  test "validates category's presence" do
    movie = Movie.new(user: @user, title: 'any_title')
    refute movie.save
  end

  test 'should create a rating after a movie was created until mean_rating is zero' do
    assert_no_difference('Rating.count') do
      @user.movies.create(title: 'any_title', category: @category)
    end
  end

  test 'should not create a rating after a movie creation if mean_rating is zero' do
    assert_difference('Rating.count', 1) do
      movie = @user.movies.create(title: 'any_title', mean_rating: 1, category: @category)
      assert_equal movie.id, Rating.last.movie_id
    end
  end

  test 'filtered should filter by category' do
    result = Movie.filtered('categoryFilter' => 'Action')
    assert_equal 1, result.size
    assert_equal @movie, result.first
  end

  test 'filtered should filter by mean_rating' do
    result = Movie.filtered('ratingFilter' => 5)
    assert_equal 1, result.size
    assert_equal @movie, result.first
  end
end
