class CreateDocuments < ActiveRecord::Migration
  def change
    create_table :documents do |t|
      t.string :name
      t.text   :contents
      t.timestamps
    end
    add_index :documents, :name
  end
end
