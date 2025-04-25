# Gatsby's default starter

Example [Gatsby] website using GitLab Pages.

Learn more about GitLab Pages at https://pages.gitlab.io and the official
documentation https://docs.gitlab.com/ce/user/project/pages/.

## 📜 Table of Contents

- [GitLab CI](#gitlab-ci)
- [Building locally](#building-locally)
- [Did you fork this project?](#did-you-fork-this-project)
- [Quick start](#-quick-start)
- [Learning gatsby](#-learning-gatsby)

## 🍎 Requirements

- Install node
  1. Install _[nvm]_ (linux) or `nvm-windows`

  2. ```pwsh
     nvm install "$(cat .nvmrc)"
     nvm use "$(cat .nvmrc)"
     node --version
     npm --version
     ```
  3. Install yarn

     ```pwsh
     npm install --global yarn
     yarn
     ```

[nvm]: https://github.com/nvm-sh/nvm
[nvm-windows]: https://github.com/coreybutler/nvm-windows

Kick off your project with this default boilerplate. This starter ships with the main Gatsby configuration files you might need to get up and running blazing fast with the blazing fast app generator for React.

_Have another more specific idea? You may want to check out our vibrant collection of [official and community-created starters](https://www.gatsbyjs.org/docs/gatsby-starters/)._

## ⌨️ Quick start

1. Clone the repository
1. ```pwsh
   # install dependencies
   yarn
   # run local dev server
   yarn run start
   ```

## Spec

The application is very simple

1. Create up/down timer
2. Visualize then in a way to make them picture in picture friendly
3. Persist them so that they automatically continue after a computer restart

```mermaid
flowchart LR
    app-->load[Load Timer]
    app-->create[Create Timer]
    app --> pip[Picture in Picture]
    create-- store new -->storage[(Local Storage)]
    create-->start[Start Timer]
    load -- load from -->storage
    load --> start
    user[User]-->app[Open App]
    
```


## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.


[Gatsby]: https://www.gatsbyjs.org/
