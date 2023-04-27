'use strict';

const allTitlesLinks = document.querySelectorAll('.titles a');

allTitlesLinks.forEach((titleLink) => {
    titleLink.addEventListener('click', titleClickHandler);
});

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

