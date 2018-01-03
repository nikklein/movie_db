class Category < ApplicationRecord
  has_many :movies
  validates :name, uniqueness: true

  before_create :convert_to_title_case

  def convert_to_title_case
    self.name = name.downcase.capitalize
  end
end
