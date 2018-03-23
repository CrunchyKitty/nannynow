json.nanny_pending_requests do
  json.array! @user.nanny_pending_requests, partial: "request", as: :request
end

json.nanny_accepted_requests do
  json.array! @user.nanny_accepted_requests, partial: "request", as: :request
end

json.nanny_declined_requests do
  json.array! @user.nanny_declined_requests, partial: "request", as: :request
end