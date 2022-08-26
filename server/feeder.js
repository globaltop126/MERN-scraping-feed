const RssFeedEmitter = require('rss-feed-emitter');
const moment = require('moment-timezone');
const feeder = new RssFeedEmitter({ skipFirstLoad: true });
const { getAllUrlsFromDB } = require('./app/controllers/blogsites/helpers/getAllUrlsFromDB')
const { getItem } = require('./app/middleware/db')
const { getItembyRSS } = require('./app/middleware/db')
const Blog = require('./app/models/blog');
const Blogsite = require('./app/models/blogsite');

const startFeeder = async () => {
  try {
    console.log("************************")
    console.log("Running Feeder")
    console.log("************************")

    const blogsiteUrls = await getAllUrlsFromDB();
    var feedList = [];

    if(blogsiteUrls.length !== 0)
    {
      blogsiteUrls.forEach(url => {
        feedList.push(url.RSS);
      });
      feeder.add({
        url: feedList,
        refresh: 2000,  // Default refresh value is 60 seconds
      });
    }

  } catch (error) {
    console.log("*************************")
    console.log("Error Feeder")
    console.log("*************************")
  }
}

const addNewFeed = (rssUrl) => {
  feeder.add({
    url: rssUrl,
    refresh: 2000,
  });
}

const deleteFeed = (rssUrl) => {
  feeder.remove(rssUrl);
}

feeder.on('new-item', async function(item) {
  try {
    const blogsite = await getItembyRSS(item.meta.link, Blogsite);
    var blog = new Blog();
    blog.genre_id = blogsite.genre_id;
    blog.blogsite_id = blogsite._id;
    blog.title = item.title;
    blog.link = item.link;
    blog.blog_date = moment(item.date).tz('Asia/Tokyo').format('YYYY-MM-DDTHH:mm:ssZ');
    blog.save();

    blogsite.blogs.pop();
    blogsite.blogs.unshift({'blog_title': blog.title, 'blog_link': blog.link});
    blogsite.save();
  } catch (error) {
    console.log("*************************")
    console.log("Error get blogsite info in Feeder")
  }
})

feeder.on('error', console.error);

module.exports = { startFeeder, addNewFeed, deleteFeed };
