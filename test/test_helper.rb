ENV['RAILS_ENV'] ||= 'test'

require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'capybara/rails'
require 'capybara/minitest'
require 'simplecov'

SimpleCov.start

class ActiveSupport::TestCase
  fixtures :all

  include Capybara::DSL
  include Capybara::Minitest::Assertions
  def teardown
    Capybara.reset_sessions!
    Capybara.use_default_driver
  end
end
