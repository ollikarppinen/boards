class Column < ApplicationRecord
  default_scope { order(position: :asc) }

  has_many :tasks, dependent: :destroy
  belongs_to :board

  validates :title, presence: :true
  validates :position, presence: :true
end
