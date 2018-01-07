json.extract! @movie, :id, :title, :text, :mean_rating
json.category_name @movie.category.name
