<p align="center">
   Modern starter kit for rapid static site development with <strong>Jekyll</strong>
</p>

---

## Technologies

This template offers rich development experience using the following technologies:

| **Tech*-                                          | **Description*-                                                   |
|---------------------------------------------------|-------------------------------------------------------------------|
| [Jekyll](https://jekyllrb.com/)                   | Transform plain text into static websites and blogs.              |  
| [Babel](http://babeljs.io)                        | Compiles ES6/7 to ES5. Enjoy the new version of JavaScript today. |
| [Webpack](https://webpack.js.org)                 | Bundles npm packages and application JS together.                 |
| [ESLint](http://eslint.org/)                      | Lint JS. Reports syntax and style issues.                         |
| [NPM Scripts](https://docs.npmjs.com/misc/scripts)| Glues all this together in a handy automated build.               | 
| [Kramdown](https://kramdown.gettalong.org/)       | Ruby-based markdown parser allowing to use both Markdown and HTML.| 
| [SASS](http://sass-lang.com/)                     | Compiled CSS styles with variables, functions, and more.          | 
| [Docker](https://www.docker.com/)                 | Open platform to build, ship, and run applications everywhere.    | 

## Get Started

### Using Docker

This is the fastest way to get started working on Jekyll:

- Rename the env file `.env.sample` to `.env` and add the required environment variables

- Build the image locally and create a container for the application: 

```shell
./bin/setup
```

- Start the container:

```shell
./bin/start
```

The container is running in development mode by default making the application reachable at `http://localhost:4000`.

> `./bin/log` can be used to see the output of the Jekyll server. This is useful to check if the content is regenerated 
properly inside the Docker container.

### Without Docker a.k.a the legacy way 😢

- Make sure that you have Ruby `2.7.1` and Node.JS > `12.x.x`

- Install dependencies

```shell
bundle install
npm install
```

- Use Jekyll to serve the website locally (by default, at `http://localhost:5000`):

```shell
$ bundle exec jekyll serve --config ./config/jekyll.yml [--incremental]
$ open http://localhost:5000/
```

- Compile assets using Webpack: 

```shell
npm run start
```

> During development, both jekyll and webpack processes need to be started. To make this easier, foreman has been 
configured in the project: `foreman start -f Procfile.dev`

## Managing Content

All content is written using [kramdown](https://kramdown.gettalong.org/) which is basically Markdown with the ability to use HTML tags. 

### Text Content

- Text content is stored in `_pages` into sub-directories. No content must be placed in the root of `_pages`.
- File names must be kebab-cased (hyphenated delimited) corresponding to an entry in the navigation (see below) 
- Each file must be written in markdown and have an `.md` extension as Jekyll converts markdown files into HTML
- Each file must contain a front-matter block at the beginning of the file with the config params `id` and `title`:

```yaml
id: about
title: About
```

In case of a sub-level page (i.e. not in the root directory), the front-matter block needs to include a config `parent` matching the parent page `id`:

```yaml
id: about-team
title: Team
parent: about
```

### Navigation

The navigation is generated from the data stored in `_data/menu/header.yml` and `_data/menu/footer.yml`:

- Each pages contains a `title`, `slug` and `sub-pages`
- The `slug` and `sub-pages` need to be kebab-cased as these strings are used to generate URLs
- The `slug` corresponds to the page or sub-directory in `pages`

Example:

```yaml
- title: Section Name
  slug: section-name
  sub-pages:
  - sub-section-item
  - another-sub-section-item
```

Corresponding to the following file structure:

```ascii
.
+-- _pages
|   +-- section-name.md
|   +-- section-name/
|   |   +-- sub-section-item.md
|   |   +-- another-sub-section-item.md
```

> Note: Note more than two-node sub-navigation (section -> sub-pages) is currently supported in either the partials 
`_includes/header.html` or  `_includes/footer.html`. The files can be edited to add deeper levels navigation.

### Assets

- Media used to enrich text content must be stored in `assets/<media type>/pages/<section-name>`. 
- In the case of using media other than images, prefer creating a new sub-directory e.g. `assets/videos/pages/<section-name>` 
- To embed these media in the content, use the absolute path to each file: `/assets/<media type>/pages/<section-name>/<filename.extension>`

## Testing

As a static site grows to tens of hundreds of pages, broken links or HTML could easily make its way to a number of pages. 
To prevent this issue, we use [HTMLProofer](https://github.com/gjtorikian/html-proofer).

### Using Docker

Include this in your CI / CD pipeline:

```shell
docker run --rm --entrypoint '/bin/bash' -it $DOCKER_IMAGE:$BRANCH_TAG -c 'bundle exec rake test:lint'
```

### Without Docker

Run this locally or your CI / CD pipeline:

```shell
bundle exec rake test:lint
```

## Deployment

### Using GitHub Pages

- Make sure that `index.md` is in the root of the directory
- Head over to the setting page of the repository: `https://github.com/<REPLACE_WITH_HANDLE>/<REPLACE_WITH_REPOSITORY_NAME>/settings` e.g. `https://github.com/nimblehq/jekyll-templates/settings`
- Select the option `master branch` in the Github Pages section

You are all set 🏄‍♂️For complete details, header over to the [official documentation](https://help.github.com/en/github/working-with-github-pages)

## License

This project is Copyright (c) 2014-2020 Nimble. It is free software,
and may be redistributed under the terms specified in the [LICENSE] file.

[LICENSE]: /LICENSE

## About

![Nimble](https://assets.nimblehq.co/logo/dark/logo-dark-text-160.png)

This project is maintained and funded by Nimble.

We love open source and do our part in sharing our work with the community!
See [our other projects][community] or [hire our team][hire] to help build your product.

[community]: https://github.com/nimblehq
[hire]: https://nimblehq.co/
