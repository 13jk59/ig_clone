import React from 'react'; 
import {Link, NavLink} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import {ProfileIconSettings} from './ProfileIconSettings';
import {Notifications} from './Notifications';
import { useLocation } from 'react-router-dom';
import {_toggleDisplays, _setDisplayNone} from '../../utility/utility_functions';

/**
 * This class represents a React Component that represents the navigation
 * bar of the application, which will be shown to the user on all routes 
 * when logged in. 
 * @class @public 
 */
class NavBar extends React.Component{
    constructor(props) {
        super(props); 
        this._documentClickListener = this._documentClickListener.bind(this);
        this._turnOnNotificationsLight = this._turnOnNotificationsLight.bind(this); 
        this._turnOffNotificationsLight = this._turnOffNotificationsLight.bind(this); 
        this._turnOnProfileLight = this._turnOnProfileLight.bind(this);
        this._turnOffProfileLight = this._turnOffProfileLight.bind(this); 
    }

    componentDidMount() {
        document.getElementById('profile_settings').style.display = 'none'; 
        document.addEventListener('click', this._documentClickListener);
        this._highlightIconBasedOnRoute(this.props.location.pathname);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._documentClickListener); 
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this._unHighlightIconBasedOnRoute(prevProps.location.pathname); 
            this._highlightIconBasedOnRoute(this.props.location.pathname); 
        }
    }


    _documentClickListener(e) {
        const prof_settings = document.getElementById('profile_settings');
        const prof_triangle = document.getElementsByClassName('profile_triangle')[0];
        const notif_icon = document.getElementById('notifications_icon');
        const profile_img = document.getElementById('profile_img');  
        const notif_dropdown = document.getElementById('notifications_holder');
        const notif_triangle = document.getElementsByClassName('notif_triangle')[0]; 
        // event handlign for filling in the notifications heart and the profile img here
        if (e.target.id === 'profile_icon' || e.target.id === 'profile_img') {
            this._turnOnProfileLight();
        }
        else if (e.target.id === 'notifications_div' || e.target.id === 'notifications_icon') {
            this._turnOnNotificationsLight(e); 
        }
        else {
            // just turn off the profile settings dropdown + the notifications drop down if we click on 
            // a part of the page that isn't the notifications or profile icon. If user wants them displayed
            // can just click directly on the icons, but if we click anywhere outside, they are hidden
            // and we go back to lighting up the current route 
            _setDisplayNone(prof_settings, prof_triangle, notif_dropdown, notif_triangle);
            if (notif_icon.classList.contains('fas')) {
                this._turnOffNotificationsLight();
            }
            if (profile_img.style.border === '1px solid') {
                this._turnOffProfileLight(); 
            }  

        }
    }

    /**
     * This method accepts a string representing the current route the user is on, and highlights the icon
     * on the navbar which corresponds to the route.
     */
    _highlightIconBasedOnRoute(endpoint) {
        switch (endpoint) {
            case '/explore':
                document.getElementById('explore').classList.add('fas');
                break
            case '/direct/inbox/':
                document.getElementById('dm_icon').classList.add('fas');
                break
            case '/':
                document.getElementById('home_icon').classList.add('home_icon_active');
                break
            default: 
                document.getElementById('profile_img').style.border = '1px solid';
        }
    }

    /**
     * This method accepts a string representing a particular route endpoint, and unhighlights the icon 
     * on the navbar which corresponds to the route.
     */
    _unHighlightIconBasedOnRoute(endpoint) {
        switch (endpoint) {
            case '/explore':
                document.getElementById('explore').classList.remove('fas');
                break
            case '/direct/inbox/':
                document.getElementById('dm_icon').classList.remove('fas');
                 break
            case '/':
                document.getElementById('home_icon').classList.remove('home_icon_active');
                break 
            default:
                document.getElementById('profile_img').style.border = 'none'; 
        }
    }

    _turnOnNotificationsLight(e) {
        const notif_icon = document.getElementById('notifications_icon');
        const already_turned_on = notif_icon.classList.contains('fas');      

        // turn OFF the profile settings if we open the notifications drop down 
        // only one can be active at any time, and toggle the notification displays 
        _toggleDisplays('block',  document.getElementById('notifications_holder'), 
            document.getElementsByClassName('notif_triangle')[0]);

        _setDisplayNone(document.getElementById('profile_settings'),  
        document.getElementsByClassName('profile_triangle')[0]); 

    
        if (already_turned_on) {
            return this._turnOffNotificationsLight(); 
        }

        notif_icon.classList.add('fas'); 
        const endpoint = this.props.location.pathname;
        this._unHighlightIconBasedOnRoute(endpoint);
        // turn off the profile img only if we aren't currently on the user route
        if (this._routesNotForUserProfile(endpoint))
            document.getElementById('profile_img').style.border = 'none'; 
    }

    _turnOffNotificationsLight() {
        // clicking anywhere outside notifications turns off the notifications light
        // and turns on the light of the endpoint we are currently on 
        const notif_icon = document.getElementById('notifications_icon');
        // if its already turned on and we click it again, then we turn it off
        // and 
        const already_turned_on = notif_icon.classList.contains('fas');
        notif_icon.classList.remove('fas');
        const endpoint = this.props.location.pathname;
        this._highlightIconBasedOnRoute(endpoint); 
    }

    _turnOnProfileLight() {
        // turn OFF the notification settings if we open profile settings 
        // only one can be active at any time 
        document.getElementById('notifications_icon').classList.remove('fas'); 

        // toggle the profile settings dropdown, and explicitly set display none for notifications
        // dropdowns 
        _toggleDisplays('block', document.getElementById('profile_settings'), 
            document.getElementsByClassName('profile_triangle')[0]); 
        _setDisplayNone(document.getElementById('notifications_holder'), 
            document.getElementsByClassName('notif_triangle')[0]);

        const already_turned_on = document.getElementById('profile_img').style.border === '1px solid';
        if (already_turned_on) {
            return this._turnOffProfileLight(); 
        }
        document.getElementById('profile_img').style.border = '1px solid'; 
        if (this._routesNotForUserProfile(this.props.location.pathname))  {
            this._unHighlightIconBasedOnRoute(this.props.location.pathname); 
        }       
    }
    
    _turnOffProfileLight() {
        // you turn off the profile light if you aren't currently on /:username endpoint 
        if (this._routesNotForUserProfile(this.props.location.pathname)) {
            document.getElementById('profile_img').style.border = 'none'; 
            this._highlightIconBasedOnRoute(this.props.location.pathname);
        }                
    }

    _routesNotForUserProfile(location) {
        if (
            location === '/' ||
            location === '/direct/inbox/' ||
            location === '/explore'
        ) {
            return true;
        }
        return false; 
    }


    _searchBarFocus(e) {
        e.preventDefault();  
        const search_bar = document.getElementById('search_bar');
        const icon_input_div = document.getElementById('icon_input_div');
        document.getElementById('delete_inp_text_icon').style.display = 'block'; 
        // hide the div containing text, show the input tag
        const inp_tag = document.getElementById('search_input');
        inp_tag.style.display = 'block';
        inp_tag.focus(); 
        const inp_display_text = document.getElementById('inp_display_text');
        inp_display_text.style.display = 'none'; 
    }

    _searchBarBlur(e) {
        e.preventDefault(); 
        const search_bar = document.getElementById('search_bar');
        const icon_input_div = document.getElementById('icon_input_div');
        search_bar.style.justifyContent = 'center';
        icon_input_div.style.justifyContent = 'center';
        document.getElementById('delete_inp_text_icon').style.display = 'none'; 
        const inp_tag = document.getElementById('search_input');
        inp_tag.style.display = 'none';
        const inp_display_text = document.getElementById('inp_display_text');
        inp_display_text.style.display = 'block'; 
        inp_display_text.innerHTML = (inp_tag.value ? inp_tag.value: "Search"); 
    }

    _searchDelete(e) {
        e.preventDefault(); 
        e.stopPropagation(); 
        const search_bar = document.getElementById('search_bar');
        search_bar.blur(); 
        const inp_tag = document.getElementById('search_input');
        inp_tag.value = ''; 
    }



    render() {
        return(
            <div id = "navbar_container">
                <nav id = "navbar">
                    <Link id = "link_home_igname" to = '/'>
                        <div id = "ig_name">
                            <h1 id = "link_home_igname" className = "instagram_name">Instagram Clone</h1>
                        </div>
                    </Link>
                    
                    <div id = "search_bar" onMouseDown = {this._searchBarFocus} onBlur = {this._searchBarBlur}>
                        <div id = "icon_input_div">
                            <i class="fas fa-search search_icon"></i>
                            <div id = "inp_display_text" >Search</div>
                            <input id = "search_input" type = "text" placeholder = "Search"></input>
                            <i id = "delete_inp_text_icon" class="fas fa-times-circle position_icon" onClick = {this._searchDelete}></i>
                        </div>
                    </div>

                    <div id = "navbar_options">
                        <Link to = "/">
                            <i id = "home_icon" className="fas fa-home navbar_icons margin_class"></i>
                        </Link>

                        <Link to = "/direct/inbox/">
                            <i id = "dm_icon" className ="options_imgs margin_class far fa-paper-plane"></i>
                        </Link>
                       
                        <Link to = "/explore">
                            <i id = "explore" className="far fa-compass navbar_icons margin_class"></i>
                        </Link>
                        <Notifications 
                            _setLocalStorageHighlight = {this._setLocalStorageHighlight}
                        />
                        <ProfileIconSettings 
                            remove_curr_user = {this.props.remove_curr_user}
                            current_user = {this.props.current_user} 
                            />
                    </div>
                </nav>
            </div>
        )
    }
}





const navbar_withrouter = withRouter(NavBar); 

export {navbar_withrouter as NavBar};  