json.parent_pending_requests do
  json.array! @user.parent_pending_requests, partial: "request", as: :request
end

json.parent_accepted_requests do
  json.array! @user.parent_accepted_requests, partial: "request", as: :request
end

json.parent_update_requests do
  json.array! @user.parent_update_requests, partial: "request", as: :request
end

json.parent_destroy_requests do
  json.array! @user.parent_destroy_requests, partial: "request", as: :request
end