class DocumentsController < ApplicationController
  respond_to :json

  def index
    @documents = Document.alphabetical
    respond_with(@documents)
  end

  def autocomplete
    @documents = Document.autocomplete(params[:name]).latest
    respond_with(@documents)
  end

  def show
    @document = Document.find(params[:id])
    respond_with(@document)
  end

  def create
    @document = Document.new(params[:document])
    @document.save
    respond_with(@document)
  end

  def update
    @document = Document.find(params[:id])
    params[:document].delete(:id)
    params[:document].delete(:created_at)
    params[:document].delete(:updated_at)
    @document.update_attributes(params[:document])
    respond_with(@document)
  end

  def destroy
    @document = Document.find(params[:id])
    @document.destroy
    respond_with(@document)
  end
end
