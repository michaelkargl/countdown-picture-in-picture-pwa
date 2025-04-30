const projectPathPrefix =
  process.env.CI_PROJECT_NAME || "countdown-pip-pwa"

module.exports = {
  // Use CI_PROJECT_NAME variable as pathPrefix, edit/comment if you want to use a custom domain.
  pathPrefix: `/${projectPathPrefix}`,
  siteMetadata: {
    title: `Countdown Picture in Picture PWA`,
    description: `A rapid prototype of a countdown PWA with persistent counters and picture in picture support.`,
    author: `@michaelkargl`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/${projectPathPrefix}`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-decap-cms`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `presentations`,
        path: `${__dirname}/presentations`,
      }
    }
  ],
}

console.log('--------------------------------------------------------');
console.log('Application path prefix: %s', projectPathPrefix );
console.log(`Example LOCAL: http://localhost:8000/%s`, projectPathPrefix);
console.log(`Example DEV: http://localhost:9000/%s`, projectPathPrefix);
console.log('--------------------------------------------------------');