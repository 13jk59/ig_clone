import React, { useEffect} from 'react';
import { useHistory } from 'react-router';
import {checkTokenExpirationMiddleware, _authenticationErrorLogOut, _validateEmail, _validateUsername, setDisplay} from '../../../utility/utility_functions';

function EditProfile(props) { 
    const history = useHistory(); 
    useEffect(() => {
        async function fetchEditProfileInfo() {
            try {
                await checkTokenExpirationMiddleware(); 
                const returned_profile_info_raw = await fetch(`/${props.current_user}/editProfile`, {
                    headers: {
                        authorization: localStorage.getItem('accessToken')
                    }
                }); 
                const returned_profile_info_json= await returned_profile_info_raw.json(); 
                console.log(returned_profile_info_json);
                initEditComponent(returned_profile_info_json); 
            }
            catch(err) {
                // weird failed to fetch response specific to page refreshing
                // when it doesn't actually fail just ignoring the error for now
                if (String(err).includes('failed')) {
                    _authenticationErrorLogOut(); 
                }
            }
        }
        fetchEditProfileInfo(); 
    });

    function initEditComponent(init_object) {
        const base64_image = 'data:image/jpeg;base64,' + init_object.profile_picture.profile_picture;
        document.getElementById('edit_profile_profilepic').src = base64_image;
        document.getElementById('change_name').value = init_object.full_name;
        document.getElementById('change_username').value = props.current_user; 
        document.getElementById('change_bio').value = (init_object.profile_description === null ? '': init_object.profile_description);
        document.getElementById('change_email').value = init_object.email; 
    }

    async function updateProfileClick(e) {
        e.preventDefault();
        const spinner_div = document.getElementById('spinner_div_editprofile');
        const submit_p_tag = document.getElementById('submit_descr');
        const error_success_div = document.getElementById('error_success_div');
        error_success_div.innerHTML = ''; 
        if (checkIfInputsValid()) {
            try {
                await checkTokenExpirationMiddleware(); 
                setDisplay(['block', 'none'], spinner_div, submit_p_tag); 
                const res = await fetch(`/${props.current_user}/editProfile`, {
                    method: 'PUT',
                    headers: {
                        authorization: localStorage.getItem('accessToken'),
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify({
                        fullname: document.getElementById('change_name').value,
                        username: document.getElementById('change_username').value,
                        email: document.getElementById('change_email').value,
                        profile_bio: document.getElementById('change_bio').value 
                    })
                });
                
                const json_res = await res.json(); 
                // error conditions -- handle appropriately in catch
                if ("UnauthorizedUser" in json_res || "DuplicateEmail" in json_res ||
                    "DuplicateUsername" in json_res) {
                        throw Error(Object.keys(json_res)[0]);
                }
                // we've updated our username so we need new refresh and access tokens 
                // as the payload in the old ones will be stale -- main thing held in tokens
                // will be the usernames 
                else if (props.current_user !== document.getElementById('change_username').value) {
                    localStorage.setItem('accessToken', json_res.accessToken);
                    localStorage.setItem('refreshToken', json_res.refreshToken);
                    props.set_curr_user(document.getElementById('change_username').value); 
                }
                error_success_div.innerHTML = 'Success!';
                error_success_div.style.color = 'green'; 

            }
            catch(err) {
                err = String(err);
                putRequestFailedError(err); 
            }
            finally {
                setDisplay(['none', 'block'], spinner_div, submit_p_tag); 
            }
        }
    }

    function putRequestFailedError(err) {
        const error_success_div = document.getElementById('error_success_div');
        error_success_div.style.color = 'red'; 
        if (err.includes('UnauthorizedUser')) {
            _authenticationErrorLogOut(); 
        }
        else if (err.includes('DuplicateEmail')) {
            error_success_div.innerHTML = 'Email address is already registered. Select another one.';
        }
        else if (err.includes('DuplicateUsername')) {
            error_success_div.innerHTML = 'Username is already registered. Select another one. '
        }
    }

    function checkIfInputsValid() {
        const error_success_div = document.getElementById('error_success_div');
        error_success_div.style.color = 'red'; 
        if(document.getElementById('change_name').value.length <1) {
            error_success_div.innerHTML = 'Name must have atleast one character.'
            return false; 
        }
        else if (document.getElementById('change_bio').value.length >150) {
            error_success_div.innerHTML = 'Bio must be less than or equal to 150 characters.'
            return false; 
        }
        else if (!_validateUsername(document.getElementById('change_username').value)) {
            error_success_div.innerHTML = 'Username must have atleast one character and contain only letters, numbers, underscores and periods.';
            return false; 
        }

        else if (!_validateEmail(document.getElementById('change_email').value)) {
            error_success_div.innerHTML = 'Please enter a valid email.';
            return false; 
        }
        return true; 
    }

    function goBackPrevPage(e) {
        e.preventDefault(); 
        history.push(`/${props.current_user}`); 
    }

    return (
        <div id = 'edit_profile_topleveldiv'>
            <form id = 'edit_profile_form'>
                <div id = "edit_profile_header">
                    <div id = "username_profilepicture_div">
                        <img id = 'edit_profile_profilepic'></img>
                        <h3>{props.current_user}</h3>
                    </div>
                    <label htmlFor = "update_profile_picture" className = "edit_profile_labels">Change Profile Photo</label>
                    <input type="file" id="img_input" name="img" accept="image/*" />
                </div>
                <div className = "edit_profile_div">
                    <div className = "labeldiv_editprofile">
                        <label htmlFor = "change_name" className = "edit_profile_labels">Name</label>
                    </div>
                    <div className = "inputdiv_editprofile">
                        <input type = "text" placeholder = "Name" id = "change_name" className = "edit_profile_names"></input>
                    </div>
                </div>

                <div className = "edit_profile_div">
                    <div className = "labeldiv_editprofile">
                        <label htmlFor = "change_username" className = "edit_profile_labels">Username</label>
                    </div>
                    <div className = "inputdiv_editprofile">
                        <input type = "text" placeholder = "Username" id = "change_username" className = "edit_profile_names"></input>
                    </div>
                </div>

                <div className = "edit_profile_div">
                    <div className = "labeldiv_editprofile">
                        <label htmlFor = "change_bio" className = "edit_profile_labels">Bio</label>
                    </div>
                    <div className = "inputdiv_editprofile">
                        <textarea type = "textarea" id = "change_bio" className = "edit_profile_names"></textarea>
                    </div>
                </div>

                <div className = "edit_profile_div">
                    <div className = "labeldiv_editprofile">
                        <label htmlFor = "change_email" className = "edit_profile_labels">Email</label>
                    </div>
                    <div className = "inputdiv_editprofile">
                        <input type = "email" placeholder = "Email" id = "change_email" className = "edit_profile_names"></input>
                    </div> 
                </div>
                <div id = "error_success_div"></div>
                <div id = "profile_buttons">
                    <button id = "submit_editprofile" className = "edit_profile_buttons" onClick = {updateProfileClick}>
                        <p id = "submit_descr">Submit</p>
                        <div id = "spinner_div_editprofile" className="sk-chase sk-chase-editprofile">
                            <div className="sk-chase-dot sk-chase-dot-editprofile"></div>
                            <div className="sk-chase-dot sk-chase-dot-editprofile"></div>
                            <div className="sk-chase-dot sk-chase-dot-editprofile"></div>
                            <div className="sk-chase-dot sk-chase-dot-editprofile"></div>
                            <div className="sk-chase-dot sk-chase-dot-editprofile"></div>
                            <div className="sk-chase-dot sk-chase-dot-editprofile"></div>
                        </div>
                    </button>
                    <button id = "goback_editprofile" className = "edit_profile_buttons" onClick = {goBackPrevPage}>Go Back</button>
                </div>
            </form>
        </div>
    )
}


export {EditProfile}; 