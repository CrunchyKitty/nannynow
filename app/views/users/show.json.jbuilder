json.user do
  json.partial! @user, partial: "user", as: :user
end

json.nanny_pending_requests do
  json.array! @user.nanny_pending_requests, partial: "requests/request", as: :request
end

json.nanny_accepted_requests do
  json.array! @user.nanny_accepted_requests, partial: "requests/request", as: :request
end

json.parent_pending_requests do
  json.array! @user.parent_pending_requests, partial: "requests/request", as: :request
end

json.parent_accepted_requests do
  json.array! @user.parent_accepted_requests, partial: "requests/request", as: :request
end
