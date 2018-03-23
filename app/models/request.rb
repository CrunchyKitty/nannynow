class Request < ApplicationRecord
  belongs_to :parent, class_name: "User"
  belongs_to :nanny, class_name: "User", optional: true
end
