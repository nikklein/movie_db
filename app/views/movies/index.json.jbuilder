json.categories Category.all.each do |category|
  json.extract! category, :id, :name
end
json.movies @movies.each do |el|
  json.extract! el, :id, :title, :text, :mean_rating
  json.category_name el.category.name
end
