require 'test_helper'

class RatingControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:user1)
    sign_in @user
  end

  test 'create successful' do
    data = { movie_id: movies(:godfather).id, rating: 5 }.as_json
    assert_difference('Rating.count', 1) do
      post ratings_url(data), xhr: true
    end
    assert_response :success
  end

  test 'create only updates rating' do
    data = { movie_id: movies(:star_wars).id, rating: 3 }.as_json
    assert_no_difference('Rating.count', 1) do
      post ratings_url(data), xhr: true
    end
    assert_response :success
    assert_equal 3, ratings(:five_stars).score
  end
end
