class FoldersController < ApplicationController
  respond_to :json

  def index
    @folders = Folder.order(:name)
    respond_with(@folders)
  end

  def autocomplete
    @folders = Folder.autocomplete(params[:name]).latest
    respond_with(@folders)
  end

  def show
    @folder = Folder.find(params[:id])
    respond_with(@folder)
  end

  def create
    @folder = Folder.new(params[:folder])
    @folder.save
    respond_with(@folder)
  end

  def update
    @folder = Folder.find(params[:id])
    @folder.update_attributes(params[:folder])
    respond_with(@folder)
  end

  def destroy
    @folder = Folder.find(params[:id])
    @folder.destroy
    respond_with(@folder)
  end
end
