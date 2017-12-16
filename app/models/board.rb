class Board < ApplicationRecord
  has_many :columns, dependent: :destroy

  validates :title, presence: :true
end
