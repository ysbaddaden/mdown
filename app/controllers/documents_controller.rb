class DocumentsController < ApplicationController
  respond_to :json
  before_filter :clean_params, :only => [ :create, :update ]

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
    
    if @document.rev == rev = params[:document].delete(:rev).to_i
      @document.update_attributes(params[:document])
    else
      @document.errors.add(:rev, "This document has already been saved by somebody else.")
    end
    
    respond_with(@document) do |format|
      format.json do
        if @document.persisted?
          hsh = { rev: @document.rev, updated_at: @document.updated_at }
          render request.format.to_sym => hsh, :status => :ok
        end
      end
    end
  end

  def destroy
    @document = Document.find(params[:id])
    @document.destroy
    respond_with(@document)
  end

  private
    def clean_params
      [ :id, :created_at, :updated_at ].each { |key| params[:document].delete(key) }
    end
end
