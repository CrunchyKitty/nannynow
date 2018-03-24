class UsersController < ApplicationController
  def index
    users = User.all
    if params[:fist_name] && params[:last_name]
      search_results = User.where('first_name iLike ? AND last_name iLike ?', params[:first_name], params[:last_name])
    end

    render json: user.as_json
  end

  def nannies
    nannies = User.where(nanny:true)
    # puts "is doing this"
    render json: nannies.as_json
  end

  def create
    user = User.new(
      first_name: params[:first_name],
      last_name: params[:last_name],
      email: params[:email],
      gender: params[:gender],
      age: params[:age],
      city: params[:city],
      state: params[:state],
      zip_code: params[:zip_code],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
      )
    if user.save
      render json: {message: 'User created successfully'}
    else
      render json: {errors: 'Error creating account'}
  end 
end

  def show 
    @user = User.find(params[:id])
    render 'show.json.jbuilder'
  end

  def profile
    @user = current_user
    render 'show.json.jbuilder'
  end

  def update
    @user = User.find(params[:id])
    @user.first_name = params[:first_name] || @user.first_name
    @user.last_name = params[:last_name] || @user.last_name
    @user.email = params[:email] || @user.email
    @user.city = params[:city] || @user.city
    @user.state = params[:state] || @user.state
    @user.zip_code = params[:zip_code] || @user.zip_code

    if @user.save
      render 'show.json.jbuilder'
    else
      render json: {message: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    render json: {message: "Successfully deleted profile"}
  end
end







