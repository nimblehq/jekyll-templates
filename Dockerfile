FROM ruby:2.7.2-slim

ARG RUBY_ENV=development
ARG NODE_ENV=development

# Define all the envs here
ENV RACK_ENV=$RUBY_ENV \
    NODE_ENV=$NODE_ENV

ENV APP_HOME=/jekyll-template \
    PORT=4000

ENV BUNDLE_GEMFILE=$APP_HOME/Gemfile \
    BUNDLE_JOBS=4 \
    BUNDLE_PATH="/bundle"

ENV RUBY_VERSION="2.7.1" \
    NODE_VERSION="12"

ENV LANG="en_US.UTF-8" \
    LC_ALL="en_US.UTF-8" \
    LANGUAGE="en_US:en"

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends apt-transport-https curl gnupg

# Add the PPA (personal package archive) maintained by NodeSource
# This will have more up-to-date versions of Node.js than the official Debian repositories
RUN curl -sL https://deb.nodesource.com/setup_"$NODE_VERSION".x | bash -

# Install general required core packages and Node JS related packages
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends build-essential libpq-dev nodejs yarn && \
    apt-get install -y --no-install-recommends rsync locales chrpath pkg-config libfreetype6 libfontconfig1 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN sed -i "s/^#\ \+\(en_US.UTF-8\)/\1/" /etc/locale.gen
RUN locale-gen en_US.UTF-8

RUN mkdir "$APP_HOME"

WORKDIR $APP_HOME

# Only copy the dependency definition files (Gemfile and packages) to use Docker cache for these steps
# Install Ruby dependencies
COPY Gemfile* ./

RUN bundle config set path '$BUNDLE_PATH' && bundle install --jobs $BUNDLE_JOBS

# Install JS dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copying the app files must be placed after the dependencies setup
# since the app files always change thus cannot be cached
COPY . ./

# Make the init files executable
RUN chmod +x ./bin/*

# Generate Jekyll site
RUN ./bin/build

EXPOSE $PORT

CMD [ "bundle", "exec", "foreman", "start", "-f", "Procfile.dev" ]
