import { posts as allPosts, projects as allProjects } from "#site/content";
import { sortByDateDesc, withoutDrafts } from "./content-utils";

export type { Post, Project } from "#site/content";

const includeDrafts = process.env.NODE_ENV !== "production";

export function getPosts() {
  return sortByDateDesc(withoutDrafts(allPosts, includeDrafts));
}

export function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug);
}

export function getProjects() {
  return [...allProjects].sort((a, b) => a.order - b.order);
}

export function getProject(slug: string) {
  return allProjects.find((project) => project.slug === slug);
}
