class Board < ApplicationRecord
  has_many :columns, dependent: :destroy
end
