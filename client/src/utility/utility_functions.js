import jwt_decode from "jwt-decode";

/**
 * This function has the purpose of recieving an input string which represents an email
 * address, and then carrying out a simple regex validation of that string. 
 * @param {String} email_inp Input string representing an email address 
 */
export function _validateEmail(email_inp) {
    // must follow regex pattern xyz@__.com 
    const regex_pattern = /\S+@\S+\.\S+/;
    return regex_pattern.test(email_inp); 
}

/**
 * This function has the purpose of recieving an input string which represents a username
 * and then carrying out a simple regex validation of that string. 
 * @param {String} username_inp Input string representing a username 
 */
export function _validateUsername(username_inp) {
    // Usernames can only use letters, numbers, underscores and periods.
    const regex_pattern = /^[a-zA-Z0-9_]+$/;
    return regex_pattern.test(username_inp); 
}

/**
 * This function has the responsibility of indicating whether a current user has scrolled all the way
 * down to the bottom of the DOM, for the purposes of infinite scrolling.
 */
export function infiniteScroll() {
    const usersCurrentScrollFromTop = window.innerHeight + document.documentElement.scrollTop + 1; 
    const totalScrollHeightPage = document.documentElement.scrollHeight; 
    if (usersCurrentScrollFromTop >= totalScrollHeightPage) {
        return true; 
    }
}

/**
 * This function is used to create the options for whenever a user is viewing a given post. This means
 * including the icons involved with a given post, like the heart icon, comment icon, saved icon, and so
 * on. 
 */
export function createPostOptionsDiv() {
    /**
     * Function responsible for creating a div that contains the like icon, comment icon, and DM icon,
     * and applying the appropriate styles. 
     */
    function createlikeCommentAndDMIcon() {
        const holder_div = document.createElement('div');
        holder_div.classList.add('likeCommentDMFlexboxContainer'); 
        const heart_icon = document.createElement('i');
        heart_icon.classList.add('fa-heart');

        const comment_icon = document.createElement('i');
        comment_icon.classList.add('fa-comment');

        const dm_icon = document.createElement('i');
        dm_icon.classList.add('fa-paper-plane');

        for (const icon of [heart_icon, comment_icon, dm_icon]) {
            icon.classList.add('far');
            holder_div.appendChild(icon);
        }
        return holder_div;
    }

    /**
     * Function responsible for creating a div that contains an icon representing an option to save a post.
     */
    function createSavedIcon() {
        const saved_container = document.createElement('div');
        const saved_icon = document.createElement('i');
        saved_icon.classList.add('far');
        saved_icon.classList.add('fa-bookmark');
        saved_container.appendChild(saved_icon);
        return saved_container;
    }
    return [createlikeCommentAndDMIcon(), createSavedIcon()];

}

/**
 * This function creates a spinner, which has the purpose of indicating to the user that an asynchronous
 * action is currently occuring. 
 */
export function createSpinnersProgrammatically(spinner_holder_id,spinner_holder_classname, spinner_dot_classname, num_dots = 6) {
    const spinner_holder = document.createElement('div');
    spinner_holder.classList.add('sk-chase');
    spinner_holder.classList.add(spinner_holder_classname);
    spinner_holder.id = spinner_holder_id; 

    /**
     * The spinner container contains a certain number of dots, and this function has the responsibility of 
     * creating the dots.
     */
    function createSpinnerDot(){
        const spinner_dot = document.createElement('div');
        spinner_dot.classList.add('sk-chase-dot');
        spinner_dot.classList.add(spinner_dot_classname);
        return spinner_dot;
    }
    for (let i =0; i<num_dots; i++) {
        spinner_holder.appendChild(createSpinnerDot());
    }
    return spinner_holder; 
}

/**
 * This function has the responsibility of darkening the appropriate elements on a web page, whenever the user
 * wants to focus in on a single element (IE: clicking on a post in a profile page, clicking on follow box, 
 * etc).
 */
export function darkenBackground(showPhotoInformation, hidePhotoInformation) {
    [...document.getElementsByClassName('overlay_div_blackout')].map((x) => {
        x.style.display ='block'; 
    });

    [...document.getElementsByClassName('grid_photo_information')].map((x) =>{
        x.style.display = 'flex';
    });

    [...document.getElementsByClassName('infoPhotoHover')].map((x) => {
        x.style.display = 'none';
    }); 


    document.getElementById('navbar').style.pointerEvents = 'none'; 
    document.getElementById('grid_container_images').style.pointerEvents = 'none';
    document.getElementById('user_profile_info_container').style.pointerEvents = 'none';
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'; 
}

/**
 * This function has the responsibility of lightening the elements on a web page after the user has
 * focused in on a single element and has decided to focus out (IE: user clicked to view all followers,
 * and is clicking out to get back to browsing). 
 */
