json.total_entries @movies.total_entries

json.movies @movies.each do |movie|
  editable = (movie.user == current_user && user_signed_in?)
  json.extract! movie, :id, :title, :text, :mean_rating
  json.category_name movie.category.name
  json.editable editable
end

json.categories Category.all.each do |category|
  json.extract! category, :id, :name
  json.category_count category.movies.size
end

range = (1..5)

json.ratings range.each do |i|
  json.id i
  json.name '★' * i
  json.rating_count Movie.where(mean_rating: i).size
end
