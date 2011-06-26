class Project < ActiveRecord::Base

  
  validates :name, :start_time, :end_time, presence: true
  validates :name, uniqueness: true

end
