class Movie < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :ratings, dependent: :destroy
  validates :title, presence: true, uniqueness: true, allow_blank: false

  after_create :create_rating

  def self.filtered(params)
    result = Movie.all

    return result.where(title: params['filtered_text']) if params['filtered_text'].present?

    return result.joins(:category).where('categories.name = ?', params['categoryFilter']) if params['categoryFilter'].present?

    return result.where('mean_rating = ?', params['ratingFilter']) if params['ratingFilter'].present?

    result
  end

  private

  def create_rating
    ratings.find_or_create_by(user_id: user.id, score: mean_rating) if mean_rating.positive?
  end
end
