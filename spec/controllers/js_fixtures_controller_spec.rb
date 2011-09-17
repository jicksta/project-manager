require 'spec_helper'

describe WelcomeController do

  include JsFixtures

  specify "generation of the main.html fixture" do
    get :index
    response.should be_success

    save_fixture "main", html_for("#inner")
  end

end