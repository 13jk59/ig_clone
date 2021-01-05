import React, { useEffect } from 'react';
import {checkTokenExpirationMiddleware, _authenticationErrorLogOut, setDisplay, normalizeCounts,createPostOptionsDiv} from '../../../utility/utility_functions';


/**
 * This function represents a React component that renders the section of the homepage 
 * responsible for loading in the posts for a given user. 
 */
function HomePagePosts (props) {

    useEffect(() => {

        async function fetchHomePagePosts() {
            try {
                const spinner_div = document.getElementById('main_post_spinner');
                spinner_div.style.display = 'block';

                const homePagePostsRaw = await fetch(`/homepage/${props.current_user}/1`, {
                    headers: {
                        authorization: localStorage.getItem('accessToken')
                    },
                    method: 'GET'
                });
                const homePagePostsObjects = await homePagePostsRaw.json();
                console.log(homePagePostsObjects); 

                spinner_div.style.display = 'none';
                fillInPosts(homePagePostsObjects); 
            }
            catch(err) {

            }
        }
        fetchHomePagePosts(); 
    }, []);

    /** 
     * This function accepts an arary of post objects for a given users homepage from the server, will create DOM nodes for
     * every post using a helper function, and then insert the nodes into the DOM appropriately. 
     */
    function fillInPosts(homePagePostsObjects) {
        homePagePostsObjects = makePracObjects();
        const homePagePostHolder = document.getElementById('home_page_posts_top_holder');
        for (let post of homePagePostsObjects) {
            const post_DOMNode = createPostNode(post);
            homePagePostHolder.appendChild(post_DOMNode);
        }
    }

    /** 
     * This function accepts an object representing a post, returned from the server, and will insert the posts contents
     * into a DOM node and return them appropriately. 
     */
    function createPostNode(post) {
        function createProfilePicUsernameOptionsHolder() {
            const profilePicUsernameOptionsHolder = document.createElement('div');
            profilePicUsernameOptionsHolder.classList.add('profile_pic_username_options_holder');

            // profile pic username
            const profilePicUsernameHolder = document.createElement('div');
            profilePicUsernameHolder.classList.add('profile_pic_username_holder');

            const profilePic = document.createElement('img');
            profilePic.classList.add('profilePicturePost');
            profilePic.classList.add('homepageProfPic');
            profilePic.src = post.prof_pic;

            const username = document.createElement('h3');
            username.classList.add('username_homepage_post');
            username.innerHTML = post.username;

            profilePicUsernameHolder.appendChild(profilePic);
            profilePicUsernameHolder.appendChild(username);
            
            // saved icon 
            const saved_icon = document.createElement('i');
            saved_icon.classList.add('fas');
            saved_icon.classList.add('fa-ellipsis-h');
            saved_icon.classList.add('ellipis_post');
            

            profilePicUsernameOptionsHolder.appendChild(profilePicUsernameHolder);
            profilePicUsernameOptionsHolder.appendChild(saved_icon);
            return profilePicUsernameOptionsHolder; 
        }

        function createImageHolder() {
            const img_holder = document.createElement('div');
            img_holder.classList.add('homepage_post_imageHolder');
            const main_img = document.createElement('img');
            main_img.classList.add('homepage_post_img');
            main_img.src = post.img; 
            img_holder.appendChild(main_img);
            return img_holder;
        }


        function createPostOptionsHolder() {
            const post_options_holder = document.createElement('div');
            post_options_holder.classList.add('homepage_post_options');

            const iconDivHolder = createIconDivHolder();
            post_options_holder.appendChild(iconDivHolder);

            const num_likes_holder = createNumLikesHolder();
            post_options_holder.appendChild(num_likes_holder);

            const usernameCaptionHolder = createUsernameCaptionHolder();
            post_options_holder.appendChild(usernameCaptionHolder);

            const commentHolder = createCommentHolder();
            post_options_holder.appendChild(commentHolder);

            const date_posted = createDatePosted();
            post_options_holder.appendChild(date_posted);
            return post_options_holder; 
        }

        function createDatePosted() {
            const date_posted = document.createElement('p');
            date_posted.classList.add('date_posted');
            date_posted.innerHTML = post.date_posted;
            return date_posted;
        }

        function createCommentHolder() {
            const commentHolder = document.createElement('div');
            commentHolder.classList.add('comment_holder');

            const descr_p = document.createElement('p');
            descr_p.innerHTML = 'Liked by';
            
            const num_comments = document.createElement('p');
            num_comments.classList.add('num_comments_homepagepost');
            num_comments.innerHTML = `${normalizeCounts(post.num_comments)} comments`;

            commentHolder.appendChild(descr_p);
            commentHolder.appendChild(num_comments);
            return commentHolder;
        }

        function createNumLikesHolder() {
            const num_likes_holder = document.createElement('div');
            num_likes_holder.classList.add('likesHomepageHolder');

            const p_info = document.createElement('p');
            p_info.innerHTML = 'Liked by';

            const p_num_liked = document.createElement('p');
            p_num_liked.classList.add('post_num_liked');
            p_num_liked.innerHTML = `${normalizeCounts(post['liked_by'])} people`;

            num_likes_holder.appendChild(p_info);
            num_likes_holder.appendChild(p_num_liked);
            return num_likes_holder; 
        }

        function createUsernameCaptionHolder() {
            const holder = document.createElement('div');
            holder.classList.add('username_caption_holder');

            const username_for_caption = document.createElement('p');
            username_for_caption.classList.add('username_homepage_post');
            username_for_caption.classList.add('username_for_caption');
            username_for_caption.innerHTML = post['username'];

            const caption_post = document.createElement('p');
            caption_post.classList.add('caption_homepage_post');

            holder.appendChild(username_for_caption);
            holder.appendChild(caption_post);
            return holder; 
        }

        function createIconDivHolder() {
            const commentIconsFlexboxContainer = document.createElement('div');
            commentIconsFlexboxContainer.classList.add('commentIconsFlexboxContainer');
            const [likeCommentIcons, savedIcon] = createPostOptionsDiv();
            likeCommentIcons.classList.add('homepage_main_icon_holder')
            for(let i=0; i<likeCommentIcons.children.length; i++) {
                likeCommentIcons.children[i].classList.add('focus_icons');
            }
            savedIcon.children[0].classList.add('focus_icons');        
            commentIconsFlexboxContainer.appendChild(likeCommentIcons);
            commentIconsFlexboxContainer.appendChild(savedIcon); 
            return commentIconsFlexboxContainer;
        }

        function createAddCommentHolder() {
            const addCommentHolder = document.createElement('div');
            addCommentHolder.classList.add('add_comment_holder');
            
            const txtarea = document.createElement('textarea');
            txtarea.classList.add('homepage_textarea');
            txtarea.placeholder ='Add a comment...';
            
            const p_descr = document.createElement('p');
            p_descr.innerHTML = 'Post';
            
            addCommentHolder.appendChild(txtarea);
            addCommentHolder.appendChild(p_descr);
            return addCommentHolder;
        }

        const newHomePagePost = document.createElement('div');
        newHomePagePost.classList.add('homepage_post');

        const topLevelProfPicUsername = createProfilePicUsernameOptionsHolder();
        newHomePagePost.appendChild(topLevelProfPicUsername);

        const main_img = createImageHolder();
        newHomePagePost.appendChild(main_img);

        const postOptionsHolder = createPostOptionsHolder();
        newHomePagePost.appendChild(postOptionsHolder);

        const commentHolder = createAddCommentHolder();
        newHomePagePost.appendChild(commentHolder);

        return newHomePagePost; 
    }

    function makePracObjects() {

        const output = [];
        for (let i=0; i<65; i++) {
            const post_obj = {};
            post_obj['liked_by'] = 200200;
            post_obj['num_comments'] = 35;
            post_obj['prof_pic'] = 'https://i.pinimg.com/originals/22/2b/8e/222b8e6849b3a3a66c0bb7002b0e4603.jpg';
            post_obj['username'] = 'Basjrnasjidnij1n3jin1j2i3n21io3j20193i0912i90dsuj0ivonjdsnvka';
            post_obj['date_posted'] = 'December 23, 2020'
            if (i < 25) {
                post_obj['img'] = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg';
            }
            else if (i>25 && i <35){
                post_obj['img'] = 'https://i.redd.it/1ge3xnq5zfl11.jpg';
            }
            else {
                post_obj['img'] = 'https://apod.nasa.gov/apod/image/9712/orionfull_jcc_big.jpg';
            }
            output.push(post_obj);
        }
        return output; 
    }

    return(
        <div id = 'home_page_posts_plus_spinner'>
            <div id = 'home_page_posts_top_holder'>
                <div id = 'main_post_spinner' className="sk-chase">
                    <div className="sk-chase-dot sk-chase-infscroll"></div>
                    <div className="sk-chase-dot sk-chase-infscroll"></div>
                    <div className="sk-chase-dot sk-chase-infscroll"></div>
                    <div className="sk-chase-dot sk-chase-infscroll"></div>
                    <div className="sk-chase-dot sk-chase-infscroll"></div>
                    <div className="sk-chase-dot sk-chase-infscroll"></div>
                </div>
            </div>
            <div id = 'inf_scroll_homepage' className="sk-chase">
                <div className="sk-chase-dot sk-chase-infscroll"></div>
                <div className="sk-chase-dot sk-chase-infscroll"></div>
                <div className="sk-chase-dot sk-chase-infscroll"></div>
                <div className="sk-chase-dot sk-chase-infscroll"></div>
                <div className="sk-chase-dot sk-chase-infscroll"></div>
                <div className="sk-chase-dot sk-chase-infscroll"></div>
            </div>
        </div> 
    )
}

export {HomePagePosts}; 