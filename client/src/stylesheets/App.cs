@import url("https://fontsfree.net/billabong-font-download.html");
* {
  box-sizing: border-box;
}

:root {
  --main-bg-color: #fafafa;
  --font-color-gray: rgba(var(--f52,142,142,142),1);
  --border-color: #dbdbdb;
  --darker-border-color: #c2bdbd;
  --darker-border-color: #a7a6a6;
}

body, #root, html, .App {
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  background-color: var(--main-bg-color);
}
#footer a {
  text-decoration: none;
  color: var(--font-color-gray);
  font-size: 15px;
}

.sk-chase {
  display: none;
  width: 18px;
  height: 18px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: sk-chase-dot 2s infinite ease-in-out both;
}

.sk-chase-dot:before {
  content: "";
  display: block;
  width: 25%;
  height: 25%;
  background-color: #fff;
  border-radius: 100%;
  animation: sk-chase-dot-before 2s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) {
  animation-delay: -1.1s;
}

.sk-chase-dot:nth-child(2) {
  animation-delay: -1s;
}

.sk-chase-dot:nth-child(3) {
  animation-delay: -0.9s;
}

.sk-chase-dot:nth-child(4) {
  animation-delay: -0.8s;
}

.sk-chase-dot:nth-child(5) {
  animation-delay: -0.7s;
}

.sk-chase-dot:nth-child(6) {
  animation-delay: -0.6s;
}

.sk-chase-dot:nth-child(1):before {
  animation-delay: -1.1s;
}

.sk-chase-dot:nth-child(2):before {
  animation-delay: -1s;
}

.sk-chase-dot:nth-child(3):before {
  animation-delay: -0.9s;
}

.sk-chase-dot:nth-child(4):before {
  animation-delay: -0.8s;
}

.sk-chase-dot:nth-child(5):before {
  animation-delay: -0.7s;
}

.sk-chase-dot:nth-child(6):before {
  animation-delay: -0.6s;
}

@keyframes sk-chase {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes sk-chase-dot {
  80%, 100% {
    transform: rotate(360deg);
  }
}
@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4);
  }
  100%, 0% {
    transform: scale(1);
  }
}
.auth_holder {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  background-color: var(--main-bg-color);
}

.auth_info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}

.form_auth {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.name_form_auth {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  flex-direction: column;
  border: 2px solid var(--border-color);
  padding: 0px 20px 20px 20px;
  width: 100%;
}

#signInDescr {
  margin-top: 0px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: var(--font-color-gray);
  margin-bottom: 20px;
}

.instagram_name {
  font-family: "Billabong", cursive;
  padding: 25px;
  margin-top: 0px;
  width: 100%;
  margin-bottom: 0px;
}

.AuthorizationContainer {
  height: 90%;
}

.auth_link {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  border: 1px solid;
  padding: 5px 0px 5px 0px;
  background-color: white;
  width: 100%;
  font-size: 13px;
  border: 2px solid var(--border-color);
}
.auth_link a {
  text-decoration: none;
  color: #0095f6;
}

.authInputs, .authInputsPlaceholderAnimPadding {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  width: 100%;
  padding: 7px;
  margin-bottom: 6px;
  height: 35px;
  border: 1px solid var(--border-color);
  background-color: var(--main-bg-color);
  cursor: auto;
  font-size: 12px;
}

.authInputsPlaceholderAnimPadding {
  padding: 12px 0px 0px 9px;
  cursor: auto;
}

.label_input_auth, .label_input_auth_written {
  display: block;
  position: absolute;
  top: 9px;
  left: 7.9px;
  font-size: 12px;
  color: rgba(var(--f52, 142, 142, 142), 1);
  transition: 0.1s ease-in-out;
  user-select: none;
  height: 2px;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.label_input_auth_written {
  top: 2px;
  left: 10px;
  font-size: 10px;
  bottom: 5px;
}

.input_holder {
  position: relative;
  width: 100%;
}

.submitButton {
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0px;
  margin-top: 5px;
  cursor: pointer;
  background-color: #0095f6;
  color: white;
  font-weight: bold;
  border-color: transparent;
  border-radius: 5px;
  width: 100%;
  height: 27px;
}

.submit_button_text {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 100%;
  margin-top: 0px;
  height: 100%;
}

.inactive {
  background-color: rgba(0, 149, 246, 0.3);
  cursor: auto;
}

#date_of_birth_input {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 12px;
}

.validation_error_div {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.validation_error {
  font-size: 13px;
  color: red;
  display: none;
  width: 260px;
  text-align: center;
  margin-top: 5px;
  padding: 0;
  text-align: center;
}

.LoggedInViews {
  height: 84%;
  background-color: var(--main-bg-color);
}

#navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6%;
  flex-direction: row;
  justify-content: space-around;
  border: 1px solid var(--border-color);
}
#navbar #search_bar {
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  border: 1px solid var(--border-color);
  width: 215px;
  height: 28px;
  background-color: var(--main-bg-color);
  border-radius: 5%;
  padding-left: 8px;
  padding-right: 8px;
}
#navbar #search_bar .position_icon {
  position: absolute;
  right: -4px;
  transform: scale(0.9);
  color: var(--darker-border-color);
  display: none;
}
#navbar #search_bar #icon_input_div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  position: relative;
  width: 100%;
}
#navbar #search_bar #inp_display_text {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-align: left;
  color: #8d8c8c;
  font-size: 14px;
  font-weight: 100;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
}
#navbar #search_bar #search_input {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-align: left;
  border: none;
  display: none;
  width: 100%;
  background-color: var(--main-bg-color);
}
#navbar #search_bar #search_input::placeholder {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: #8d8c8c;
  font-size: 14px;
  font-weight: 100;
}
#navbar #search_bar #search_input:focus {
  outline: none;
}
#navbar #search_bar #search_icon_div {
  display: flex;
  justify-content: center;
  align-items: center;
}
#navbar #search_bar .search_icon {
  display: flex;
  justify-content: flex-end;
  position: relative;
  top: 1px;
  right: 2px;
  color: var(--darker-border-color);
  transform: scale(0.6);
}
#navbar #navbar_options {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid black;
}

/*# sourceMappingURL=App.cs.map */