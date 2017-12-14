class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.references :column, foreign_key: true
      t.string :title

      t.timestamps
    end
  end
end
