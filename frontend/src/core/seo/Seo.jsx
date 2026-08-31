/* src/core/seo/Seo.jsx */

import React, { useEffect } from "react";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "../config/seo";

function upsertMetaByName(name, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertMetaByProperty(property, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonical(href) {
  if (!href) return;
  let tag = document.head.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  keywords = "",
  noindex = false,
  schema = null,
}) {
  useEffect(() => {
    const finalTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const canonicalUrl = new URL(path, SITE_URL).toString();
    const imageUrl = new URL(image, SITE_URL).toString();
    const robots = noindex ? "noindex, nofollow" : "index, follow";

    document.title = finalTitle;
    document.documentElement.setAttribute("lang", "en");

    upsertMetaByName("description", description);
    upsertMetaByName("robots", robots);
    if (keywords) upsertMetaByName("keywords", keywords);

    upsertMetaByProperty("og:site_name", SITE_NAME);
    upsertMetaByProperty("og:title", finalTitle);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:type", type);
    upsertMetaByProperty("og:url", canonicalUrl);
    upsertMetaByProperty("og:image", imageUrl);

    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", finalTitle);
    upsertMetaByName("twitter:description", description);
    upsertMetaByName("twitter:image", imageUrl);

    upsertCanonical(canonicalUrl);

    const existingSchema = document.getElementById("seo-json-ld");
    if (existingSchema) existingSchema.remove();
    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "seo-json-ld";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [description, image, keywords, noindex, path, schema, title, type]);

  return null;
}
