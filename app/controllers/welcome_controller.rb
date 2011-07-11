class WelcomeController < ApplicationController

  NAMES = ["engineer world-class web-readiness", "unleash impactful platforms", "generate visionary synergies",
           "mesh cross-media interfaces", "morph value-added communities", "integrate scalable vortals",
           "optimize open-source systems", "incubate back-end content"]

  def index

    @projects = NAMES.map.with_index do |name, index|
      start_time = ((NAMES.length / 2) - index).weeks.ago
      length_of_project_in_days = rand(7 * 4) + 1
      Project.new name: name, start_time: start_time, end_time: start_time + length_of_project_in_days.days
    end

  end
end
