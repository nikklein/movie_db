class MoviesController < ApplicationController
  before_action :authenticate_user!, except: :index

  def index
    @movies = Movie.filtered(filter_params)
  end

  def filter_params
    params.permit('filtered_text', 'categoryFilter')
  end
end
