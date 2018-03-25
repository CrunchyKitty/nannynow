class Request < ApplicationRecord
  belongs_to :parent, class_name: "User"
  belongs_to :nanny, class_name: "User", optional: true

  def formatted_start_time
    start_time.strftime('%b %e, %l:%M %p')
  end

  def formatted_end_time
    end_time.strftime('%b %e, %l:%M %p')
  end
end
