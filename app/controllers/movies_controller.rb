class MoviesController < ApplicationController
  before_action :authenticate_user!, except: :index

  def index
    @movies = Movie.filtered(filter_params).order('id desc').paginate(page: params['page'], per_page: params['per_page'])
  end

  def create
    if current_user.movies.create(movie_params)
      render json: { status: 200 }
    else
      render json: { status: 422 }
    end
  end

  def update
    @movie = current_user.movies.find(params[:id])
    if @movie.update(movie_params)
      render json: { status: 200 }
    else
      render json: { status: 422 }
    end
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
