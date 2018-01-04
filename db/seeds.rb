user1 = User.create!(email: 'any@mail.com', password: '123456')

user2 = User.create!(email: 'any2@mail.com', password: '123456')

category1 = Category.create!(name: 'Drama')

catergory2 = Category.create!(name: 'Action')

# Movie.create!(
#   [
#     { title: 'Star Wars', text: 'Any text', user_id: user1.id, category_id: category1.id },
#     { title: 'Lord of the Rings', text: 'Any text2', user_id: user1.id, category_id: catergory2.id }
#   ]
# )

# Movie.create!(
#   [
#     { title: 'Route', text: 'Any text3', user_id: user2.id, category_id: category1.id },
#     { title: 'Avengers', text: 'Any text', user_id: user2.id, category_id: catergory2.id }
#   ]
# )
