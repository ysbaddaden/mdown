class AddRevToDocuments < ActiveRecord::Migration
  def change
    add_column :documents, :rev, :integer, :default => 1
  end
end
