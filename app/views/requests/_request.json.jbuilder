json.id request.id
json.status request.status
json.parent_id request.parent_id
json.nanny_id request.nanny_id
json.start_time request.start_time
json.end_time request.end_time
json.location request.location
json.number_of_children request.number_of_children
json.pay_rate request.pay_rate
json.formatted do
  json.start_time request.formatted_start_time
  json.end_time request.formatted_end_time
end