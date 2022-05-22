class LowriderController < ApplicationController
  def workflows
    render json: Lowrider::Workflow.all
  end
end
