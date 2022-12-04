module.exports = {
  layout: 'canvas',
  published: false,
  ogType: 'website',
  ogTitle: data => data.title,
  ogImage: data => `img/generative/${ data.slug }.png`,
  eleventyComputed: {
    slug: data => {
      return  data.title.toLowerCase().replaceAll(' ', '-');
    },
    permalink: data => {
      return `generative/${ data.slug }/`;
    },
    thumbnail: data => {
      return `${data.slug}.png`;
    },
    js_file: data => {
      return data.slug;
    },
    eleventyNavigation: {
      key: data => data.title,
      parent: data => 'generative',
    }
  }
}