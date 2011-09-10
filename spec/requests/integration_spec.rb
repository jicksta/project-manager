require 'spec_helper'

describe "Managing projects" do

  before do
    visit "/"
  end

  specify "Creating a new project" do
    click_button "New project"
  end

end
