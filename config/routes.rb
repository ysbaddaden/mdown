Mdown::Application.routes.draw do
  resources :documents, :except => [ :new, :edit ] do
    get :autocomplete, :on => :collection
  end
  
  root :to => "home#index"
end
