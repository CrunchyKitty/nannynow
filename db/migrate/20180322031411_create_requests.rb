class CreateRequests < ActiveRecord::Migration[5.1]
  def change
    create_table :requests do |t|
      t.integer :parent_id
      t.integer :nanny_id
      t.time :start_time
      t.time :end_time
      t.string :location
      t.integer :number_of_children
      t.float :pay_rate
      t.string :status

      t.timestamps
    end
  end
end
