Rails.application.routes.draw do
 get "/users" => "users#index" 
 get "/users/:id" => "users#show" 
 post "/users" => "users#create"
 patch "/users/:id" => "users#update"
 delete "/users/:id" => "users#destroy"

 get "/requests/:id" => "requests#show"
 post "/requests" => "requests#create"
 patch "/requests/:id/accept" => "requests#accept"
 patch "/requests/:id" => "requests#update"
 delete "/requests/:id/decline" => "requests#decline"
 delete "/requests/:id" => "requests#destroy"

 post "user_token" => "user_token#create"

 get "/profile" => "users#profile"
 get "/profiles/:current_user" => "users#show"
 post "/users/images" => "users#image"
 
 get "/users/nannies" => "users#nannies"
 
end
