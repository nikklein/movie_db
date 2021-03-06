class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :movie

  validates :movie, uniqueness: { scope: [:user, :score] }

  after_update :update_movie_rating

  private

  def update_movie_rating
    movie.update_column(:mean_rating, movie.ratings.sum(:score).to_f / movie.ratings.size.to_f)
  end
end
