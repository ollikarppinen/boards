class Column < ApplicationRecord
  has_many :tasks, dependent: :destroy
  belongs_to :board
end
