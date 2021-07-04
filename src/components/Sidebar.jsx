import React from "react";

export const Sidebar = ({ route }) => {
  return (
    <nav className="sideNavigation">
      <a
        className={`sideNavigation__item ${
          route === "home" && "sideNavigation__item--active"
        }`}
        href="/home"
      >
        <i className="icon material-icons">home</i>
        <span>Home</span>
      </a>
      <a
        className={`sideNavigation__item ${
          route === "news" && "sideNavigation__item--active"
        }`}
        href="/news"
      >
        <i className="icon material-icons">trending_up</i>
        <span>Trending News</span>
      </a>
      <a
        className={`sideNavigation__item ${
          route === "explore__interests" && "sideNavigation__item--active"
        }`}
        href="/explore"
      >
        <i className="icon material-icons">search</i>
        <span>Explore Interests</span>
      </a>
    </nav>
  );
};
