'use strict';

const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    articleTagLink: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
    articleAuthorLink: Handlebars.compile(document.querySelector('#template-article-author-link').innerHTML)
}

generateTitleLinks();

function generateTitleLinks(customSelector = '') {
    document.querySelector('.list.titles').innerHTML = '';

    const allPosts = [...document.querySelectorAll(`.posts .post${customSelector}`)];

    const allPostsInfo = allPosts.map((post) => {
        return [
            post.getAttribute('id'),
            post.querySelector('.post-title').innerHTML
        ];
    });

    const newLinkELements = allPostsInfo.map(([id, title]) => {
        const linkHTMLData = { id, title };
        const linkHTML = templates.articleLink(linkHTMLData);
        return linkHTML;
    });

    newLinkELements.forEach((newLink) => {
        document.querySelector('.list.titles').insertAdjacentHTML('beforeend', newLink);
    });

    //having removed old and generated the new links we need to add event listeners to them
    const allTitlesLinks = document.querySelectorAll('.titles a');
    allTitlesLinks.forEach((titleLink) => {
        titleLink.addEventListener('click', titleClickHandler);
    });
}

function titleClickHandler(event) {
    event.preventDefault();
    const selectedPostId = this.getAttribute('href');
    selectTitle(this);
    selectPostById(selectedPostId);
}

function selectTitle(currentTitle) {

    //make active titles unactive 
    const activeLinks = document.querySelectorAll('.titles a.active');

    activeLinks.forEach((titleLink) => {
        titleLink.classList.remove('active');
    });

    //make current title active
    currentTitle.classList.add('active');
}

function selectPostById(postId) {

    //make active posts unactive 
    const activePosts = document.querySelectorAll('.posts .post.active');

    activePosts.forEach((post) => {
        post.classList.remove('active');
    });

    //make current post active
    const serachedPost = document.querySelector(`.posts .post${postId}`);

    serachedPost.classList.add('active');
}

function generateTags() {
    const allTags = {};
    const articles = document.querySelectorAll('.posts .post');

    articles.forEach((article) => {
        const articleTags = article.getAttribute('data-tags').split(' ');
        const currentArticleTagsListEl = article.querySelector('.post-tags .list');

        articleTags.forEach((tag) => {
            const linkHTMLData = { tag };
            const newLink = templates.articleTagLink(linkHTMLData);
            currentArticleTagsListEl.insertAdjacentHTML('beforeend', newLink);

            if (!allTags.hasOwnProperty(tag)) {
                allTags[tag] = 1;
            } else {
                allTags[tag] = allTags[tag] + 1;
            }
        });
    });

    const tagList = document.querySelector('.tags.list');

    const tagsParams = calculateTagsParams(allTags);

    let allTagsHTML = '';
    Object.entries(allTags).forEach(([tagName, amountOfTimesUsed]) => {
        const currentClassName = calculateTagClass(amountOfTimesUsed, tagsParams);
        allTagsHTML += `<li><a href="#tag-${tagName}" class="${currentClassName}">${tagName}</a></li>`;
    });

    tagList.innerHTML = allTagsHTML;
}

function calculateTagsParams(tags) {
    return {
        min: Math.min(...Object.values(tags)),
        max: Math.max(...Object.values(tags))
    };
}

function calculateTagClass(amountOfTimesUsed, tagsParams) {
    const maxRange = tagsParams.max - tagsParams.min + 1;
    const classIdentifier = Math.round((5 * amountOfTimesUsed) / maxRange);
    return `tag-size-${classIdentifier}`;
}

generateTags();

function tagClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const allActiveTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    allActiveTagLinks.forEach((activeTagLink) => {
        activeTagLink.classList.remove('active');
    });

    const allSameHrefLinks = document.querySelectorAll('a[href="' + href + '"]');

    allSameHrefLinks.forEach(link => {
        link.classList.add('active');
    });
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
    const allTagLinks = document.querySelectorAll('a[href^="#tag-"]');

    allTagLinks.forEach(link => {
        link.addEventListener('click', tagClickHandler);
    });
}

addClickListenersToTags();

//authors
function generateAuthors() {
    const allAuthors = {};
    const articles = document.querySelectorAll('.posts .post');

    articles.forEach(article => {
        const authorName = article.getAttribute('data-author');
        const authorWrapperEl = article.querySelector('.post-author');

        const linkHTMLData = { authorName };
        const authorLink = templates.articleAuthorLink(linkHTMLData);

        authorWrapperEl.innerHTML = authorLink;

        const articleAuthor = article.getAttribute('data-author');

        if (!allAuthors.hasOwnProperty(articleAuthor)) {
            allAuthors[articleAuthor] = 1;
        } else {
            allAuthors[articleAuthor] = allAuthors[articleAuthor] + 1;
        }
    });

    const authorsList = document.querySelector('.list.authors');
    let allTagsHTML = '';
    Object.entries(allAuthors).forEach(([authorName, amountOfTimesUsed]) => {
        allTagsHTML += `<li><a href="#author-${authorName}">${authorName} <span>(${amountOfTimesUsed})</span> </a></li>`;
    });

    authorsList.innerHTML = allTagsHTML;
}

generateAuthors();

function addClickListenersToAuthors() {
    const allAuthorLinks = document.querySelectorAll('a[href^="#author-"]');

    allAuthorLinks.forEach(link => {
        link.addEventListener('click', authorClickHandler);
    });
}

function authorClickHandler(event) {
    event.preventDefault();
    const href = this.getAttribute('href');
    const author = href.replace('#author-', '');

    generateTitleLinks(`[data-author="${author}"]`);
}

addClickListenersToAuthors();

function selectFirstArticle() {
    const firstArticle = document.querySelector('.posts .post');
    firstArticle.classList.add('active');

    const firstLink = document.querySelector('.list.titles a');
    firstLink.classList.add('active');
}

selectFirstArticle();