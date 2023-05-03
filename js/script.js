'use strict';

generateTitleLinks();

function generateTitleLinks() {
    document.querySelector('.list.titles').innerHTML = '';

    const allPosts = [...document.querySelectorAll('.posts .post')];

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
    

}

generateTags();