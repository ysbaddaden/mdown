class Document < ActiveRecord::Base
  belongs_to :folder

  scope :autocomplete, ->(name) { where("documents.name LIKE ?", "#{name}%") }
  scope :latest, order("documents.updated_at DESC, documents.name ASC")
  scope :alphabetical, order("documents.name ASC")

  before_update ->(document) { document.rev += 1 }
end
