import React from 'react';

export default function BlogFeaturedImage(props) {
  if (!props.featured_image_url) {
    return null;
  }
  return (
    <div className="featured-image-wrapper">
      <img src={props.featured_image_url} />
    </div>
  );
}
