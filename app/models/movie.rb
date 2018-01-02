class Movie < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :ratings, dependent: :destroy

  def self.filtered(params)
    where(title: params)
  end
end
