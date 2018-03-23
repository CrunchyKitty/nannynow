class User < ApplicationRecord
  has_secure_password
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true

  has_many :created_requests, class_name: "Request", foreign_key: "parent_id"
  has_many :received_requests, class_name: "Request", foreign_key: "nanny_id"

  def nanny_pending_requests
    received_requests.where(status: "pending")
  end

  def nanny_accepted_requests
    received_requests.where(status: "accepted")
  end

  def nanny_declined_requests
    received_requests.where(status: "declined" )
  end


  def parent_pending_requests
    created_requests.where(status: "pending")
  end

  def parent_accepted_requests
    created_requests.where(status: "accepted")
  end
end
