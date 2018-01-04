class MoviesController < ApplicationController
  before_action :authenticate_user!, except: :index

  def index
    @movies = Movie.filtered(filter_params).order('id desc')
  end

  def create
    current_user.movies.create(movie_params)
  end

  def destroy
    movie = current_user.movies.find(params[:id])
    movie.destroy if movie
  end

  private

  def filter_params
    params.permit('filtered_text', 'categoryFilter', 'ratingFilter')
  end

  def movie_params
    params.permit('title', 'text', 'mean_rating', 'category_id')
  end
end
