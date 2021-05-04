source 'https://rubygems.org'
ruby '2.7.3'

# Jekyll and its dependencies
gem 'jekyll'

group :jekyll_plugins do
  gem 'jekyll-postcss'
end

group :development, :test do
  gem 'rake'        # A make-like build utility for Ruby. Required to run tests.
  gem 'dotenv'      # A Ruby gem to load environment variables from `.env`
  gem 'foreman'     # Manage Procfile-based applications
end

group :test do
  gem 'html-proofer'
end
