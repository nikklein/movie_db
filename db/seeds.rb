user1 = User.create!(email: 'any@mail.com', password: '123456')

user2 = User.create!(email: 'any2@mail.com', password: '123456')

drama = Category.create!(name: 'Drama')

action = Category.create!(name: 'Action')

horror = Category.create!(name: 'Horror')

thriller = Category.create!(name: 'Thriller')

comedy = Category.create!(name: 'Comedy')

description = 'Any description'

Movie.create!(
  [
    { title: 'Star Wars', text: description, user_id: user1.id, category_id: action.id },
    { title: 'Lord of the Rings', text: description, user_id: user1.id, category_id: action.id },
    { title: 'Route 66', text: description, user_id: user2.id, category_id: action.id },
    { title: 'Avengers', text: description, user_id: user2.id, category_id: action.id },
    { title: 'The Walking Dead', text: description, user_id: user2.id, category_id: horror.id },
    { title: 'American Made', text: description, user_id: user1.id, category_id: comedy.id },
    { title: 'Breaking Bad', text: description, user_id: user1.id, category_id: thriller.id },
    { title: 'The Snowman', text: description, user_id: user1.id, category_id: drama.id },
    { title: 'The  Blade Runner', text: description, user_id: user2.id, category_id: thriller.id },
    { title: 'Logan', text: description, user_id: user2.id, category_id: action.id },
    { title: 'Dexter', text: description, user_id: user2.id, category_id: drama.id }
  ]
)
