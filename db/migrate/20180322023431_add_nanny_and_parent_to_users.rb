class AddNannyAndParentToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column  :users, :nanny, :boolean
    add_column  :users, :parent, :boolean
  end
end
