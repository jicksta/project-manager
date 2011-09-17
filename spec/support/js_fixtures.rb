module JsFixtures

  FIXTURE_DIR = Rails.root.join "tmp", "js_dom_fixtures"

  def self.included(klass)
    klass.render_views
  end

  def save_fixture(fixture_name, fixture_content)
    FileUtils.mkdir_p FIXTURE_DIR
    filename = File.join FIXTURE_DIR, fixture_name + ".html"
    File.open(filename, "w+") { |file| file.write fixture_content }
  end

  def html_for(selector)
    body = response.body
    body.should be_present

    doc = Nokogiri::HTML.fragment body
    results = doc.css selector

    results.should_not be_empty
    results.to_html
  end

end