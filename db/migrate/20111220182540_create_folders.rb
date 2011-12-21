class CreateFolders < ActiveRecord::Migration
  def change
    create_table :folders do |t|
      t.string :name
      t.timestamps
    end
    
    add_column :documents, :folder_id, :integer
    add_index  :documents, :folder_id
    
    folder = Folder.create(:name => "Documents")
    Document.reset_column_information
    Document.update_all(:folder_id => folder.id)
  end
end
