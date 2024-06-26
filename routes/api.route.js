const userRoute = require('./user.route');

const blogRoute = require('./blog.route');
const kategoriblogRoute = require('./kategoriblog.route');
const tagblogRoute = require('./tagblog.route');

const portfolio = require('./portfolio.route');
const kategoriportofolioRoute = require('./kategoriportofolio.route');
const tagportofolioRoute = require('./tagportofolio.route');

const jobCategory = require('./jobCategory.route');
const recruitmentJob = require('./recruitmentJob.route');

const team = require('./team.route');
const divitionCategory = require('./divitionCategory.route');

const historyCompany = require('./historyCompany.route');
const aboutCompany = require('./aboutCompany.route');

const internRecruitmant = require('./internRecruitmant.route');
const socialMedia = require('./socialMedia.route');
const client = require('./client.route');

const internHistory = require('./internHistory.route');
const messageHistory = require('./messageHistory.route');
const jobRecruitmentHistory = require('./jobRecruitmentHistory.route');
const service = require('./service.route');
const media = require('./media.route');

module.exports = function (app, urlApi) {
    app.use(urlApi, userRoute);

    app.use(urlApi, blogRoute);
    app.use(urlApi, kategoriblogRoute);
    app.use(urlApi, tagblogRoute);

    app.use(urlApi, portfolio);
    app.use(urlApi, kategoriportofolioRoute);
    app.use(urlApi, tagportofolioRoute);

    app.use(urlApi, jobCategory);
    app.use(urlApi, recruitmentJob);

    app.use(urlApi, team);
    app.use(urlApi, divitionCategory);

    app.use(urlApi, aboutCompany);
    app.use(urlApi, client);
    app.use(urlApi, historyCompany);
    app.use(urlApi, internRecruitmant);
    app.use(urlApi, socialMedia);

    app.use(urlApi, internHistory);
    app.use(urlApi, messageHistory);
    app.use(urlApi, jobRecruitmentHistory);
    app.use(urlApi, service);
    app.use(urlApi, media);
}
