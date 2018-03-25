class ApplicationController < ActionController::API
  include Knock::Authenticable

  def authenticate_nanny
    unless current_user && current_user.nanny
      render json: {message: "Not Authorized"},
      status: :unauthorized
    end
  end

  def authenticate_parent
    unless current_user && current_user.parent
      render json: {message: "Not Authorized"},
      status: :unauthorized
    end
  end
end
