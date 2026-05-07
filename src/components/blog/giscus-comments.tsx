"use client";

import Giscus from "@giscus/react";

const GiscusComments = () => {
  return (
    <Giscus
      id="comments"
      repo="nhridoy/portfolio"
      repoId="R_kgDOSKjMhQ"
      category="Announcements"
      categoryId="DIC_kwDOSKjMhc4C8fRZ"
      mapping="pathname"
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="en"
      loading="lazy"
      // term="Welcome to @giscus/react component!"
    />
  );
};

export default GiscusComments;
