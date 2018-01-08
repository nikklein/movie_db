require 'test_helper'

class MoviesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:user1)
    sign_in @user
  end

  test 'get index' do
    get movies_path
    assert_response :success
  end

  test 'create successful' do
    data = { title: 'any_title', text: 'any_text', mean_rating: 5, category_id: categories(:action).id }.as_json
    assert_difference('Movie.count', 1) do
      post movies_url(data), xhr: true
    end
    assert_response :success
  end

  test 'update successful' do
    movie = movies(:star_wars)
    data = { title: 'any_title2', text: 'any_text', mean_rating: 3, category_id: categories(:action).id }
    put movie_url movie, data.as_json
    assert_response :success
    movie.reload
    data.each do |key, value|
      assert_equal value, movie.send(key.to_sym)
    end
  end

  test 'delete' do
    assert_difference('Movie.count', -1) do
      delete movie_url(movies(:star_wars)), xhr: true
      assert_response :success
    end
  end
end
