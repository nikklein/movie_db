class Category < ApplicationRecord
  has_many :movies
  validates :name, uniqueness: true

  before_create :convert_to_title_case

  private

  def convert_to_title_case
    self.name = name.capitalize if name.present?
  end
end
