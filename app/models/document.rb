class Document < ActiveRecord::Base
  scope :autocomplete, ->(name) {
    select('documents.id, documents.name').where("documents.name LIKE ?", "#{name}%")
  }
  scope :latest, order("documents.updated_at DESC, documents.name ASC")
  scope :alphabetical, order("documents.name ASC")
end
