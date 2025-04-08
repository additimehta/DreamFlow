"use strict";
// contains logic for the distractions in the background 
console.log("DreamFlow Focus Mode background script running...");


const distractingSites = [
    "youtube.com",
    "instagram.com",
    "twitter.com",
    "tiktok.com",
    "reddit.com",
    "facebook.com",
    "netflix.com",
  ];


function isDistracting(url: string | undefined): boolean {
    if (!url) return false;
    return distractingSites.some((site) => url.includes(site));
}
