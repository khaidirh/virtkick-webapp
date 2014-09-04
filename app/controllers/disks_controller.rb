class DisksController < ApplicationController
  before_filter do
    @machine = Machine.find params[:machine_id]
  end


  def index
    redirect_to machine_path @machine, anchor: 'storage'
  end

  def create
    disk = params.require(:disk).permit(:size_plan, :type)
    @disk = Disk.new disk
    @machine.create_disk @disk
  rescue Errors => e
    flash[:storage] = {error: e.errors.dup}
  ensure
    index
  end
end
