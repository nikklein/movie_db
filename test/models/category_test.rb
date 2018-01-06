require 'test_helper'

class CategoryTest < ActiveSupport::TestCase
  test 'should succesfully create a category' do
    category = Category.new(name: 'Horror')
    assert category.save
  end

  test 'should not create a category with no name' do
    category = Category.new
    assert category.save
  end

  test 'should validae uniqueness of the name' do
    category = Category.new(name: 'Action')
    refute category.save
  end

  test 'before create should capitalize the name' do
    category_name = 'thriLLer'
    category = Category.new(name: category_name)
    assert category_name.capitalize, category.name
  end
end
