require 'test_helper'

class UserTest < ActiveSupport::TestCase
  setup do
    @user = users(:user1)
  end

  test 'should not save user with no credentials presented' do
    refute User.new.save
  end

  test 'should not save user if no email presented' do
    @user.email = nil
    refute @user.save
  end
end
