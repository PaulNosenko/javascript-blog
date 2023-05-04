'use strict';

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
        return `<li><a href="#${id}"><span>${title}</span></a></li>`;
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
    const articles = document.querySelectorAll('.posts .post');

    articles.forEach((article) => {
        const articleTags = article.getAttribute('data-tags').split(' ');
        const currentArticleTagsListEl = article.querySelector('.post-tags .list');

        articleTags.forEach((tag) => {
            const newLink = `<li><a href="#tag-${tag}">${tag}</a></li>`
            currentArticleTagsListEl.insertAdjacentHTML('beforeend', newLink);
        });
    });
}

generateTags();

function tagClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const allActiveTagLinks = document.querySelectorAll('a.active[href^="#tag-"]')

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
    })
}

addClickListenersToTags();

//authors
function generateAuthors() {
    const articles = document.querySelectorAll('.posts .post');
    
    articles.forEach(article => {
        const authorName = article.getAttribute('data-author');
        const authorWrapperEl = article.querySelector('.post-author');
        const authorLink = `<a href="#author-${authorName}">${authorName}</a>`

        authorWrapperEl.innerHTML = authorLink;
    });
}

generateAuthors();

function addClickListenersToAuthors() {
    const allAuthorLinks = document.querySelectorAll('a[href^="#author-"]');
    
    allAuthorLinks.forEach(link => {
        link.addEventListener('click', authorClickHandler);
    })
}

function authorClickHandler(event) {
    event.preventDefault();
    const href = this.getAttribute('href');
    const author = href.replace('#author-', '');

    generateTitleLinks(`[data-author="${author}"]`);
}

addClickListenersToAuthors();