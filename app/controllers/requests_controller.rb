class RequestsController < ApplicationController
  def create
    @request = Request.new(
                              parent_id: current_user.id,
                              nanny_id: params[:nanny_id],
                              start_time: params[:start_time],
                              end_time: params[:end_time],
                              location: params[:location],
                              number_of_children: params[:number_of_children],
                              pay_rate: params[:pay_rate],
                              status: "pending"
                            )
    if @request.save
      render 'show.json.jbuilder'
    else 
      @request.errors.full_messages.each do |error|
        puts error
      end
    end
  end

  def accept 
    @request = Request.find(params[:id])
    @request.update(status: "accepted")

    @user = current_user

    render 'nanny_update.json.jbuilder'
  end

  def show
    @request = Request.find(params[:id])
    render 'show.json.jbuilder'
  end

  def update
    @request = Request.find(params[:id])

    @request.start_time = params[:start_time] || @request.start_time
    @request.end_time = params[:end_time] || @request.end_time
    @request.location = params[:location] || @request.location
    @request.number_of_children = params[:number_of_children] || @request.number_of_children
    @request.pay_rate = params[:pay_rate] || @request.pay_rate

    if @request.save
      render 'show.json.jbuilder'
    else
      render json: {message: @request.errors.full_messages}, status: :unprocessable_entity
    end
  end


  def destroy
    request = request.find(params[:id])
    request.destroy
    render json: {message: "Successfully destroyed request ##{request.id}"}
  end

  
  def decline
    @request = Request.find(params[:id])
    @request.update(status:"declined")

    @user = current_user

    render 'nanny_update.json.jbuilder'
  end
end