Rails.application.routes.draw do
  resources :tasks
  resources :columns
  resources :boards
end
