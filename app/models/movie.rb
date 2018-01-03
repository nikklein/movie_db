class Movie < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :ratings, dependent: :destroy

  def self.filtered(params)
    result = Movie.all

    return result.where(title: params['filtered_text']) if params['filtered_text'].present?

    return result.joins(:category).where('categories.name = ?', params['categoryFilter']) if params['categoryFilter'].present?

    return result.where('mean_rating = ?', params['ratingFilter']) if params['ratingFilter'].present?

    result
  end
end
