class JobsController < ApplicationController
  def create
    flash[:notice] = "Job created"
    job_id = SleepJob.create(:length => 100)
    redirect_to job_url(job_id)
  end

  def index
  end

  def show
    job_id = params[:id]
    @status = Resque::Plugins::Status::Hash.get(job_id)
    respond_to do |format|
      format.html
      format.json { render :json => @status.to_json }
    end
  end
end
