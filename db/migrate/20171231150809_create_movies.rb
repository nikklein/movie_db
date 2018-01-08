class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.text :text
      t.integer :mean_rating, default: 0
      t.integer :category_id
      t.integer :user_id

      t.timestamps
    end
    add_index :movies, :title
    add_index :movies, :text
  end
end
