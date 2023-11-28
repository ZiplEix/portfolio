import { browser } from "$app/environment";
import { writable } from "svelte/store";

type Theme = "light" | "dark";

const userTheme = browser && localStorage.getItem("color-scheme");

export const theme = writable(userTheme ?? "dark");

export function toggleTheme() {
  theme.update(currentTheme => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("color-scheme", newTheme);
    localStorage.setItem("color-scheme", newTheme);
    return newTheme;
  });
}

export function setTheme(newTheme: Theme) {
  theme.set(newTheme);
  document.documentElement.setAttribute("color-scheme", newTheme);
  localStorage.setItem("color-scheme", newTheme);
}

// const preference = window.matchMedia("(prefers-color-scheme: dark)");

// preference.addEventListener("change", event => {
//   if (userTheme) return;
//   const newTheme = event.matches ? "dark" : "light";
//   setTheme(newTheme);
// });
