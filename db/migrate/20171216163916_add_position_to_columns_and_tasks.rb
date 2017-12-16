class AddPositionToColumnsAndTasks < ActiveRecord::Migration[5.1]
  def change
    add_column :columns, :position, :integer
    add_column :tasks, :position, :integer
  end
end