export function lightenBackground(showPhotoInformation, hidePhotoInformation) {
    [...document.getElementsByClassName('overlay_div_blackout')].map((x) => {
        x.style.display = 'none';
    });

    [...document.getElementsByClassName('grid_photo_information')].map((x) =>{
        x.style.display = 'none';
    });

    [...document.getElementsByClassName('infoPhotoHover')].map((x) => {
        x.style.display = 'flex';
    }); 

    document.getElementById('navbar').style.pointerEvents = 'auto'; 
    document.getElementById('grid_container_images').style.pointerEvents = 'auto';
    document.getElementById('user_profile_info_container').style.pointerEvents = 'auto';
    document.getElementsByTagName('body')[0].style.overflow = 'auto'; 

}


/**
 * This function accepts a variable number of arguments, which are assumed to be Numbers. This function
 * then has the responsibility to return an array of Strings, containing the normalized version of the
 * Numbers in String format. 
 * 
 * For example, if a user has 10,000,000 followers, that number will be normalized to 10m. 
 * 
 * @returns {String[]} Array of Strings of the same length as the input, representing the input counts normalized
 */
export function normalizeCounts(...args) {
    const output_normalized = [];
    for(let arg of args) {
        arg = Number(arg);
        switch (true) {
            case (arg >= 1000000):
                arg /= 1000000;
                output_normalized.push(`${arg.toFixed(1)}m`);
                break;
            case (arg >= 10000):
                arg /= 1000; 
                output_normalized.push(`${arg.toFixed(1)}k`);
                break;
            default:
                output_normalized.push(arg);
                break; 
        }
    }
    return output_normalized; 
}

/**
 * This function is a utility function used to set the display of a variable number of input DOM elements. 
 * Useful in multiple places in the frontend as displays of elements are changed regularly. 
 * 
 * Expects the displays array to match the length of the args array, where displays[i] is a String describing the
 * display of args[i]. 
 * @param {String[]} displays Array of strings containing the CSS displays for a wide variety of elements
 * @param  {HTMLElement[]} args Array of DOM elements 
 */
export function setDisplay(displays, ...args) {
    for (let [i,arg] of args.entries()) {
        const display = displays[i]; 
        arg.style.display = display; 
    }
}

/**
 * Utility function called before we dispatch any HTTP request to a protected route to ensure our 
 * access token isn't prematurely expired. 
 */
export async function checkTokenExpirationMiddleware() {
    // if the access token isn't null, means user has been verified and we should be 
    // checking whether or not access token is expired 
    if (localStorage.getItem('accessToken') !== null) {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        // check accessToken expiry -- don't want to send needless requests to the API
        // if our token isnt expired 
        if (jwt_decode(accessToken).exp < Date.now() / 1000) {
            const new_access_token_raw = await fetch(
                '/accounts/refreshToken',
                {
                    method: 'GET',
                    headers: {
                        authorization: refreshToken
                    }
                }
            ); 
            const new_access_token = await new_access_token_raw.json(); 
            if ("message" in new_access_token) {
                // access token is expired and we failed to renew the access token
                // using the refresh token so clear everything out of local storage 
                // and the user will be effectively logged out
                localStorage.clear(); 
            }
            else {
                // otherwise our access token has been refreshed succesfully and we forward the
                // action onward with a valid access token
                localStorage.setItem('accessToken', new_access_token.new_access_token);
                console.log('new access token set!');
            }
        }
    }
}


/**
 * This function has the responsibiliy of removing the JWT accesss tokens from the localStorage and refreshing
 * the page, which will effectively log the user out of the application. 
 */
export function _authenticationErrorLogOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.reload(); 
}

export function _preprocess_loginbutton(loginButton, eventListenerRemove) {
    loginButton.disabled = true; 
    loginButton.removeEventListener('click', eventListenerRemove); 
}

export function displayErrorInHTMLElement(err_msg, err_node, display) {
    if (err_msg.includes(":")) {
        err_msg = err_msg.split(":")[1]; 
    }
    err_node.innerHTML = err_msg; 
    err_node.style.display = display; 
}


/**
 * This function accepts a String representing a CSS display, and a variable number of arguments 
 * each of which is expected to be DOM objects. The display of every DOM object is toggled between
 * none, and the string display which is provided as input to the function.
 * 
 * @param display String representing the display which to change every input argument to 
 */
export function _toggleDisplays(display, ...args) {
    for (let elem of args) {
        elem.style.display = (elem.style.display === display ? 'none': display);
    }
}

/**
 * This function takes in a variable number of arguments representing DOM objects, and sets
 * the display of every single one of the objects to none. 
 */
export function _setDisplayNone(...args) {
    for (let elem of args) {
        elem.style.display = 'none'; 
    }
}