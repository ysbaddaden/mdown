Mdown::Application.routes.draw do
  resources :folders, :except => [ :new, :edit ] do
    get :autocomplete, :on => :collection
    
    resources :documents, :only => :index do
      get :autocomplete, :on => :collection
    end
  end
  
  resources :documents, :except => [ :new, :edit ] do
    get :autocomplete, :on => :collection
  end
  
  root :to => "home#index"
end
