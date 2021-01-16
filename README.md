<p align="center">
   Modern starter kit for rapid static site development with <strong>Jekyll</strong>
</p>

---

## Technologies

This template offers rich development experience using the following technologies:

| **Tech*-                                          | **Description*-                                                   |
|---------------------------------------------------|-------------------------------------------------------------------|
| [Jekyll](https://jekyllrb.com/)                   | Transform plain text into static websites and blogs.              |
| [Kramdown](https://kramdown.gettalong.org/)       | Ruby-based markdown parser allowing to use both Markdown and HTML.|
| [TailwindCSS](https://tailwindcss.com/)           | A utility-first CSS framework for rapidly building custom designs.| 
| [Stimulus JS](https://stimulus.hotwire.dev/)      | A A modest JavaScript framework for the HTML you already have.    |
| [ESLint](http://eslint.org/)                      | Lint JS. Reports syntax and style issues.                         |
| [Webpack](https://webpack.js.org)                 | Bundles npm packages and application JS together.                 |
| [Docker](https://www.docker.com/)                 | Open platform to build, ship, and run applications everywhere.    | 

## Get Started

### Using Docker and Docker Compose 🐳

This is the fastest way to get started working on Jekyll:

- Rename the env file `.env.sample` to `.env` and add the required environment variables

- Build the image locally and start the application:

```bash
$ ./bin/docker-start
```

The container is running in development mode by default making the application reachable at `http://localhost:4000`.

### Without Docker

- Make sure that you have Ruby `2.7.2` and Node.JS > `12.x.x`

- Install dependencies

```bash
$ ./bin/setup
```

- Use Jekyll to serve the website locally (by default, at `http://localhost:4000`):

- Use Jekyll to serve the website locally (by default, at `http://localhost:4000`):

```bash
$ ./bin/start
```

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

## Tests

As a static site grows to tens of hundreds of pages, broken links or HTML could easily make its way to a number of pages. 
To prevent this issue, we use [HTMLProofer](https://github.com/gjtorikian/html-proofer).

### Using Docker and Docker Compose 🐳

Make sure to define the following environment variables:

- `DOCKER_IMAGE` e.g. it must match the name defined in your registry of choice such as Docker Hub or Github Container Registry
- `BRANCH_TAG` e.g. for the current branch name `development`, `export BRANCH_TAG=development`

Then execute all tests:

```bash
$ docker-compose -f docker-compose.test.yml up -d
```

### Without Docker

Run this locally or your CI / CD pipeline:

```bash
$ ./bin/test
```

## Deployment

### Using GitHub Pages

- Make sure that `index.md` is in the root of the directory
- Head over to the setting page of the repository: `https://github.com/<REPLACE_WITH_HANDLE>/<REPLACE_WITH_REPOSITORY_NAME>/settings` e.g. `https://github.com/nimblehq/jekyll-templates/settings`
- Select the option `master branch` in the Github Pages section

You are all set 🏄‍♂ ️ For complete details, header over to the [official documentation](https://help.github.com/en/github/working-with-github-pages)

## License

This project is Copyright (c) 2014 and onwards Nimble. It is free software,
and may be redistributed under the terms specified in the [LICENSE] file.

[LICENSE]: /LICENSE

## About

![Nimble](https://assets.nimblehq.co/logo/dark/logo-dark-text-160.png)

This project is maintained and funded by Nimble.

We love open source and do our part in sharing our work with the community!
See [our other projects][community] or [hire our team][hire] to help build your product.

[community]: https://github.com/nimblehq
[hire]: https://nimblehq.co/
