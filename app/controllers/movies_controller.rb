class MoviesController < ApplicationController
  before_action :authenticate_user!, except: :index

  def index
    @movies = if params['filtered_text'].present?
                Movie.filtered(params['filtered_text'])
              else
                Movie.all
              end
    respond_to do |format|
      format.html
      format.json { render json: @movies, include: { category: { only: :name } } }
    end
  end
end
