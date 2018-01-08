Rails.application.routes.draw do
  root 'movies#index'

  devise_for :users

  resources :movies, exclude: :show

  resources :ratings, only: :create
end
