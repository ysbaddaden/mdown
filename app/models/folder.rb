class Folder < ActiveRecord::Base
  has_many :documents, :dependent => :destroy

  scope :autocomplete, ->(name) { where("folders.name LIKE ?", "#{name}%") }
  scope :latest, order("folders.updated_at DESC, folders.name ASC")
  scope :alphabetical, order("folders.name ASC")

  def as_json(options = {})
    options[:include] ||= :documents
    super(options)
  end
end
