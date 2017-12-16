class Task < ApplicationRecord
  default_scope { order(position: :asc) }

  belongs_to :column

  validates :title, presence: :true
  validates :position, presence: :true
end
