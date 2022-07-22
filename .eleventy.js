const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (config) {
    //--- Plugins
    config.addPlugin(eleventyNavigationPlugin);

    //--- Misc Options
    // Additional files to watch for changes
    config.addWatchTarget("./eleventy/");

    //--- Adds admin page for Netlify
    config.addPassthroughCopy("admin");

    //--- Adds uploaded content to _site
    config.addPassthroughCopy("uploads");

    //--- Adds CSS to _site
    config.addPassthroughCopy({ "src/assets/css": "css" });

    //--- Adds JS to _site
    config.addPassthroughCopy({ "src/assets/js": "js" });

    //--- Add Generative JS and IMG files
    config.addPassthroughCopy({ "src/content/generative/*/*.js": 'generative/js' });
    config.addPassthroughCopy({ "src/content/generative/*/*.png": 'generative/img' });
    config.addPassthroughCopy({ "src/content/generative/*/*.json": 'generative/js' });

    //--- Add Project images
    config.addPassthroughCopy({ "src/content/projects/*/*.png": 'projects/img' });

    //--- Adds images to _site
    config.addPassthroughCopy({ "src/assets/img": "img" });

    //--- Adds favicons to _site
    config.addPassthroughCopy({ "src/assets/favicons": "favicons" });

    //--- Adds fonts to _site
    config.addPassthroughCopy({ "src/assets/fonts": "fonts" });

    return {
        pathPrefix: "/", // useful for GitHub pages
        dir: {
            input: "./",
            output: "_site",
            includes: "src/includes",
            layouts: "src/layouts",
            data: "src/data"
        }
    };
}