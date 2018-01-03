json.movies @movies.each do |el|
  json.extract! el, :id, :title, :text, :mean_rating
  json.category_name el.category.name
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
