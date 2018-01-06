class RatingsController < ApplicationController
  before_action :authenticate_user!

  def create
    movie = Movie.find(filter_params['movie_id'])
    rating = movie.ratings.find_or_create_by(user_id: current_user.id, movie_id: movie.id)
    rating.update_attribute(:score, filter_params['rating']) if rating.score != params[:rating]
  end

  def filter_params
    params.permit('movie_id', 'rating')
  end
end
