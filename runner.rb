require 'unirest'
require 'parent.rb'
require 'user.rb'
require 'request.rb'

response = Unirest.post("http://localhost:3000/requests", parameters: params)
user = response.body

puts JSON.pretty_generate(user)
